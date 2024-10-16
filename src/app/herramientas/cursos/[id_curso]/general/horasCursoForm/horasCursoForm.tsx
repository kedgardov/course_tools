'use client'

import Alert from "@/components/alert";
import CancelButton from "@/components/cancelButton";
import EditButton from "@/components/editButton";
import GuardarButton from "@/components/guardarButton";
import LoadingComponent from "@/components/loading";
import NumberInputLabel from "@/components/numberInputLabel";
import { CursoHorasScheme, CursoHorasType, CursoType } from "@/models/curso";
import { updateCurso } from "@/utils/cursos/updateCurso";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const HorasCursoForm = ({
    className,
    token,
    idCurso,
    curso,
    canEdit,
}:{
    className: string,
    token: string,
    idCurso: number,
    curso: CursoType,
    canEdit: boolean,
}) => {
    const [ editMode, setEditMode ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { isDirty, errors } } = useForm<CursoHorasType>({
        resolver: zodResolver(CursoHorasScheme),
        defaultValues: CursoHorasScheme.parse(curso),
    });

    const handleCancel = () => {
        reset();
        setEditMode(false);
    };


    const onSubmit: SubmitHandler<CursoHorasType> = async ( data ) => {
        setIsLoading(true);
        const updatedHoras: CursoType = {
            ...curso,
            horas_semana: data.horas_semana,
            horas_practicas_semana: data.horas_practicas_semana,
            horas_teoricas_semana: data.horas_teoricas_semana,
            horas_semestre: data.horas_semestre,
            horas_practicas_semestre: data.horas_practicas_semestre,
            horas_teoricas_semestre: data.horas_teoricas_semestre,
            creditos: data.creditos,
        };
        const response = await updateCurso(updatedHoras, token);
        if( response.success ){
            reset(data);
            setEditMode(false)
        } else {
            setError(response.message);
        }
        setIsLoading(false);
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`${className}`}>
            <legend className='m-1 title-2-container'>
                <h2 className='title-2'>Horas y Créditos</h2>
                {canEdit && !editMode && (
                    <EditButton
                        className='mx-1'
                        title='Editar Informacion Sobre Horas y Creditos Del Curso'
                        handleEdit={() => setEditMode(true)}
                    />
                )}
                {isLoading && (<LoadingComponent isLoading={isLoading}/>)}
            </legend>
            <div className='flex border m-2 p-2'>
                <NumberInputLabel
                    className='m-1 w-1/3'
                    label='Horas de Teoria (Semana)'
                    helpText='Horas Teoricas Por Semana de Curso'
                    idPrefix='horas-teoria-semana'
                    idRaw={`${idCurso}`}
                    editMode={editMode}
                    register={register('horas_teoricas_semana', { valueAsNumber: true })}
                    placeholder='Ingrese horas teoricas por semana'
                    error={errors.horas_teoricas_semana}
                    showBorder={true}
                />
                <NumberInputLabel
                    className='m-1 w-1/3'
                    label='Horas Practicas (Semana)'
                    helpText='Horas Practicas Por Semana de Curso'
                    idPrefix='horas-practicas-semana'
                    idRaw={`${idCurso}`}
                    editMode={editMode}
                    register={register('horas_practicas_semana', { valueAsNumber: true })}
                    placeholder='Ingrese horas practicas por semana'
                    error={errors.horas_practicas_semana}
                    showBorder={true}
                />
                <NumberInputLabel
                    className='m-1 w-1/3'
                    label='Horas Totales (Semana)'
                    helpText='Total Horas Por Semana de Curso'
                    idPrefix='horas-semana'
                    idRaw={`${idCurso}`}
                    editMode={editMode}
                    register={register('horas_semana', { valueAsNumber: true })}
                    placeholder='Ingrese total de horas por semana'
                    error={errors.horas_semana}
                    showBorder={true}
                />
            </div>
            <div className='flex border m-2 p-2'>
                <NumberInputLabel
                    className='m-1 w-1/3'
                    label='Horas de Teoria (Semestre)'
                    helpText='Horas Teoricas Por Semestre de Curso'
                    idPrefix='horas-teoricas-semestre'
                    idRaw={`${idCurso}`}
                    editMode={editMode}
                    register={register('horas_teoricas_semestre', { valueAsNumber: true })}
                    placeholder='Ingrese horas teoricas por semestre'
                    error={errors.horas_teoricas_semestre}
                    showBorder={true}
                />
                <NumberInputLabel
                    className='m-1 w-1/3'
                    label='Horas Practicas (Semestre)'
                    helpText='Horas Practicas Por Semestre de Curso'
                    idPrefix='horas-practicas-semestre'
                    idRaw={`${idCurso}`}
                    editMode={editMode}
                    register={register('horas_practicas_semestre', { valueAsNumber: true })}
                    placeholder='Ingrese horas practicas por semestre'
                    error={errors.horas_practicas_semestre}
                    showBorder={true}
                />
                <NumberInputLabel
                    className='m-1 w-1/3'
                    label='Horas Totales (Semestre)'
                    helpText='Total Horas Por Semestre de Curso'
                    idPrefix='horas-semestre'
                    idRaw={`${idCurso}`}
                    editMode={editMode}
                    register={register('horas_semestre', { valueAsNumber: true })}
                    placeholder='Ingrese total de horas por semestre'
                    error={errors.horas_semestre}
                    showBorder={true}
                />
            </div>
                <div className='flex m-2 p-2  w-1/3 ml-auto '>
                <NumberInputLabel
                    className='w-full'
                    label='Creditos'
                    helpText='Creditos del Curso'
                    idPrefix='creditos-curso'
                    idRaw={`${idCurso}`}
                    editMode={editMode}
                    register={register('creditos', { valueAsNumber: true })}
                    placeholder='Ingrese los Creditos de la Materia'
                    error={errors.creditos}
                    showBorder={true}
                />
                </div>

            {/* Optionally you could add another block here for "creditos" */}
            {editMode && (
                <div className='flex m-2 p-2'>
                    <GuardarButton className='m-1 ml-auto' isDirty={isDirty}/>
                    <CancelButton className='m-1' handleCancel={() => handleCancel()}/>
                </div>
            )}
            <Alert error={error} setError={setError} />
        </form>
    );
};
export default HorasCursoForm;
