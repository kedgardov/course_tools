'use client'
import { FuenteMiniDataScheme, FuenteMiniDataType } from "@/models/fuente";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from 'react-hook-form';
import { TipoFuenteType } from '@/models/tipoFuente';
import SecondarySubmit from '@components/secondarySubmit';
import TertiaryButton from "@/components/tertiaryButton";

import WidthType from '@models/width';
import TextInput from "@/components/textInput";
import SelectInput from "@/components/selectInput";

const NewFuente = ({
    className,
    catalogoTiposFuentes,
    handleAddFuente,
    selfDestruct,
    widthList,
}:{
    className: string,
    catalogoTiposFuentes: TipoFuenteType[],
    handleAddFuente: (data: FuenteMiniDataType) => void,
    selfDestruct: () => void,
    widthList: [WidthType, WidthType, WidthType],
}) => {

    const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<FuenteMiniDataType>({
        resolver: zodResolver(FuenteMiniDataScheme),
    });

    const handleCancel = () => {
        reset();
        selfDestruct();
    };

    const onSubmit: SubmitHandler<FuenteMiniDataType> = (data) => {
        handleAddFuente(data);
        reset(data);
        selfDestruct();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`flex ${className}`}>
            <div className={widthList[0]}>
                <TextInput
                    className='w-full'
                    idPrefix='titulo-fuente'
                    idRaw='0'
                    editMode={true}
                    register={register('titulo')}
                    placeholder='Ingrese el titulo de la fuente'
                    error={errors.titulo}
                />
            </div>
            <div className={widthList[1]}>
                <SelectInput<TipoFuenteType>
                    className='w-full'
                    idRaw='0'
                    idPrefix='tipo-fuente'
                    register={register('id_tipo', { valueAsNumber:true })}
                    editMode={true}
                    options={catalogoTiposFuentes}
                    error={errors.id_tipo}
                    placeholder='Seleccione el Tipo de Fuente'
                    idKey='id'
                    valueKey='tipo_fuente'
                />
            </div>
            <div className={`flex ${widthList[2]}`}>
                <SecondarySubmit isDirty={isDirty} className='w-1/2 mx-1' buttonLabel='Guardar'/>
                <TertiaryButton className='w-1/2 mx-1' handleAction={handleCancel} buttonLabel='Cancelar'/>
            </div>
            </form>
    );
};

export default NewFuente;
