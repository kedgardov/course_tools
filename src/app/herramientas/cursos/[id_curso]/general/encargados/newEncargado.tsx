'use client';

import SecondarySubmit from "@/components/secondarySubmit";
import SelectInput from "@/components/selectInput";
import SelectInputFilter from "@/components/selectInputFilter";
import TertiaryButton from "@/components/tertiaryButton";
import { EncargadoDataScheme, EncargadoType } from "@/models/encargado";
import { MaestroType } from "@/models/maestro";
import { RolType } from "@/models/rol";
import WidthType from "@/models/width";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const NewEncargado = ({
    catalogoMaestros,
    catalogoRoles,
    className,
    widthList,
    handleAdd,
    selfDestruct,
}: {
    catalogoMaestros: MaestroType[],
    catalogoRoles: RolType[],
    className: string,
    widthList: WidthType[],
    handleAdd: (data: EncargadoType) => void,
    selfDestruct: () => void,
}) => {

    const { register, reset, setValue, handleSubmit, formState: { errors, isDirty } } = useForm<EncargadoType>({
        resolver: zodResolver(EncargadoDataScheme),
    });

    const handleCancel = () => {
        reset();
        selfDestruct();
    }

    const onSubmit: SubmitHandler<EncargadoType> = (data) => {
        handleAdd(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`${className} flex`}>
            <div className={widthList[0]}>
                <SelectInputFilter<MaestroType>
                    className='w-full'
                    idPrefix='id-maestro'
                    idRaw='0'
                    register={register('id_maestro', { valueAsNumber: true })}
                    editMode={true}
                    options={catalogoMaestros}
                    setValue={setValue}
                    error={errors.id_maestro}
                    placeholder='Selecciona un Maestro'
                    idKey='id'
                    valueKey='label'
                    showBorder={false}
                    />
            </div>

            <div className={widthList[1]}>
                <SelectInput<RolType>
                    className='w-full'
                    idPrefix='id-rol'
                    idRaw='0'
                    register={register('id_rol', { valueAsNumber: true })}
                    editMode={true}
                    options={catalogoRoles}
                    error={errors.id_rol}
                    placeholder='Selecciona un Rol'
                    idKey='id'
                    valueKey='rol'
                    showBorder={false}
                />
            </div>
            <div className={`${widthList[2]} flex`}>
                {/* Assuming this section is for any additional input or links */}
                {/* You can replace it with your required input or component */}
            </div>
            <div className={`${widthList[3]} flex`}>
                <SecondarySubmit className='mx-1 w-1/2' isDirty={isDirty} buttonLabel='Guardar' />
                <TertiaryButton className='mx-1 w-1/2' handleAction={() => handleCancel()} buttonLabel='Cancelar' />
            </div>
        </form>
    );
};

export default NewEncargado;
