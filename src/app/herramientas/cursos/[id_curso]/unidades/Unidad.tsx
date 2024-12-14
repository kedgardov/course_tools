'use client';

import Link from 'next/link';
import { UnidadMiniType, UnidadTituloType, UnidadTituloScheme } from '@models/unidad';
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
import { updateUnidadMini } from '@/utils/unidades/updateUnidadMini';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';

const Unidad = ({
    className,
    unidad,
    idCurso,
    handleDeleteUnidad,
    widthList,
    token,
    dragControls, // Receive dragControls as a prop
}: {
    className: string;
    unidad: UnidadMiniType;
    idCurso: number;
    handleDeleteUnidad: (id: number) => void;
    widthList: [WidthType, WidthType, WidthType];
    token: string;
    dragControls?: DragControls; // Optional because it's only needed in reorder mode
}) => {
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isDirty }, reset } = useForm<UnidadTituloType>({
        resolver: zodResolver(UnidadTituloScheme),
        defaultValues: UnidadTituloScheme.parse(unidad),
    });

    const [editMode, setEditMode] = useState(false);

    const onSubmit: SubmitHandler<UnidadTituloType> = async (data) => {
        const updatedUnidad: UnidadMiniType = {
            id: unidad.id,
            id_curso: idCurso, // Fixed: Should use idCurso instead of unidad.id
            unidad: data.unidad,
            numero: unidad.numero,
        };
        const response = await updateUnidadMini(updatedUnidad, token);
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
            <div className={`text-xl flex justify-center ${widthList[0]}`}>
            {/* Drag Handle */}
            {dragControls && (
                <div
                    className="cursor-grab px-2 select-none"
                    onPointerDown={(e) => dragControls.start(e)} // Start dragging
                    title="Reorder"
                >
                    <ChevronUpDownIcon className='size-6' />
                </div>
            )}
            {unidad.numero}
            </div>
            <div className={widthList[1]}>
                <TextInput
                    className="w-full"
                    idPrefix="titulo-unidad"
                    idRaw={`${unidad.id}`}
                    editMode={editMode}
                    register={register('unidad')}
                    placeholder="Ingrese el Titulo de la Unidad"
                    error={errors.unidad}
                    showBorder={false}
                />
            </div>
            <div className={`${widthList[2]} flex`}>
                {editMode ? (
                    <>
                        <SecondarySubmit className="mx-1 w-1/2" isDirty={isDirty} buttonLabel="Guardar" />
                        <TertiaryButton className="mx-1 w-1/2" handleAction={() => handleCancel()} buttonLabel="Cancelar" />
                    </>
                ) : (
                    <>
                        <div className="w-1/2 items-center flex">
                            <Link className="button-3" href={`/herramientas/cursos/${idCurso}/unidades/${unidad.id}/detalles`}>
                                Ver Detalles
                            </Link>
                        </div>
                        <div className="w-1/2 items-center flex">
                            <EditButton title="Editar Titulo de la Unidad" className="mx-3" handleEdit={() => setEditMode(true)} />
                            <DeleteButton title="Eliminar Unidad" className="mx-3" handleDelete={() => handleDeleteUnidad(unidad.id)} />
                        </div>
                    </>
                )}
            </div>
        </form>
    );
};

export default Unidad;
