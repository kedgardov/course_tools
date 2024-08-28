'use client'

import NumberInput from "@/components/numberInput";
import SecondarySubmit from "@/components/secondarySubmit";
import TertiaryButton from "@/components/tertiaryButton";
import TextInput from "@/components/textInput";
import { CriterioDataScheme, CriterioDataType } from "@/models/criterio";
import WidthType from "@/models/width";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from 'react-hook-form';


const NewCriterio = ({
    className,
    selfDestruct,
    handleAddCriterio,
    widthList,
}:{
    className: string,
    selfDestruct: () => void,
    handleAddCriterio: (criterio: CriterioDataType) => void,
    widthList: [WidthType, WidthType, WidthType],
}) => {

    const { register, reset, handleSubmit, formState:{ errors, isDirty } } = useForm<CriterioDataType>({
        resolver: zodResolver(CriterioDataScheme),
    });

    const handleCancel = () => {
        reset();
        selfDestruct();
    };

    const onSubmit: SubmitHandler<CriterioDataType> = (data) => {
        console.log(data);
        handleAddCriterio(data);
        selfDestruct();
    };

    return (
           <form className={`${className}`} onSubmit={handleSubmit(onSubmit)}>
                <div className={widthList[0]}>
                    <TextInput
                        className='w-full'
                        idPrefix='criterio-evaluacion'
                        idRaw='0'
                        editMode={true}
                        register={register('criterio')}
                        placeholder='Ingrese el Criterio'
                        error={errors.criterio}
                    />
                </div>
                <div className={widthList[1]}>
                    <NumberInput
                        className='w-full'
                        idPrefix='valor-criterio-evaluacion'
                        idRaw='0'
                        editMode={true}
                        register={register('valor', { valueAsNumber:true })}
                        placeholder='Ingrese el Valor'
                        error={errors.valor}
                    />
                </div>
            <div className={`flex ${widthList[2]}`}>
                    <SecondarySubmit className='w-1/2 mx-1' isDirty={isDirty} buttonLabel='Guardar'/>
                    <TertiaryButton className='w-1/2 mx-1' handleAction={() => handleCancel()} buttonLabel='Cancelar'/>
                </div>
            </form>
    );
};

export default NewCriterio;
