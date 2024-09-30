'use client'
import Alert from "@/components/alert";
import DeleteButton from "@/components/deleteButton";
import EditButton from "@/components/editButton";
import SecondarySubmit from "@/components/secondarySubmit";
import SelectInput from "@/components/selectInput";
import SelectInputFilter from "@/components/selectInputFilter";
import TertiaryButton from "@/components/tertiaryButton";
import { EncargadoDataScheme, EncargadoDataType, EncargadoType } from "@/models/encargado";
import { MaestroType } from "@/models/maestro";
import { RolType } from "@/models/rol";
import WidthType from "@/models/width";
import { updateEncargadoCurso } from "@/utils/encargados/updateEncargado";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Encargado = ({
    className,
    token,
    encargado,
    catalogoMaestros,
    catalogoRoles,
    widthList,
    handleDelete,
    startLoadingMode,
    stopLoadingMode,
}:{
    className: string,
    token: string,
    encargado: EncargadoType,
    catalogoMaestros: MaestroType[],
    catalogoRoles: RolType[],
    widthList: [WidthType, WidthType, WidthType, WidthType],
    handleDelete: (id: number) => void,
    startLoadingMode: () => void,
    stopLoadingMode: () => void,
}) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);

    const { register, reset, setValue, handleSubmit, formState: { errors, isDirty } } = useForm<EncargadoDataType>({
        resolver: zodResolver(EncargadoDataScheme),
        defaultValues: EncargadoDataScheme.parse(encargado),
    });

    const handleCancel = () => {
        reset();
        setEditMode(false);
    };

    const onSubmit: SubmitHandler<EncargadoDataType> = async (data) => {
        startLoadingMode();
        const updatedEncargado: EncargadoType = {
            id: encargado.id,
            id_curso: encargado.id_curso,
            id_maestro: data.id_maestro,
            id_rol: data.id_rol,
        };
        const response =  await updateEncargadoCurso(updatedEncargado, token);
        if ( response.success ){
            reset(data);
            setEditMode(false);
        } else {
            setError(response.message);
        }
        stopLoadingMode();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`${className} flex`}>
            <div className={widthList[0]}>
                <SelectInputFilter<MaestroType>
                    className='w-full'
                    idPrefix='id-maestro-encargado'
                    idRaw={`${encargado.id}`}
                    register={register('id_maestro', { valueAsNumber: true })}
                    editMode={editMode}
                    setValue={setValue}
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
                <Link href={`/herramientas/docentes/${encargado.id_maestro}`}>
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
            <Alert
                error={error}
                setError={setError}
            />
        </form>
    );
};
export default Encargado;
