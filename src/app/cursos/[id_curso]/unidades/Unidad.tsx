'use client'

import Link from 'next/link';
import { UnidadMiniType, UnidadTituloType, UnidadTituloScheme } from '@models/unidad';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import WidthType from '@/models/width';
import TextInput from '@/components/textInput';
import SecondarySubmit from '@/components/secondarySubmit';
import TertiaryButton from '@/components/tertiaryButton';
import EditButton from '@/components/editButton';
import DeleteButton from '@/components/deleteButton';


const Unidad = ({
    className,
    unidad,
    idCurso,
    handleDeleteUnidad,
    widthList,
}:{
    className: string,
    unidad: UnidadMiniType,
    idCurso: number,
    handleDeleteUnidad: (id: number) => void,
    widthList: [WidthType, WidthType, WidthType],
}) => {

    const { register, handleSubmit, formState:{ errors, isDirty }, reset } = useForm<UnidadTituloType>({
        resolver: zodResolver(UnidadTituloScheme),
        defaultValues: UnidadTituloScheme.parse(unidad),
    });

    const [editMode, setEditMode] = useState(false);

    const onSubmit: SubmitHandler<UnidadTituloType> = (data) => {
        console.log(data);
        setEditMode(false);

        // Update the form's default values to the current values after saving
        reset(data);
    }

    const handleCancel = () => {
        reset(); // Reset the form to the most recent default values (which are updated after each save)
        setEditMode(false); // Switch back to read-only mode
    }

    return (

            <form onSubmit={handleSubmit(onSubmit)} className={`${className} flex items-center`}>
                <div className={`text-4xl text-center ${widthList[0]}`}>{unidad.numero}</div>
                <div className={widthList[1]}>
                <TextInput
                    className='w-full'
                    idPrefix='titulo-unidad'
                    idRaw={`${unidad.id}`}
                    editMode={editMode}
                    register={register('titulo')}
                    placeholder='Ingrese el Titulo de la Unidad'
                    error={errors.titulo}
                />
                </div>
                <div className={`${widthList[2]} flex`}>
                    { editMode ? (
                    <>
                        <SecondarySubmit className='mx-1 w-1/2' isDirty={isDirty} buttonLabel='Guardar'/>
                        <TertiaryButton className='mx-1 w-1/2' handleAction={() => handleCancel()} buttonLabel='Cancelar'/>
                    </>
                    ) : (
                    <>
                        <div className='w-1/2 items-center flex'>
                            <Link className='button-3' href={`/cursos/${idCurso}/unidades/${unidad.id}/detalles`} > Ver Detalles </Link>
                            <Link className='button-3' href={`/cursos/${idCurso}/unidades/${unidad.id}/temas`} > Ver Temas </Link>
                        </div>
                        <div className='w-1/2 items-center flex'>
                            <EditButton title='Editar Titulo de la Unidad' className='mx-3' handleEdit={() => setEditMode(true)}/>
                            <DeleteButton title='Eliminar Unidad' className='mx-3' handleDelete={() => handleDeleteUnidad(unidad.id)}/>
                        </div>
                    </>
                    )}
                </div>
            </form>

    );
};

export default Unidad;
