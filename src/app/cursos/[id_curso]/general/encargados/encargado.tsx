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
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Encargado = ({
    className,
    token,
    idCurso,
    encargado,
    catalogoMaestros,
    catalogoRoles,
    widthList,
    handleDelete,
}:{
    className: string,
    token: string,
    idCurso: number,
    encargado: EncargadoType,
    catalogoMaestros: MaestroType[],
    catalogoRoles: RolType[],
    widthList: [WidthType, WidthType, WidthType, WidthType],
    handleDelete: (id: number) => void,
}) => {
    const [editMode, setEditMode] = useState<boolean>(false);

    const { register, reset, handleSubmit, formState: { errors, isDirty } } = useForm<EncargadoDataType>({
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
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`${className} flex`}>
            <div className={widthList[0]}>
                <SelectInput<MaestroType>
                    className='w-full'
                    idPrefix='id-maestro-encargado'
                    idRaw={`${encargado.id}`}
                    register={register('id_maestro', { valueAsNumber: true })}
                    editMode={editMode}
                    options={catalogoMaestros}
                    error={errors.id_maestro}
                    placeholder='Selecciona un docente'
                    idKey='id'
                    valueKey='label'
                    showBorder={false}
                />
            </div>
            <div className={widthList[1]}>
                <SelectInput<RolType>
                    className='w-full'
                    idPrefix='id-rol-encargado'
                    idRaw={`${encargado.id}`}
                    register={register('id_rol', { valueAsNumber: true })}
                    editMode={editMode}
                    options={catalogoRoles}
                    error={errors.id_rol}
                    placeholder='Selecciona un Rol'
                    idKey='id'
                    valueKey='rol'
                    showBorder={false}
                />
            </div>
            <div className={widthList[2]}>
                <Link href={`/maestros/${encargado.id_maestro}`}>
                    Ver Maestro
                </Link>
            </div>
            <div className={`${widthList[3]} flex`}>
            {editMode? (
            <>
                <SecondarySubmit className='mx-1 w-1/2' isDirty={isDirty} buttonLabel='Guardar'/>
                <TertiaryButton className='mx-1 w-1/2' handleAction={() => handleCancel()} buttonLabel='Cancelar' />
            </>
            ):(
            <>
                <EditButton title='Editar Encargado' className='mx-3' handleEdit={ () => setEditMode(true) }/>
                <DeleteButton title='Eliminar Encargado' className='mx-3' handleDelete={ () => handleDelete(encargado.id) } />
            </>
            )}
            </div>
        </form>
    );
};
export default Encargado;
