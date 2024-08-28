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

import fakeApiCall from '@utils/fakeApi';



const DatosBasicosForm = ({
    className,
    idCurso,
    curso,
    catalogoTiposCursos,
    catalogoModalidadesCursos,
}:{
    className: string,
    idCurso: number,
    curso: CursoType,
    catalogoTiposCursos: TipoCursoType[],
    catalogoModalidadesCursos: ModalidadCursoType[],
}) => {

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
        const response = await fakeApiCall();
        if( response.success ){
            reset(data);
            setEditMode(false)
        } else {
            console.log('Algo salio mal');
            //ALERT
        }
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`${className}`}>
            <fieldset>
                <legend className='m-1 title-2-container'>
                    <h2 className='title-2'>Datos Basicos</h2>
                    {!editMode && !loading && (
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
                <div className='flex'>
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
                        valueKey='tipo_curso'
                        showBorder={true}
                    />
                    <SelectInputLabel <ModalidadCursoType>
                        className='m-1'
                        idPrefix='id-modalidad-curso'
                        idRaw={`${idCurso}`}
                        label='Tipo de Curso'
                        helpText='La modalidad del curso puede ser presencial, virtual o hibrida'
                        register={register('id_modalidad', { valueAsNumber:true })}
                        editMode={editMode}
                        options={catalogoModalidadesCursos}
                        error={errors.id_modalidad}
                        placeholder='Seleccione una Modalidad'
                        idKey='id'
                        valueKey='modalidad_curso'
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
            </fieldset>
        </form>
    );
};

export default DatosBasicosForm;
