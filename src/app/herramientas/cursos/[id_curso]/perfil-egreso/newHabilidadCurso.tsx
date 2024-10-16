'use-client'

import SecondarySubmit from "@/components/secondarySubmit";
import SelectInput from "@/components/selectInput";
import TertiaryButton from "@/components/tertiaryButton";
import { GrupoHabilidadType } from "@/models/grupoHabilidad";
import { HabilidadCursoDataScheme, HabilidadCursoDataType, HabilidadCursoType, HabilidadType } from "@/models/habilidad";
import WidthType from "@/models/width";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const NewHabilidadCurso = ({
    token,
    className,
    widths,
    catalogoGruposHabilidades,
    catalogoHabilidades,
    handleAdd,
    selfDestruct,
}:{
    token: string,
    className: string,
    widths: [ WidthType, WidthType, WidthType ],
    catalogoGruposHabilidades: GrupoHabilidadType[],
    catalogoHabilidades: HabilidadType[],
    handleAdd: (data: HabilidadCursoDataType) => void,
    selfDestruct: () => void,
}) => {

    const [ filteredHabilidades, setFilteredHabilidades ] = useState<HabilidadType[]>([]);

    const { register, handleSubmit, formState: { isDirty, errors }, watch, setError } = useForm<HabilidadCursoDataType>({
        resolver: zodResolver(HabilidadCursoDataScheme),
    });

    // Watch the value of id_grupo_habilidad
    const selectedGrupoHabilidad = Number(watch('id_grupo_habilidad'));

    useEffect(()=> {
        const newFilteredHabilidades = catalogoHabilidades.filter((h) => h.id_grupo_habilidad === selectedGrupoHabilidad);
        setFilteredHabilidades(newFilteredHabilidades);

    },[catalogoHabilidades, selectedGrupoHabilidad, setFilteredHabilidades]);

    const handleCancel = () => {
        selfDestruct();
    };


    const onSubmit: SubmitHandler<HabilidadCursoDataType> = (data) => {
        if (!filteredHabilidades.find(h => h.id === data.id_habilidad)) {
            setError('id_habilidad', {
                type: 'manual',
                message: 'Selecciona una habilidad válida',
            });
            return;
        }

        handleAdd(data);
        selfDestruct();
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`${className} flex`}>
                <SelectInput<GrupoHabilidadType>
                    className={`${widths[0]}`}
                    idPrefix='id-grupo-habilidad'
                    idRaw='0'
                    editMode={true}
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
                    idRaw='0'
                    editMode={true}
                    register={register('id_habilidad',{ valueAsNumber: true })}
                    options={filteredHabilidades}
                    error={ errors.id_habilidad }
                    placeholder='Selecciona una Habilidad a desarrollar'
                    showBorder={false}
                    idKey='id'
                    valueKey='habilidad'
                />
                <div className={`${widths[2]} flex`}>
                    <SecondarySubmit className='mx-2 w-1/2' buttonLabel='Guardar' isDirty={isDirty}/>
                    <TertiaryButton className='mx-2 w-1/2' buttonLabel='Cancelar' handleAction={() => handleCancel()} />
                </div>
            </form>
    );
};
export default NewHabilidadCurso;
