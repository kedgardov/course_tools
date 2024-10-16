'use client'
import Alert from '@/components/alert';
import DeleteButton from '@/components/deleteButton';
import EditButton from '@/components/editButton';
import SecondarySubmit from '@/components/secondarySubmit';
import SelectInput from '@/components/selectInput';
import TertiaryButton from '@/components/tertiaryButton';
import { NivelCurricularType } from '@/models/nivelCurricular';
import { OpcionTerminalType } from '@/models/opcionTerminal';
import { OpcionTerminalCursoDataScheme, OpcionTerminalCursoDataType, OpcionTerminalCursoType } from '@/models/opcionTerminalCurso';
import { ProgramaType } from '@/models/programa';
import WidthType from '@/models/width';
import { updateOpcionTerminalCurso } from '@/utils/cursos/updateOpcionTerminalCurso';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';



const OpcionTerminal = ({
    className,
    token,
    opcionTerminal,
    handleDelete,
    catalogoOpcionesTerminales,
    catalogoProgramas,
    catalogoNivelesCurriculares,
    widthList,
    startLoadingMode,
    stopLoadingMode,
    canEdit,
}:{
    className: string,
    token: string,
    opcionTerminal: OpcionTerminalCursoType,
    handleDelete: (id: number) => void,
    catalogoOpcionesTerminales: OpcionTerminalType[],
    catalogoProgramas: ProgramaType[],
    catalogoNivelesCurriculares: NivelCurricularType[],
    widthList: WidthType[],
    startLoadingMode: () => void,
    stopLoadingMode: () => void,
    canEdit: boolean,
}) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState:{ errors, isDirty } } = useForm<OpcionTerminalCursoDataType>({
        resolver: zodResolver(OpcionTerminalCursoDataScheme),
        defaultValues: OpcionTerminalCursoDataScheme.parse(opcionTerminal)
    });

    const onSubmit: SubmitHandler<OpcionTerminalCursoDataType> = async (data) => {
        startLoadingMode();
        const updatedOpcionTerminal: OpcionTerminalCursoType = {
            id: opcionTerminal.id,
            id_curso: opcionTerminal.id_curso,
            id_opcion_terminal: data.id_opcion_terminal,
            id_programa: data.id_programa,
            id_nivel_curricular: data.id_nivel_curricular,
        };
        const response = await updateOpcionTerminalCurso(updatedOpcionTerminal, token);
        if(response.success){
            reset(data);
            setEditMode(false);
        }else{
            setError(response.message);
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
                <SelectInput<NivelCurricularType>
                    className='w-full'
                    idPrefix='id-modalidad-curso-en-opcion-terminal'
                    idRaw={`${opcionTerminal.id}`}
                    register={register('id_nivel_curricular', { valueAsNumber: true })}
                    editMode={editMode}
                    options={catalogoNivelesCurriculares}
                    error={errors.id_nivel_curricular}
                    placeholder='Selecciona una Modalidad'
                    idKey='id'
                    valueKey='nivel_curricular'
                    showBorder={false}
                />
            </div>
            {canEdit && (
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
            )}
            <Alert
                error={error}
                setError={setError}
            />
        </form>
    );
};

export default OpcionTerminal;
