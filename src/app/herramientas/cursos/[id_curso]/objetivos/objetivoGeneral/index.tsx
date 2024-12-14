'use client'

import ListHeaders from '@/components/listHeaders';
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
import { updateObjetivo } from "@/utils/objetivos/updateObjetivo";
import Alert from "@/components/alert";
import SectionHeaders from '@/components/SectionHeader';



const ObjetivoGeneral = ({
    objetivoGeneral,
    className,
    idCurso,
    token,
    canEdit,
}:{
    objetivoGeneral: ObjetivoType
    className: string,
    idCurso: number,
    token: string,
    canEdit: boolean,
}) => {
    const widths: WidthType[] = canEdit? ['w-[80%]','w-[20%]']:['w-[100%]'];
    const listHeaders: string[] = canEdit? ['Objetivo', 'Acciones']:['Objetivo'];

    const [editMode, setEditMode] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);

    const { register, reset, setValue, handleSubmit, formState:{ errors, isDirty } } = useForm<ObjetivoDataType>({
        resolver: zodResolver(ObjetivoDataScheme),
        defaultValues: ObjetivoDataScheme.parse(objetivoGeneral),
    });

    const handleCancel = () => {
        reset();
        setEditMode(false);
    };

    const onSubmit: SubmitHandler<ObjetivoDataType> = async (data) => {
        setIsLoading(true);
        const updatedObjetivo: ObjetivoType = {
            id: idCurso,
            id_curso: objetivoGeneral.id,
            tipo: objetivoGeneral.tipo,
            objetivo: data.objetivo,
        };
        const response = await updateObjetivo(updatedObjetivo, token);
        if( response.success ){
            reset(data);
            setEditMode(false);
        } else {
            setError(response.message);
        }
        setIsLoading(false);
    };




    const handleDelete = async (id: number) => {
        setIsLoading(true);
        const updatedObjetivo: ObjetivoType = {
            id: id,
            id_curso: objetivoGeneral.id_curso,
            tipo: objetivoGeneral.tipo,
            objetivo: null,
        };
        const response = await updateObjetivo(updatedObjetivo, token);
        if ( response.success ){
            setValue('objetivo', null);
            setEditMode(false);
        } else {
            setError(response.message);
        }
        setIsLoading(false);
    };

    return (
        <section className={`${className}`}>
            <SectionHeaders
                className=''
                sectionHeader='Objetivo General del Curso'
                helpText='De clic aqui para habilitar la edicion del objetivo general del curso'
                editMode={editMode}
                startEditMode={() => setEditMode(true)}
                isLoading={isLoading}
                canEdit={canEdit}
            />
            <ul>
                <ListHeaders
                    className='divider-dark'
                    headersList={listHeaders}
                    widthList={widths}
                />
                <li>

                <form onSubmit={handleSubmit(onSubmit)} className={`${className} flex`}>

            <div className={`${widths[0]} h-40`}>
                <TextArea
                    className='w-full'
                    idPrefix={`objetivo-${objetivoGeneral.tipo}`}
                    idRaw={`${objetivoGeneral.id}`}
                    editMode={editMode}
                    register={register('objetivo')}
                    placeholder='Ingrese la descripcion del objetivo'
                    error={errors.objetivo}
                    showBorder={false}
                />
            </div>

            {canEdit && (
            <div className={`${widths[1]} flex items-center`}>
            {editMode? (
                <>
                    <SecondarySubmit className='w-1/2 mx-1' isDirty={isDirty} buttonLabel='Guardar'/>
                    <TertiaryButton className='w-1/2 mx-1' handleAction={() => handleCancel()} buttonLabel='Cancelar'/>
                </>
            ):(
                <>
                    <EditButton title='Editar Descripcion del Objetivo' className='mx-3' handleEdit={() => setEditMode(true)}/>
                    <DeleteButton title='Eliminar Objetivo' className='mx-3' handleDelete={() => handleDelete(objetivoGeneral.id)} />
                </>
            )}
            </div>
            )}

            <Alert error={error} setError={setError}/>
        </form>

            </li>
            </ul>
        </section>
    );
};

export default ObjetivoGeneral;
