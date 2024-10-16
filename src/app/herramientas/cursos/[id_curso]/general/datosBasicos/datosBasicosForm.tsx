'use client'
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import EditButton from "@/components/editButton";
import TextInputLabel from "@/components/textInputLabel";
import SelectInputLabel from '@/components/selectInputLabel';


import { CursoBasicDataScheme, CursoBasicDataType, CursoType } from "@/models/curso";
import { TipoCursoType } from '@/models/tipoCurso';
import { ModalidadCursoType } from '@/models/modalidadCurso';
import CancelButton from '@/components/cancelButton';
import GuardarButton from '@/components/guardarButton';

import { updateCurso } from '@/utils/cursos/updateCurso';
import Alert from '@/components/alert';

const DatosBasicosForm = ({
    className,
    idCurso,
    token,
    curso,
    catalogoTiposCursos,
    catalogoModalidadesCursos,
    canEdit,
}:{
    className: string,
    idCurso: number,
    token: string,
    curso: CursoType,
    catalogoTiposCursos: TipoCursoType[],
    catalogoModalidadesCursos: ModalidadCursoType[],
    canEdit: boolean,
}) => {
    const [error, setError] = useState<string | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const { register, reset, handleSubmit, formState: { errors, isDirty } } = useForm<CursoBasicDataType>({
        resolver: zodResolver(CursoBasicDataScheme),
        defaultValues: CursoBasicDataScheme.parse(curso),
    });

    const handleCancel = () => {
        reset();
        setEditMode(false);
    };

    const onSubmit: SubmitHandler<CursoBasicDataType> = async ( data ) => {
        setLoading(true)
        const newCurso: CursoType = {
            ...curso,
            nombre_ingles: data.nombre_ingles,
            id_tipo: data.id_tipo,
            id_modalidad: data.id_modalidad,
        };
        const response = await updateCurso(newCurso, token);
        if( response.success ){
            reset(data);
            setEditMode(false)
        } else {
            setError(response.message);
        }
        setLoading(false);
    }

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} className={`${className}`}>
            <fieldset>
                <legend className='m-1 title-2-container'>
                    <h2 className='title-2'>Datos Basicos</h2>
                    {canEdit && !editMode && !loading && (
                        <EditButton
                            className='mx-1'
                            title='Editar datos basicos del curso'
                            handleEdit={() => setEditMode(true)}
                            />
                    )}
                    {loading && (
                        <p>Loading</p>
                    )}
                </legend>
                <div className='px-2'>
                <TextInputLabel
                    className='m-1'
                    label='Nombre del Curso en Ingles'
                    helpText=''
                    idPrefix='nombre-curso'
                    idRaw={`${idCurso}`}
                    editMode={editMode}
                    register={register('nombre_ingles')}
                    placeholder='Ingrese el Nombre del Curso en Ingles'
                    error={errors.nombre_ingles}
                    showBorder={true}
                />
                <div className='flex my-4'>
                    <SelectInputLabel <TipoCursoType>
                        className='m-1'
                        idPrefix='id-tipo-curso'
                        idRaw={`${idCurso}`}
                        label='Tipo de Curso'
                        helpText='El tipo de curso puede ser obligatorio u optativo'
                        register={register('id_tipo', { valueAsNumber:true })}
                        editMode={editMode}
                        options={catalogoTiposCursos}
                        error={errors.id_tipo}
                        placeholder='Seleccione un Tipo'
                        idKey='id'
                        valueKey='tipo'
                        showBorder={true}
                    />
                    <SelectInputLabel <ModalidadCursoType>
                        className='m-1'
                        idPrefix='id-modalidad-curso'
                        idRaw={`${idCurso}`}
                        label='Modalidad del Curso'
                        helpText='La modalidad del curso puede ser presencial, virtual o hibrida'
                        register={register('id_modalidad', { valueAsNumber:true })}
                        editMode={editMode}
                        options={catalogoModalidadesCursos}
                        error={errors.id_modalidad}
                        placeholder='Seleccione una Modalidad'
                        idKey='id'
                        valueKey='modalidad'
                        showBorder={true}
                    />
                </div>
                {editMode && (
                    <div className='flex m-1'>
                        <GuardarButton
                            className='m-1'
                            isDirty={isDirty}
                        />
                        <CancelButton
                            className='m-1'
                            handleCancel={() => handleCancel()}
                        />
                    </div>
                )}
        </div>
            </fieldset>
        </form>
            <Alert error={error} setError={setError}/>
            </>
    );
};

export default DatosBasicosForm;
