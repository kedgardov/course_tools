'use client'
import Alert from "@/components/alert";
import EditButton from "@/components/editButton";
import LoadingComponent from "@/components/loading";
import SecondarySubmit from "@/components/secondarySubmit";
import TertiaryButton from "@/components/tertiaryButton";
import TextAreaLabel from "@/components/textAreaLabel";
import { CursoEgresoScheme, CursoEgresoType, CursoType } from "@/models/curso";
import { updateCurso } from "@/utils/cursos/updateCurso";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const PerfilEgresoForm = ({
    idCurso,
    token,
    className,
    curso,
}:{
    idCurso: number,
    token: string,
    className: string,
    curso: CursoType,
}) => {
    const [ editMode, setEditMode ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);

    const { register, reset, handleSubmit, formState: { isDirty, errors } } = useForm<CursoEgresoType>({
        resolver: zodResolver(CursoEgresoScheme),
        defaultValues: CursoEgresoScheme.parse(curso),
    });

    const onSubmit: SubmitHandler<CursoEgresoType>  = async (data) => {
        const updatedCurso = {
            ...curso,
            conocimientos: data.conocimientos,
            actitudes: data.actitudes,
        };
        const response = await updateCurso(updatedCurso, token);
        if ( response.success ){
            reset(data);
            setEditMode(false);
        } else {
            setError(response.message);
        }
        setIsLoading(false);
    };


    const handleCancel = () => {
        reset();
        setEditMode(false);
    };


    return (
        <section className={className}>
            <div className='flex items-center'>
                <h2 className='title-2-dark'>Perfil de Egreso del Curso</h2>
                {!editMode && (
                    <EditButton className='' title='Editar Informacion Sobre el Perfil de Egreso del Curso' handleEdit={() => setEditMode(true)} />
                )}
                <LoadingComponent isLoading={isLoading} />
            </div>
            <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <TextAreaLabel
                        className='w-full h-40'
                        idPrefix='conocimientos-del-curso'
                        idRaw='0'
                        label='Conocimientos del Curso'
                        helpText=''
                        editMode={editMode}
                        register={register('conocimientos')}
                        placeholder='Ingrese los conocimientos que obtendra el alumno a lo largo de este curso'
                        error={errors.conocimientos}
                        showBorder={true}
                    />
                </div>
                <div>
                    <TextAreaLabel
                        className='w-full h-40'
                        idPrefix='actitudes-del-curso'
                        idRaw='0'
                        label='Actitudes del Curso'
                        helpText=''
                        editMode={editMode}
                        register={register('actitudes')}
                        placeholder='Ingrese las actitudes que se transmitiran al alumno durante el curso'
                        error={errors.actitudes}
                        showBorder={true}
                    />
                </div>
                {editMode && (
                <div className='flex justify-end'>
                    <SecondarySubmit className='mx-1' buttonLabel='Guardar' isDirty={isDirty} />
                    <TertiaryButton className='mx-1' buttonLabel='Cancelar' handleAction={() => handleCancel()} />
                </div>
                )}
                {error && <Alert error={error} setError={setError} />}
            </form>
        </section>
    );
};

export default PerfilEgresoForm;
