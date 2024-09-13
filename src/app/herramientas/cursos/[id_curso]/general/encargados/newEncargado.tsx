'use client'

import SecondarySubmit from "@/components/secondarySubmit";
import SelectInput from "@/components/selectInput";
import TertiaryButton from "@/components/tertiaryButton";
import { EncargadoDataScheme, EncargadoDataType } from "@/models/encargado";
import { MaestroType } from "@/models/maestro";
import { RolType } from "@/models/rol";
import WidthType from "@/models/width";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const NewEncargado = ({
    className,
    catalogoMaestros,
    catalogoRoles,
    widthList,
    handleAdd,
    selfDestruct,
}:{
    className: string,
    catalogoMaestros: MaestroType[],
    catalogoRoles: RolType[],
    widthList: [WidthType, WidthType, WidthType],
    handleAdd: (data: EncargadoDataType) => void,
    selfDestruct: () => void,
}) => {

    const { register, reset, handleSubmit, formState:{ errors, isDirty } } = useForm<EncargadoDataType>({
        resolver: zodResolver(EncargadoDataScheme),
    });

    const handleCancel = () => {
        reset();
        selfDestruct();
    };

    const onSubmit: SubmitHandler<EncargadoDataType> = (data) => {
        handleAdd(data);
        selfDestruct();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`${className} flex`}>
            <div className={widthList[0]}>
                <SelectInput<MaestroType>
                    className=''
                    idPrefix='id-docente-encargado'
                    idRaw='0'
                    register={register('id_maestro', { valueAsNumber:true })}
                    editMode={true}
                    options={catalogoMaestros}
                    error={errors.id_maestro}
                    placeholder='Seleccione un Docente'
                    idKey='id'
                    valueKey='label'
                    showBorder={false}
                />
            </div>
            <div className={widthList[1]}>
                <SelectInput<RolType>
                    className=''
                    idPrefix='id-rol-encargado'
                    idRaw='0'
                    register={register('id_rol', { valueAsNumber:true })}
                    editMode={true}
                    options={catalogoRoles}
                    error={errors.id_rol}
                    placeholder='Seleccione un Rol'
                    idKey='id'
                    valueKey='rol'
                    showBorder={false}
                />
            </div>
            <div className={`${widthList[2]} flex`}>
                <SecondarySubmit className='w-1/2 mx-1' isDirty={isDirty} buttonLabel='Guardar'/>
                <TertiaryButton className='w-1/2 mx-1' handleAction={ () => handleCancel() } buttonLabel='Cancelar'/>
            </div>
        </form>
    );
};

export default NewEncargado;
