'use client'

import Alert from "@/components/alert";
import DeleteButton from "@/components/deleteButton";
import EditButton from "@/components/editButton";
import SecondarySubmit from "@/components/secondarySubmit";
import SelectInput from "@/components/selectInput";
import TertiaryButton from "@/components/tertiaryButton";
import { CoordinacionCatalogoType, CoordinacionCursoDataScheme, CoordinacionCursoDataType, CoordinacionCursoType } from "@/models/coordinacion";
import WidthType from "@/models/width";
import { updateCoordinacionCurso } from "@/utils/cursos/updateCoordinacionCurso";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Coordinacion = ({
    className,
    token,
    coordinacion,
    catalogoCoordinaciones,
    widthList,
    handleDelete,
    startLoadingMode,
    stopLoadingMode,
}:{
    className: string,
    token: string,
    coordinacion: CoordinacionCursoType,
    catalogoCoordinaciones: CoordinacionCatalogoType[],
    widthList: [WidthType, WidthType],
    handleDelete: (id: number) => void,
    startLoadingMode: () => void,
    stopLoadingMode: () => void,
}) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);

    const { register, reset, handleSubmit, formState: { errors, isDirty } } = useForm<CoordinacionCursoDataType>({
        resolver: zodResolver(CoordinacionCursoDataScheme),
        defaultValues: CoordinacionCursoDataScheme.parse(coordinacion),
    });

    const handleCancel = () => {
        reset();
        setEditMode(false);
    }

    const onSubmit: SubmitHandler<CoordinacionCursoDataType> = async (data) => {
        startLoadingMode();
        const updatedCoordinacion: CoordinacionCursoType = {
            id: coordinacion.id,
            id_curso: coordinacion.id_curso,
            id_coordinacion: data.id_coordinacion,
        };
        const response = await updateCoordinacionCurso(updatedCoordinacion, token);
        if( response.success ){
            reset(data);
            setEditMode(false);
        } else {
            setError(response.message);
        }
        stopLoadingMode();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`${className} flex`}>
            <div className={widthList[0]}>
                <SelectInput<CoordinacionCatalogoType>
                    className='w-full'
                    idPrefix='id-coordinacion-curso'
                    idRaw={`${coordinacion.id}`}
                    register={register('id_coordinacion', { valueAsNumber:true })}
                    editMode={editMode}
                    options={catalogoCoordinaciones}
                    error={ errors.id_coordinacion }
                    placeholder='Selecciona una Coordinacion'
                    idKey='id'
                    valueKey='coordinacion'
                    showBorder={false}
                />
            </div>
            <div className={`${widthList[1]} flex`}>
            {editMode? (
            <>
                <SecondarySubmit className='mx-1 w-1/2' isDirty={isDirty} buttonLabel='Guardar'/>
                <TertiaryButton className='mx-1 w-1/2' handleAction={() => handleCancel()} buttonLabel='Cancelar'/>
            </>
            ):(
            <>
                <EditButton title='Editar Coordinacion' className='mx-3' handleEdit={ () => setEditMode(true) }/>
                <DeleteButton title='Eliminar Coordinacion' className='mx-3' handleDelete={() => handleDelete(coordinacion.id)} />
            </>
            )}
            </div>
            <Alert
                error={error}
                setError={setError}
            />
        </form>
    );
};

export default Coordinacion;
