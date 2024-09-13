'use client'

import TextArea from "@/components/textArea";
import { ObjetivoDataScheme, ObjetivoDataType, ObjetivoType } from "@/models/objetivo";
import WidthType from "@/models/width";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from 'react';
import SecondarySubmit from "@/components/secondarySubmit";
import TertiaryButton from "@/components/tertiaryButton";
import EditButton from "@/components/editButton";
import DeleteButton from "@/components/deleteButton";

const Objetivo = ({
    className,
    objetivo,
    widthList,
    handleDelete,
}:{
    objetivo: ObjetivoType,
    className: string,
    widthList: [WidthType, WidthType, WidthType],
    handleDelete: (id: number) => void,
}) => {

    const [editMode, setEditMode] = useState<boolean>(false);

    const { register, reset, handleSubmit, formState:{ errors, isDirty } } = useForm<ObjetivoDataType>({
        resolver: zodResolver(ObjetivoDataScheme),
        defaultValues: ObjetivoDataScheme.parse(objetivo),
    });

    const handleCancel = () => {
        reset();
        setEditMode(false);
    };

    const onSubmit: SubmitHandler<ObjetivoDataType> = (data) => {
        console.log(data);
        reset(data);
        setEditMode(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`${className} flex`}>
            <div className={`${widthList[0]} text-4xl flex items-center justify-center`}>{objetivo.numero}</div>
            <div className={`${widthList[1]}`}>
                <TextArea
                    className='w-full'
                    idPrefix={`objetivo-${objetivo.tipo}`}
                    idRaw={`${objetivo.id}`}
                    editMode={editMode}
                    register={register('objetivo')}
                    placeholder='Ingrese la descripcion del objetivo'
                    error={errors.objetivo}
                    showBorder={false}
                />
            </div>
            <div className={`${widthList[2]} flex items-center`}>
            {editMode? (
                <>
                    <SecondarySubmit className='w-1/2 mx-1' isDirty={isDirty} buttonLabel='Guardar'/>
                    <TertiaryButton className='w-1/2 mx-1' handleAction={() => handleCancel()} buttonLabel='Cancelar'/>
                </>
            ):(
                <>
                    <EditButton title='Editar Descripcion del Objetivo' className='mx-3' handleEdit={() => setEditMode(true)}/>
                    <DeleteButton title='Eliminar Objetivo' className='mx-3' handleDelete={() => handleDelete(objetivo.id)} />
                </>
            )}
            </div>
        </form>
    );
};

export default Objetivo;
