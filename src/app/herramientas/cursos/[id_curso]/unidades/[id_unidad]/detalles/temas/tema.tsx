// components/Tema.tsx
'use client';

import Link from 'next/link';
import { TemaType, TemaDataType, TemaDataScheme } from '@models/tema';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DragControls } from 'framer-motion'; // Import DragControls type
import WidthType from '@/models/width';
import TextInput from '@/components/textInput';
import SecondarySubmit from '@/components/secondarySubmit';
import TertiaryButton from '@/components/tertiaryButton';
import EditButton from '@/components/editButton';
import DeleteButton from '@/components/deleteButton';
import { updateTema } from '@/utils/temas/updateTema';
import Alert from '@/components/alert';
import { Bars3Icon } from '@heroicons/react/24/outline'; // Example icon

type TemaProps = {
    className: string;
    tema: TemaType;
    idCurso: number;
    idUnidad: number;
    handleDeleteTema: (id: number) => void;
    widthList: [WidthType, WidthType, WidthType];
    token: string;
    dragControls?: DragControls; // Optional drag controls
};

const Tema = ({
    className,
    tema,
    idCurso,
    idUnidad,
    handleDeleteTema,
    widthList,
    token,
    dragControls, // Receive dragControls as a prop
}: TemaProps) => {
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isDirty }, reset } = useForm<TemaDataType>({
        resolver: zodResolver(TemaDataScheme),
        defaultValues: TemaDataScheme.parse(tema),
    });

    const [editMode, setEditMode] = useState<boolean>(false);

    const onSubmit: SubmitHandler<TemaDataType> = async (data) => {
        const updatedTema: TemaType = {
            ...tema,
            tema: data.tema,
            numero: tema.numero, // Ensure the numero remains unchanged
        };
        const response = await updateTema(idCurso, updatedTema, token);
        if (response.success) {
            reset(data);
            setEditMode(false);
        } else {
            setError(response.message);
        }
    };

    const handleCancel = () => {
        reset();
        setEditMode(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`${className} flex items-center`}>
            {/* Drag Handle */}
            {dragControls && (
                <div
                    className="cursor-grab px-2 select-none"
                    onPointerDown={(e) => dragControls.start(e)} // Start dragging
                    title="Reorder"
                    aria-label="Reorder Tema"
                >
                    <Bars3Icon className="w-5 h-5" />
                </div>
            )}
            <div className={`text-xl text-center ${widthList[0]}`}>{tema.numero}</div>
            <div className={widthList[1]}>
                <TextInput
                    className="w-full"
                    idPrefix="titulo-tema"
                    idRaw={`${tema.id}`}
                    editMode={editMode}
                    register={register('tema')}
                    placeholder="Ingrese el Titulo del Tema"
                    error={errors.tema}
                    showBorder={false}
                />
            </div>
            <div className={`${widthList[2]} flex`}>
                {editMode ? (
                    <>
                        <SecondarySubmit className="mx-1 w-1/2" isDirty={isDirty} buttonLabel="Guardar" />
                        <TertiaryButton className="mx-1 w-1/2" handleAction={handleCancel} buttonLabel="Cancelar" />
                    </>
                ) : (
                    <>
                        <EditButton title="Editar Titulo del Tema" className="mx-3" handleEdit={() => setEditMode(true)} />
                        <DeleteButton title="Eliminar Tema de la Unidad" className="mx-3" handleDelete={() => handleDeleteTema(tema.id)} />
                    </>
                )}
            </div>
            <Alert error={error} setError={setError} />
        </form>
    );
};

export default Tema;
