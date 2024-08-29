'use client'
import { ModalidadType } from '@/models/modalidad';
import { OpcionTerminalType } from '@/models/opcionTerminal';
import { OpcionTerminalCursoDataScheme, OpcionTerminalCursoDataType, OpcionTerminalCursoType } from '@/models/opcionTerminalCurso';
import { ProgramaType } from '@/models/programa';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import WidthType from '@models/width';
import EditButton from '@/components/editButton';
import DeleteButton from '@/components/deleteButton';
import SecondarySubmit from '@/components/secondarySubmit';
import TertiaryButton from '@/components/tertiaryButton';

import SelectInput from '@components/selectInput';

const OpcionTerminal = ({
    className,
    opcionTerminal,
    handleDelete,
    catalogoOpcionesTerminales,
    catalogoProgramas,
    catalogoModalidades,
    widthList,
}:{
    className: string,
    opcionTerminal: OpcionTerminalCursoType,
    handleDelete: (id: number) => void,
    catalogoOpcionesTerminales: OpcionTerminalType[],
    catalogoProgramas: ProgramaType[],
    catalogoModalidades: ModalidadType[],
    widthList: [WidthType, WidthType, WidthType, WidthType],
}) => {

    const [editMode, setEditMode] = useState<boolean>(false);

    const { register, handleSubmit, reset, formState:{ errors, isDirty } } = useForm<OpcionTerminalCursoDataType>({
        resolver: zodResolver(OpcionTerminalCursoDataScheme),
        defaultValues: OpcionTerminalCursoDataScheme.parse(opcionTerminal)
    });

    const onSubmit: SubmitHandler<OpcionTerminalCursoDataType> = (data) => {
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
            className={`${className} flex`}
        >
            <div className={widthList[0]}>
                <SelectInput <OpcionTerminalType>
                    className='w-full'
                    idPrefix='id-opcion-terminal'
                    idRaw={`${opcionTerminal.id}`}
                    register={register('id_opcion_terminal',{ valueAsNumber:true })}
                    editMode={editMode}
                    options={catalogoOpcionesTerminales}
                    error={errors.id_opcion_terminal}
                    placeholder='Selecciona una Opcion Terminal'
                    idKey='id'
                    valueKey='opcion_terminal'
                />
            </div>
            <div className={widthList[1]}>
                <SelectInput<ProgramaType>
                    className='w-full'
                    idPrefix='id-programa-academico'
                    idRaw={`${opcionTerminal.id}`}
                    register={register('id_programa', { valueAsNumber:true })}
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
                    idPrefix='id-modalidad-curso'
                    idRaw={`${opcionTerminal.id}`}
                    register={register('id_modalidad',{ valueAsNumber:true })}
                    editMode={editMode}
                    options={catalogoModalidades}
                    error={errors.id_modalidad}
                    placeholder='Selecciona una modalidad'
                    idKey='id'
                    valueKey='modalidad'
            />
            </div>
            <div className={widthList[3]}>
            {editMode? (
                <div className='flex'>
                    <button type='submit'>Guardar</button>
                    <SecondarySubmit isDirty={isDirty} className='w-1/2 mx-1' buttonLabel='Guardar'/>
                    <TertiaryButton className='w-1/2 mx-1' handleAction={() => handleCancel()} buttonLabel='Cancelar'/>
                </div>
            ):(
                <>
                    <EditButton title='Editar Opcion Terminal' className='mx-2' handleEdit={() => setEditMode(true)}/>
                    <DeleteButton title='Eliminar Opcion Terminal' className='mx-2' handleDelete={ () => handleDelete(opcionTerminal.id) }/>
                </>
            )}
            </div>
        </form>
    );
};

export default OpcionTerminal;
