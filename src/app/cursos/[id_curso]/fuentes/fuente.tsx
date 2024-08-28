'use client'
import { useState } from 'react';
import { FuenteMiniDataScheme, FuenteMiniDataType, FuenteMiniType } from "@/models/fuente";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from 'react-hook-form';
import { TipoFuenteType } from '@/models/tipoFuente';
import Link from 'next/link';

import DeleteButton from '@components/deleteButton';
import EditButton from '@/components/editButton';
import UpdateButton from '@/components/updateButton';

import WidthType from '@models/width';
import SecondarySubmit from '@/components/secondarySubmit';
import TertiaryButton from '@/components/tertiaryButton';
import TextInput from '@/components/textInput';
import SelectInput from '@/components/selectInput';

const Fuente = ({
    className,
    fuente,
    idCurso,
    catalogoTiposFuentes,
    handleDelete,
    widthList,
}:{
    className: string,
    fuente: FuenteMiniType,
    idCurso: number,
    catalogoTiposFuentes: TipoFuenteType[],
    handleDelete: ( id: number ) => void,
    widthList: [WidthType, WidthType, WidthType],
}) => {
    const [editMode, setEditMode] = useState<boolean>(false);

    const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<FuenteMiniDataType>({
        resolver: zodResolver(FuenteMiniDataScheme),
        defaultValues: FuenteMiniDataScheme.parse(fuente),
    });

    const handleCancel = () => {
        reset();
        setEditMode(false);
    };

    const onSubmit: SubmitHandler<FuenteMiniDataType> = (data) => {
        const fuenteActualizada: FuenteMiniType = { ...fuente, titulo: data.titulo, id_tipo: data.id_tipo};
        console.log(fuenteActualizada);
        reset(data);
        setEditMode(false);
    };

    return (
        <div className={`${className}`}>
            <form onSubmit={handleSubmit(onSubmit)} className='flex'>
                <div className={widthList[0]}>
                    <TextInput
                        className='w-full'
                        idPrefix='titulo-fuente'
                        idRaw={`${fuente.id}`}
                        editMode={editMode}
                        register={register('titulo')}
                        placeholder='Ingresa el Titulo de la Fuente'
                        error={errors.titulo}
                    />
                </div>
                <div className={widthList[1]}>
                    <SelectInput
                        className='w-full'
                        idRaw={`${fuente.id}`}
                        idPrefix='tipo-fuente'
                        register={register('id_tipo', { valueAsNumber:true })}
                        editMode={editMode}
                        options={catalogoTiposFuentes}
                        error={errors.id_tipo}
                        placeholder='Selecciona el Tipo de Fuente'
                        idKey='id'
                        valueKey='tipo_fuente'
                    />
                </div>
                <div className={`flex ${widthList[2]}`}>
                {editMode? (
                    <>
                        <SecondarySubmit isDirty={isDirty} className='w-1/2 mx-1' buttonLabel='Guardar'/>
                        <TertiaryButton className='w-1/2 mx-1' handleAction={() => handleCancel()} buttonLabel='Cancelar'/>
                    </>
                ):(
                    <>
                        <div className='w-1/2'>
                            <Link className='button-3' href={`/cursos/${idCurso}/fuentes/${fuente.id}/detalles`}>Ver Detalles</Link>
                            <Link className='button-3' href={`/cursos/${idCurso}/fuentes/${fuente.id}/autores`}>Ver Autores</Link>
                        </div>
                        <div className='w-1/2'>
                            <UpdateButton title='Actualizar Cita Bibligrafica' className='mx-2' handleUpdate={()=>console.log('update')}/>
                            <EditButton title='Editar Fuente' className='mx-2' handleEdit={() => setEditMode(true)}/>
                            <DeleteButton title='Eliminar Fuente' className='mx-2' handleDelete={() => handleDelete(fuente.id)} />
                        </div>
                    </>
                )}
                </div>
            </form>
            <div>- {fuente.cita}</div>
        </div>
    );
};

export default Fuente;
