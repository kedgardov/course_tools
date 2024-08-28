'use client'

import SecondarySubmit from "@/components/secondarySubmit";
import SelectInput from "@/components/selectInput";
import TertiaryButton from "@/components/tertiaryButton";
import { CoordinacionCatalogoType, CoordinacionCursoDataScheme, CoordinacionCursoDataType } from "@/models/coordinacion";
import WidthType from "@/models/width";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const NewCoordinacion = ({
    catalogoCoordinaciones,
    className,
    idCurso,
    widthList,
    handleAdd,
    selfDestruct,
}:{
    catalogoCoordinaciones: CoordinacionCatalogoType[],
    className: string,
    idCurso: number,
    widthList: [WidthType, WidthType],
    handleAdd: (data: CoordinacionCursoDataType) => void,
    selfDestruct: () => void,
}) => {


    const { register, reset, handleSubmit, formState: { errors, isDirty } } = useForm<CoordinacionCursoDataType>({
        resolver: zodResolver(CoordinacionCursoDataScheme),
    });

    const handleCancel = () => {
        reset();
        selfDestruct();
    }

    const onSubmit: SubmitHandler<CoordinacionCursoDataType> = (data) => {
        handleAdd(data);
        selfDestruct();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`${className} flex`}>
            <div className={widthList[0]}>
                <SelectInput<CoordinacionCatalogoType>
                    className='w-full'
                    idPrefix='id-coordinacion-curso'
                    idRaw='0'
                    register={register('id_coordinacion', { valueAsNumber:true })}
                    editMode={true}
                    options={catalogoCoordinaciones}
                    error={ errors.id_coordinacion }
                    placeholder='Selecciona una Coordinacion'
                    idKey='id'
                    valueKey='coordinacion'
                />
            </div>
            <div className={`${widthList[1]} flex`}>
                <SecondarySubmit className='mx-1 w-1/2' isDirty={isDirty} buttonLabel='Guardar'/>
                <TertiaryButton className='mx-1 w-1/2' handleAction={() => handleCancel()} buttonLabel='Cancelar'/>
            </div>
        </form>
    );
};

export default NewCoordinacion;
