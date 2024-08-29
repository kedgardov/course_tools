'use client'

import DeleteButton from "@/components/deleteButton";
import EditButton from "@/components/editButton";
import SecondarySubmit from "@/components/secondarySubmit";
import SelectInput from "@/components/selectInput";
import TertiaryButton from "@/components/tertiaryButton";
import { EncargadoDataScheme, EncargadoDataType, EncargadoType } from "@/models/encargado";
import { MaestroType } from "@/models/maestro";
import { RolType } from "@/models/rol";
import WidthType from "@/models/width";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Encargado = ({
    className,
    encargado,
    catalogoMaestros,
    catalogoRoles,
    widthList,
    handleDelete,
}:{
    className: string,
    encargado: EncargadoType,
    catalogoMaestros: MaestroType[],
    catalogoRoles: RolType[],
    widthList: [WidthType, WidthType, WidthType],
    handleDelete: (id: number) => void,
}) => {

    const [editMode, setEditMode] = useState<boolean>(false);

    const { register, reset, handleSubmit, formState:{ errors, isDirty } } = useForm<EncargadoDataType>({
        resolver: zodResolver(EncargadoDataScheme),
        defaultValues: EncargadoDataScheme.parse(encargado),
    });

    const handleCancel = () => {
        reset();
        setEditMode(false);
    };

    const onSubmit: SubmitHandler<EncargadoDataType> = (data) => {
        reset(data);
        setEditMode(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`${className} flex`}>
            <div className={widthList[0]}>
                <SelectInput<MaestroType>
                    className=''
                    idPrefix='id-docente-encargado'
                    idRaw={`${encargado.id}`}
                    register={register('id_maestro', { valueAsNumber:true })}
                    editMode={editMode}
                    options={catalogoMaestros}
                    error={errors.id_maestro}
                    placeholder='Seleccione un Docente'
                    idKey='id'
                    valueKey='label'
                    showBorder={false}
                />
            </div>
            <div className={widthList[1]}>
                <SelectInput<RolType>
                    className=''
                    idPrefix='id-rol-encargado'
                    idRaw={`${encargado.id}`}
                    register={register('id_rol', { valueAsNumber:true })}
                    editMode={editMode}
                    options={catalogoRoles}
                    error={errors.id_rol}
                    placeholder='Seleccione un Rol'
                    idKey='id'
                    valueKey='rol'
                    showBorder={false}
                />
            </div>
            <div className={`${widthList[2]} flex`}>
            {editMode? (
            <>
                <SecondarySubmit className='w-1/2 mx-1' isDirty={isDirty} buttonLabel='Guardar'/>
                <TertiaryButton className='w-1/2 mx-1' handleAction={ () => handleCancel() } buttonLabel='Cancelar'/>
            </>
            ):(
            <>
                <EditButton title='Editar Rol o Docente Encargado' className='mx-3' handleEdit={ () => setEditMode(true) }/>
                <DeleteButton title='Eliminar Encargado' className='mx-3' handleDelete={ () => handleDelete(encargado.id) }/>
            </>
            )}
            </div>
        </form>
    );
};

export default Encargado;
