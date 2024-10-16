'use client'

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import WidthType from '@/models/width';
import TextInput from '@/components/textInput';
import SecondarySubmit from '@/components/secondarySubmit';
import TertiaryButton from '@/components/tertiaryButton';
import { TemaDataScheme, TemaDataType } from '@/models/tema';


const NewTema = ({
    className,
    newNumber,
    idUnidad,
    handleAddTema,
    selfDestruct,
    widthList,
}:{
    className: string,
    newNumber: number,
    idUnidad: number,
    handleAddTema: (data: TemaDataType) => void,
    selfDestruct: () => void,
    widthList: [WidthType, WidthType, WidthType],
}) => {

    const { register, handleSubmit, formState:{ errors, isDirty }, reset } = useForm<TemaDataType>({
        resolver: zodResolver(TemaDataScheme),
    });

    const onSubmit: SubmitHandler<TemaDataType> = (data) => {
        handleAddTema(data);
        selfDestruct();

        // Update the form's default values to the current values after saving
    }

    const handleCancel = () => {
        reset(); // Reset the form to the most recent default values (which are updated after each save)
        selfDestruct();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`${className} flex`}>
            <div className={`text-4xl text-center ${widthList[0]}`}>{newNumber}</div>
            <div className={widthList[1]}>
                <TextInput
                    className='w-full'
                    idPrefix='titulo-tema'
                    idRaw='0'
                    editMode={true}
                    register={register('tema')}
                    placeholder='Ingrese el Titulo del Tema'
                    error={errors.tema}
                    showBorder={false}
                />
            </div>
            <div className={`${widthList[2]} flex`}>
                <SecondarySubmit className='mx-1 w-1/2' isDirty={isDirty} buttonLabel='Guardar'/>
                <TertiaryButton className='mx-1 w-1/2' handleAction={() => handleCancel()} buttonLabel='Cancelar'/>
            </div>
        </form>
    );
};

export default NewTema;
