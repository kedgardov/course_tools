'use client'
import DeleteButton from '@/components/deleteButton';
import EditButton from '@/components/editButton';
import SecondarySubmit from '@/components/secondarySubmit';
import SelectInput from '@/components/selectInput';
import TertiaryButton from '@/components/tertiaryButton';
import { NivelAcademicoType } from '@/models/nivelAcademico';
import { OpcionTerminalType } from '@/models/opcionTerminal';
import { OpcionTerminalCursoDataScheme, OpcionTerminalCursoDataType, OpcionTerminalCursoType } from '@/models/opcionTerminalCurso';
import { ProgramaType } from '@/models/programa';
import WidthType from '@/models/width';
import fakeApiCall from '@/utils/fakeApi';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';



const OpcionTerminal = ({
    className,
    opcionTerminal,
    handleDelete,
    catalogoOpcionesTerminales,
    catalogoProgramas,
    catalogoNivelesAcademicos,
    widthList,
    startLoadingMode,
    stopLoadingMode,
}:{
    className: string,
    opcionTerminal: OpcionTerminalCursoType,
    handleDelete: (id: number) => void,
    catalogoOpcionesTerminales: OpcionTerminalType[],
    catalogoProgramas: ProgramaType[],
    catalogoNivelesAcademicos: NivelAcademicoType[],
    widthList:[WidthType, WidthType, WidthType, WidthType],
    startLoadingMode: () => void,
    stopLoadingMode: () => void,
}) => {

    const [editMode, setEditMode] = useState<boolean>(false);

    const { register, handleSubmit, reset, formState:{ errors, isDirty } } = useForm<OpcionTerminalCursoDataType>({
        resolver: zodResolver(OpcionTerminalCursoDataScheme),
        defaultValues: OpcionTerminalCursoDataScheme.parse(opcionTerminal)
    });

    const onSubmit: SubmitHandler<OpcionTerminalCursoDataType> = async (data) => {
        startLoadingMode()
        const response = fakeApiCall();
        if((await response).success){
            reset(data);
            setEditMode(false);
        }else{
            console.log('Algo salio mal');
        }
        stopLoadingMode();
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
                <SelectInput<OpcionTerminalType>
                    className='w-full'
                    idPrefix='id-opcion-terminal'
                    idRaw={`${opcionTerminal.id}`}
                    register={register('id_opcion_terminal', { valueAsNumber: true })}
                    editMode={editMode}
                    options={catalogoOpcionesTerminales}
                    error={errors.id_opcion_terminal}
                    placeholder='Selecciona una Opcion Terminal'
                    idKey='id'
                    valueKey='opcion_terminal'
                    showBorder={false}
                />
            </div>
            <div className={widthList[1]}>
                <SelectInput<ProgramaType>
                    className='w-full'
                    idPrefix='id-programa-academico'
                    idRaw={`${opcionTerminal.id}`}
                    register={register('id_programa', { valueAsNumber: true })}
                    editMode={editMode}
                    options={catalogoProgramas}
                    error={errors.id_programa}
                    placeholder='Selecciona un Programa'
                    idKey='id'
                    valueKey='programa'
                    showBorder={false}
                />
            </div>
            <div className={widthList[2]}>
                <SelectInput<NivelAcademicoType>
                    className='w-full'
                    idPrefix='id-modalidad-curso-en-opcion-terminal'
                    idRaw={`${opcionTerminal.id}`}
                    register={register('id_nivel_academico', { valueAsNumber: true })}
                    editMode={editMode}
                    options={catalogoNivelesAcademicos}
                    error={errors.id_nivel_academico}
                    placeholder='Selecciona una Modalidad'
                    idKey='id'
                    valueKey='nivel_academico'
                    showBorder={false}
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
                    <EditButton title='Editar Opcion Terminal' className='mx-2' handleEdit={() => setEditMode(true)}/>
                    <DeleteButton title='Eliminar Opcion Terminal' className='mx-2' handleDelete={ () => handleDelete(opcionTerminal.id) }/>
                </>
            )}
            </div>
        </form>
    );
};

export default OpcionTerminal;