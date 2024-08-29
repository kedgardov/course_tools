'use client'
import DeleteButton from '@/components/deleteButton';
import EditButton from '@/components/editButton';
import SecondarySubmit from '@/components/secondarySubmit';
import SelectInput from '@/components/selectInput';
import TertiaryButton from '@/components/tertiaryButton';
import { LGACType } from '@/models/lgac';
import { LGACCursoDataScheme, LGACCursoDataType, LGACCursoType } from '@/models/lgacCurso';
import { ModalidadType } from '@/models/modalidad';
import { ProgramaType } from '@/models/programa';
import WidthType from '@/models/width';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';



const LGAC = ({
    className,
    lgac,
    handleDelete,
    catalogoLGACs,
    catalogoProgramas,
    catalogoModalidades,
    widthList,
}:{
    className: string,
    lgac: LGACCursoType,
    handleDelete: (id: number) => void,
    catalogoLGACs: LGACType[],
    catalogoProgramas: ProgramaType[],
    catalogoModalidades: ModalidadType[],
    widthList:[WidthType, WidthType, WidthType, WidthType],
}) => {

    const [editMode, setEditMode] = useState<boolean>(false);

    const { register, handleSubmit, reset, formState:{ errors, isDirty } } = useForm<LGACCursoDataType>({
        resolver: zodResolver(LGACCursoDataScheme),
        defaultValues: LGACCursoDataScheme.parse(lgac)
    });

    const onSubmit: SubmitHandler<LGACCursoDataType> = (data) => {
        console.log(data);
        setEditMode(false);
        reset(data);
    }

    const handleCancel = () => {
        reset();
        setEditMode(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className={`${className}`}
        >
            <div className={widthList[0]}>
                <SelectInput<LGACType>
                    className='w-full'
                    idPrefix='id-linea-generacion-aplicacion-conocimiento'
                    idRaw={`${lgac.id}`}
                    register={register('id_lgac', { valueAsNumber: true })}
                    editMode={editMode}
                    options={catalogoLGACs}
                    error={errors.id_lgac}
                    placeholder='Selecciona una LGAC'
                    idKey='id'
                    valueKey='lgac'
                />
            </div>
            <div className={widthList[1]}>
                <SelectInput<ProgramaType>
                    className='w-full'
                    idPrefix='id-programa-academico'
                    idRaw={`${lgac.id_programa}`}
                    register={register('id_programa', { valueAsNumber: true })}
                    editMode={editMode}
                    options={catalogoProgramas}
                    error={errors.id_programa}
                    placeholder='Selecciona un Programa'
                    idKey='id'
                    valueKey='programa'
                />
            </div>
            <div className={widthList[2]}>
                <SelectInput<ModalidadType>
                    className='w-full'
                    idPrefix='id-modalidad-curso-en-lgac'
                    idRaw={`${lgac.id_modalidad}`}
                    register={register('id_modalidad', { valueAsNumber: true })}
                    editMode={editMode}
                    options={catalogoModalidades}
                    error={errors.id_modalidad}
                    placeholder='Selecciona una Modalidad'
                    idKey='id'
                    valueKey='modalidad'
                />
            </div>
            <div className={widthList[3]}>
            {editMode? (
                <div className='flex'>
                    <SecondarySubmit isDirty={isDirty} className='w-1/2 mx-1' buttonLabel='Guardar'/>
                    <TertiaryButton className='w-1/2 mx-1' handleAction={() => handleCancel()} buttonLabel='Cancelar'/>
                </div>
            ):(
                <>
                    <EditButton title='Editar LGAC' className='mx-2' handleEdit={() => setEditMode(true)}/>
                    <DeleteButton title='Eliminar LGAC' className='mx-2' handleDelete={ () => handleDelete(lgac.id) }/>
                </>
            )}
            </div>
        </form>
    );
};

export default LGAC;
