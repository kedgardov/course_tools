'use client'
import { CriterioType, CriterioDataScheme, CriterioDataType } from '@models/criterio';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import TextInput from '@/components/textInput';
import WidthType from '@/models/width';
import NumberInput from '@/components/numberInput';
import SecondarySubmit from '@/components/secondarySubmit';
import TertiaryButton from '@/components/tertiaryButton';
import DeleteButton from '@/components/deleteButton';
import EditButton from '@/components/editButton';

const Criterio = ({
    className,
    criterio,
    handleDelete,
    widthList,
}:{
    className: string,
    criterio: CriterioType,
    handleDelete: (id: number) => void,
    widthList: [WidthType, WidthType, WidthType],
}) => {

    const { register, reset, handleSubmit, formState:{ errors, isDirty } } = useForm<CriterioDataType>({
        resolver: zodResolver(CriterioDataScheme),
        defaultValues: CriterioDataScheme.parse(criterio),
    });

    const [editMode, setEditMode] = useState<boolean>(false);

    const handleCancel = () => {
        reset();
        setEditMode(false);
    };

    const onSubmit: SubmitHandler<CriterioDataType> = (data) => {
        console.log(data);
        setEditMode(false);
        reset(data);
    };

    return (
           <form className={`${className}`} onSubmit={handleSubmit(onSubmit)}>
                <div className={widthList[0]}>
                    <TextInput
                        className='w-full'
                        idPrefix='criterio-evaluacion'
                        idRaw={`${criterio.id}`}
                        editMode={editMode}
                        register={register('criterio')}
                        placeholder='Ingrese el Criterio'
                        error={errors.criterio}
                        showBorder={false}
                    />
                </div>
                <div className={widthList[1]}>
                    <NumberInput
                        className='w-full'
                        idPrefix='valor-criterio-evaluacion'
                        idRaw={`${criterio.id}`}
                        editMode={editMode}
                        register={register('valor', { valueAsNumber:true })}
                        placeholder='Ingrese el Valor del Criterio'
                        error={errors.valor}
                        showBorder={false}
                    />
                </div>
            <div className={`flex ${widthList[2]}`}>
                {editMode ? (
                <>
                    <SecondarySubmit isDirty={isDirty} className='mx-1 w-1/2' buttonLabel='Guardar'/>
                    <TertiaryButton className='mx-1 w-1/2' handleAction={() => handleCancel()} buttonLabel='Cancelar'/>
                </>
                ) : (
                <>
                    <EditButton title='Editar Criterio de Evaluacion' className='mx-2' handleEdit={() => setEditMode(true)}/>
                    <DeleteButton title='Eliminar Criterio de Evaluacion' className='mx-2' handleDelete={() => handleDelete(criterio.id)}/>
                </>
                )}
                </div>
            </form>
    );

};

export default Criterio;
