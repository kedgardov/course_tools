'use-client'
import Alert from "@/components/alert";
import DeleteButton from "@/components/deleteButton";
import EditButton from "@/components/editButton";
import LoadingComponent from "@/components/loading";
import SecondarySubmit from "@/components/secondarySubmit";
import SelectInput from "@/components/selectInput";
import TertiaryButton from "@/components/tertiaryButton";
import { GrupoHabilidadType } from "@/models/grupoHabilidad";
import { HabilidadCursoDataScheme, HabilidadCursoDataType, HabilidadCursoType, HabilidadType } from "@/models/habilidad";
import WidthType from "@/models/width";
import { updateHabilidadCurso } from "@/utils/habilidades/updateHabilidadCurso";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const HabilidadCurso = ({
    token,
    className,
    habilidad,
    widths,
    catalogoGruposHabilidades,
    catalogoHabilidades,
    handleDelete,
}:{
    token: string,
    className: string,
    habilidad: HabilidadCursoType,
    widths: [ WidthType, WidthType, WidthType ],
    catalogoGruposHabilidades: GrupoHabilidadType[],
    catalogoHabilidades: HabilidadType[],
    handleDelete: (idHabilidad: number) => void,
}) => {

    const [ filteredHabilidades, setFilteredHabilidades ] = useState<HabilidadType[]>(catalogoHabilidades);

    const [ editMode, setEditMode ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ apiError, setApiError ] = useState<string | null>(null);

    const { register, reset, handleSubmit, formState: { isDirty, errors }, watch, setError } = useForm<HabilidadCursoDataType>({
        resolver: zodResolver(HabilidadCursoDataScheme),
        defaultValues: HabilidadCursoDataScheme.parse(habilidad),
    });

    // Watch the value of id_grupo_habilidad
    const selectedGrupoHabilidad = Number(watch('id_grupo_habilidad', habilidad.id_grupo_habilidad));

    useEffect(()=> {
        const newFilteredHabilidades = catalogoHabilidades.filter((h) => h.id_grupo_habilidad === selectedGrupoHabilidad);
        setFilteredHabilidades(newFilteredHabilidades);

    },[catalogoHabilidades, selectedGrupoHabilidad, setFilteredHabilidades]);

    const handleCancel = () => {
        reset();
        setEditMode(false);
    };


    const onSubmit: SubmitHandler<HabilidadCursoDataType> = async (data) => {
        setIsLoading(true);
        if (!filteredHabilidades.find(h => h.id === data.id_habilidad)) {
            setError('id_habilidad', {
                type: 'manual',
                message: 'Selecciona una habilidad válida',
            });
            return;
        }
        const updatedHabilidadCurso: HabilidadCursoType = {
            id: habilidad.id,
            id_curso: habilidad.id_curso,
            id_habilidad: data.id_habilidad,
            id_grupo_habilidad: data.id_grupo_habilidad,
        };
        const response = await updateHabilidadCurso(updatedHabilidadCurso, token);
        if ( response.success ){
            reset(data);
            setEditMode(false);
        } else {
            setApiError(response.message);
        }
        setIsLoading(false);
    };


    return (
        <li onSubmit={handleSubmit(onSubmit)} className={`${className}`}>
            <form className='flex'>
                <SelectInput<GrupoHabilidadType>
                    className={`${widths[0]}`}
                    idPrefix='id-grupo-habilidad'
                    idRaw={`${habilidad.id}`}
                    editMode={editMode}
                    options={catalogoGruposHabilidades}
                    register={register('id_grupo_habilidad', { valueAsNumber: true })}
                    error={errors.id_grupo_habilidad}
                    placeholder='Seleccione un grupo de habilidades a desarrollar'
                    showBorder={false}
                    idKey='id'
                    valueKey='grupo_habilidad'
                />
                <SelectInput<HabilidadType>
                    className={`${widths[1]}`}
                    idPrefix='id-habilidad'
                    idRaw={`${habilidad.id}`}
                    editMode={editMode}
                    register={register('id_habilidad',{ valueAsNumber: true })}
                    options={filteredHabilidades}
                    error={ errors.id_habilidad }
                    placeholder='Selecciona una Habilidad a desarrollar'
                    showBorder={false}
                    idKey='id'
                    valueKey='habilidad'
                />
                <div className={`${widths[2]} flex`}>
                    {editMode? (
                        <>
                            <SecondarySubmit className='mx-2 w-1/2' buttonLabel='Guardar' isDirty={isDirty}/>
                            <TertiaryButton className='mx-2 w-1/2' buttonLabel='Cancelar' handleAction={() => handleCancel()} />
                        </>
                    ):(
                        <>
                            <EditButton className='mx-2' title='Editar Habilidad del Curso' handleEdit={() => setEditMode(true)} />
                            <DeleteButton className='mx-2' title='Eliminar Habilidad del Curso' handleDelete={() => handleDelete(habilidad.id)}/>
                        </>
                    )}
                    <LoadingComponent isLoading={isLoading}/>
                </div>
            </form>
            <Alert error={apiError} setError={setApiError}/>
        </li>
    );
};
export default HabilidadCurso;
