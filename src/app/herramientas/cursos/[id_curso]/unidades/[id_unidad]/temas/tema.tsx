'use client'

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import WidthType from '@/models/width';
import TextInput from '@/components/textInput';
import SecondarySubmit from '@/components/secondarySubmit';
import TertiaryButton from '@/components/tertiaryButton';
import EditButton from '@/components/editButton';
import DeleteButton from '@/components/deleteButton';
import { TemaDataScheme, TemaDataType, TemaType } from '@/models/tema';
import { updateTema } from '@/utils/temas/updateTema';
import Alert from '@/components/alert';


const Tema = ({
    className,
    tema,
    idUnidad,
    handleDeleteTema,
    widthList,
    idCurso,
    token,
}:{
    className: string,
    tema: TemaType,
    idUnidad: number,
    handleDeleteTema: (id: number) => void,
    widthList: [WidthType, WidthType, WidthType],
    idCurso: number
    token: string,
}) => {

    const { register, handleSubmit, formState:{ errors, isDirty }, reset } = useForm<TemaDataType>({
        resolver: zodResolver(TemaDataScheme),
        defaultValues: TemaDataScheme.parse(tema),
    });

    const [editMode, setEditMode] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);

    const onSubmit: SubmitHandler<TemaDataType> = async (data) => {
        const updatedTema: TemaType = {
            ...tema,
            tema: data.tema,
        }
        const response = await updateTema(idCurso, updatedTema, token);
        if ( response.success ) {
            reset(data);
            setEditMode(false);
        } else {
            setError(response.message);
        }
    }

    const handleCancel = () => {
        reset(); // Reset the form to the most recent default values (which are updated after each save)
        setEditMode(false); // Switch back to read-only mode
    }

    return (

            <form onSubmit={handleSubmit(onSubmit)} className={`${className} flex`}>
                <div className={`text-xl text-center ${widthList[0]}`}>{tema.numero}</div>
                <div className={widthList[1]}>
                <TextInput
                    className='w-full'
                    idPrefix='titulo-tema'
                    idRaw={`${tema.id}`}
                    editMode={editMode}
                    register={register('tema')}
                    placeholder='Ingrese el Titulo del Tema'
                    error={errors.tema}
                    showBorder={false}
                />
                </div>
                <div className={`${widthList[2]} flex`}>
                    { editMode ? (
                    <>
                        <SecondarySubmit className='mx-1 w-1/2' isDirty={isDirty} buttonLabel='Guardar'/>
                        <TertiaryButton className='mx-1 w-1/2' handleAction={() => handleCancel()} buttonLabel='Cancelar'/>
                    </>
                    ) : (
                    <>
                        <EditButton title='Editar Titulo del Tema' className='mx-3' handleEdit={() => setEditMode(true)}/>
                        <DeleteButton title='Eliminar Tema de la Unidad' className='mx-3' handleDelete={() => handleDeleteTema(tema.id)}/>
                    </>
                    )}
                </div>
                <Alert error={error} setError={setError} />
            </form>

    );
};

export default Tema;
