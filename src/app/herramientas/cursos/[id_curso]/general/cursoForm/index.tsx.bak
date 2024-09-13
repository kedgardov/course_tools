'use client'
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CursoType, CursoDataType, CursoDataScheme } from '@models/curso';
import TextInputLabel from '@components/textInputLabel';
import { updateCurso } from '@utils/cursos/updateCurso';
import Spinner from '@components/spinner';
import NumberInputLabel from '@/components/numberInputLabel';
import EditButton from '@/components/editButton';
import SecondarySubmit from '@/components/secondarySubmit';
import TertiaryButton from '@/components/tertiaryButton';

const CursoForm = ({
    curso,
    token,
    className,
    isLoading,
}: {
    curso: CursoType,
    token:string,
    className: string,
    isLoading: boolean,
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);

    const { register, reset, handleSubmit, formState: { errors, isDirty } } = useForm<CursoDataType>({
        resolver: zodResolver(CursoDataScheme),
        defaultValues: CursoDataScheme.parse(curso),
    });

    const handleCancel = () => {
        reset();
        setEditMode(false);
    };

    const onSubmit: SubmitHandler<CursoDataType> = (data) => {
        setLoading(true);
        reset(data);
        setLoading(false);
        setEditMode(false);

    };

    return (
            <form onSubmit={handleSubmit(onSubmit)} className={`${className}`}>
                <fieldset className=''>
                    <legend className=' p-1 flex'>
                        <h2 className='title-2'>Informacion General del Curso</h2>
                        {editMode? (
                        <>
                            <SecondarySubmit className='mx-1' isDirty={isDirty} buttonLabel='Guardar'/>
                            <TertiaryButton className='mx-1' handleAction={ () => handleCancel() } buttonLabel='Cancelar'/>
                        </>
                        ):(
                        <>
                            <EditButton title='Editar Informacion del Curso' className='mx-2' handleEdit={() => setEditMode(true)} />
                            {loading && <Spinner size={1.5} color='black' className='ml-2' />}
                        </>
                        )}
                    </legend>
                    <TextInputLabel
                        className='p-2'
                        label='Nombre del Curso en Ingles'
                        idPrefix='nombre-curso'
                        idRaw={`${curso.id}`}
                        editMode={editMode}
                        register={register('nombre_ingles')}
                        placeholder='Ingrese el Nombre del Curso en Ingles'
                        error={errors.nombre_ingles}
                        isLoading={isLoading}
                    />
                    <div className='flex p-1'>
                       <NumberInputLabel
                            className='curso-number-input'
                            label='Horas Teoricas'
                            idPrefix='horas-teoricas-curso'
                            idRaw={`${curso.id}`}
                            editMode={editMode}
                            register={register('horas_teoricas', { valueAsNumber:true })}
                            placeholder='Ingrese Horas por Semana'
                            error={errors.horas_teoricas}
                        />
                        <NumberInputLabel
                            className='curso-number-input'
                            label='Horas Practicas'
                            idPrefix='horas-practicas-curso'
                            idRaw={`${curso.id}`}
                            editMode={editMode}
                            register={register('horas_practicas', { valueAsNumber:true })}
                            placeholder='Ingrese Horas por Semana'
                            error={errors.horas_practicas}
                        />
                        <NumberInputLabel
                            className='curso-number-input'
                            label='Horas Independientes'
                            idPrefix='horas-independientes-curso'
                            idRaw={`${curso.id}`}
                            editMode={editMode}
                            register={register('horas_independientes', { valueAsNumber:true })}
                            placeholder='Ingrese Horas por Semana'
                            error={errors.horas_independientes}
                        />
                        <NumberInputLabel
                            className='curso-number-input'
                            label='Total Horas por Semana'
                            idPrefix='total-horas-semana-curso'
                            idRaw={`${curso.id}`}
                            editMode={editMode}
                            register={register('horas_semana', { valueAsNumber:true })}
                            placeholder='Ingrese Horas por Semana'
                            error={errors.horas_semana}
                        />
                        <NumberInputLabel
                            className='curso-number-input'
                            label='Total Horas por Semestre'
                            idPrefix='total-horas-semestre-curso'
                            idRaw={`${curso.id}`}
                            editMode={editMode}
                            register={register('horas_semestre', { valueAsNumber:true })}
                            placeholder='Ingrese Horas por Semestre'
                            error={errors.horas_semestre}
                        />
                    </div>
                </fieldset>
            </form>
    );
};

export default CursoForm;


