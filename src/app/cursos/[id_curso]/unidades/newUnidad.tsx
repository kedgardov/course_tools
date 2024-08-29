'use client'

import { UnidadTituloType, UnidadTituloScheme } from '@models/unidad';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import WidthType from '@/models/width';
import TextInput from '@/components/textInput';
import SecondarySubmit from '@/components/secondarySubmit';
import TertiaryButton from '@/components/tertiaryButton';


const NewUnidad = ({
    className,
    nextNumber,
    idCurso,
    handleAddUnidad,
    selfDestruct,
    widthList,
}:{
    className: string,
    nextNumber: number,
    idCurso: number,
    handleAddUnidad: (unidadTitulo: UnidadTituloType) => void,
    selfDestruct: () => void,
    widthList: [WidthType, WidthType, WidthType],
}) => {

    const { register, handleSubmit, formState:{ errors, isDirty }, reset } = useForm<UnidadTituloType>({
        resolver: zodResolver(UnidadTituloScheme),
    });

    const onSubmit: SubmitHandler<UnidadTituloType> = (data) => {
        console.log(data);
        // Update the form's default values to the current values after saving
        handleAddUnidad(data);
        reset(data);
        selfDestruct()
    }

    const handleCancel = () => {
        reset(); // Reset the form to the most recent default values (which are updated after each save)
        selfDestruct(); // Switch back to read-only mode
    }

    return (

            <form onSubmit={handleSubmit(onSubmit)} className={`${className} flex`}>
                <div className={`text-4xl text-center ${widthList[0]}`}>{nextNumber}</div>
                <div className={widthList[1]}>
                <TextInput
                    className='w-full'
                    idPrefix='titulo-unidad'
                    idRaw='0'
                    editMode={true}
                    register={register('titulo')}
                    placeholder='Ingrese el Titulo de la Unidad'
                    error={errors.titulo}
                    showBorder={false}
                />
                </div>
                <div className='w-[30%] flex'>
                    <SecondarySubmit className='mx-1 w-1/2' isDirty={isDirty} buttonLabel='Guardar'/>
                    <TertiaryButton className='mx-1 w-1/2' handleAction={() => handleCancel()} buttonLabel='Cancelar'/>
                </div>
            </form>

    );
};

export default NewUnidad;
