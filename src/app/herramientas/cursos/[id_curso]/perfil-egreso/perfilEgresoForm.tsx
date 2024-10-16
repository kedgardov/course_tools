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
import TablaHabilidadesCurso from "./tablaHabilidadesCurso";
import { HabilidadCursoType, HabilidadType } from "@/models/habilidad";
import { GrupoHabilidadType } from "@/models/grupoHabilidad";
import TextArea from "@/components/textArea";

const PerfilEgresoForm = ({
    idCurso,
    token,
    className,
    habilidadesCurso,
    catalogoHabilidades,
    catalogoGruposHabilidades,
    curso,
}:{
    idCurso: number,
    token: string,
    className: string,
    curso: CursoType,
    habilidadesCurso: HabilidadCursoType[],
    catalogoHabilidades: HabilidadType[],
    catalogoGruposHabilidades: GrupoHabilidadType[],
}) => {
    const [ editMode, setEditMode ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);

    const { register, reset, handleSubmit, formState: { isDirty, errors } } = useForm<CursoEgresoType>({
        resolver: zodResolver(CursoEgresoScheme),
        defaultValues: CursoEgresoScheme.parse(curso),
    });

    const onSubmit: SubmitHandler<CursoEgresoType>  = async (data) => {
        const updatedCurso: CursoType = {
            ...curso,
            conocimientos: data.conocimientos,
            actitudes: data.actitudes,
            vinculo_objetivos_posgrado: data.vinculo_objetivos_posgrado,
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
            <div className='flex items-center space-x-2'>
                <h2 className='title-2'>Vinculos con el Perfil de Egreso del Curso</h2>
                {!editMode && (
                    <EditButton className='' title='Editar Informacion Sobre el Perfil de Egreso del Curso' handleEdit={() => setEditMode(true)} />
                )}
                <LoadingComponent isLoading={isLoading} />
            </div>
            <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                <div className='pt-2 px-2'>
                    <h2 className='title-3'>Conocimientos a Desarrollar en el Curso</h2>
            <div className='h-40'>
                    <TextArea
                        className='w-full h-40'
                        idPrefix='conocimientos-del-curso'
                        idRaw='0'
                        editMode={editMode}
                        register={register('conocimientos')}
                        placeholder='Ingrese los conocimientos que obtendra el alumno a lo largo de este curso'
                        error={errors.conocimientos}
                        showBorder={true}
                    />
            </div>
                </div>
            <div className='pt-2 px-2'>
                    <h2 className='title-3'> Actitudes a Desarrollar en el Curso </h2>
                    <div className='h-40'><TextArea
                        className='w-full h-40'
                        idPrefix='actitudes-del-curso'
                        idRaw='0'
                        editMode={editMode}
                        register={register('actitudes')}
                        placeholder='Ingrese las actitudes que se desarrollaran y fortaleceran durante el curso'
                        error={errors.actitudes}
                        showBorder={true}
                    />
            </div>
                </div>

<div className='pt-2 px-2'>
                    <h2 className='title-3'> Vinculo del Curso con los Objetivos del Posgrado</h2>
                    <div className='h-40'><TextArea
                        className='w-full h-40'
                        idPrefix='vinculo-objetivos-posgrado-curso'
                        idRaw='0'
                        editMode={editMode}
                        register={register('vinculo_objetivos_posgrado')}
                        placeholder='Ingrese los vinculos de este curso con el objetivo del posgrado'
                        error={errors.vinculo_objetivos_posgrado}
                        showBorder={true}
                    />
            </div>
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
