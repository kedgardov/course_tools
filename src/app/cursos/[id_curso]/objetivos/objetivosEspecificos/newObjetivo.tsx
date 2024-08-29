'use client'

import TextArea from "@/components/textArea";
import { ObjetivoDataScheme, ObjetivoDataType } from "@/models/objetivo";
import WidthType from "@/models/width";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import SecondarySubmit from "@/components/secondarySubmit";
import TertiaryButton from "@/components/tertiaryButton";

const NewObjetivo = ({
    className,
    newNumber,
    widthList,
    handleAdd,
    selfDestruct,
}:{
    newNumber: number,
    className: string,
    widthList: [WidthType, WidthType, WidthType],
    handleAdd: (data: ObjetivoDataType) => void,
    selfDestruct: () => void,
}) => {

    const { register, reset, handleSubmit, formState:{ errors, isDirty } } = useForm<ObjetivoDataType>({
        resolver: zodResolver(ObjetivoDataScheme),
    });

    const handleCancel = () => {
        reset();
        selfDestruct();
    };

    const onSubmit: SubmitHandler<ObjetivoDataType> = (data) => {
        console.log(data);
        reset(data);
        handleAdd(data);
        selfDestruct();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`${className} flex`}>
            <div className={`${widthList[0]} text-4xl flex items-center justify-center`}>{newNumber}</div>
            <div className={`${widthList[1]}`}>
                <TextArea
                    className='w-full'
                    idPrefix='objetivo-especifico'
                    idRaw='0'
                    editMode={true}
                    register={register('objetivo')}
                    placeholder='Ingrese la Descripcion del Objetivo'
                    error={errors.objetivo}
                    showBorder={false}
                />
            </div>
            <div className={`${widthList[2]} flex items-center`}>
                <SecondarySubmit className='w-1/2 mx-1' isDirty={isDirty} buttonLabel='Guardar'/>
                <TertiaryButton className='w-1/2 mx-1' handleAction={() => handleCancel()} buttonLabel='Cancelar'/>
            </div>
        </form>
    );
};

export default NewObjetivo;
