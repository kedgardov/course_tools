'use client';
import { AutorType } from "@/models/autor";
import { CoordinacionType } from "@/utils/repo_tesis/coordinaciones/getCatalogoCoordinaciones";
import { GradoType } from "@/models/grado";
import { PronaceType } from "@/models/pronace";
import { TesisDataScheme, TesisDataType, TesisType } from "@/models/tesis";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateTesis } from "@/utils/repo_tesis/tesis/updateTesis";
import Alert from "@/components/alert";
import { useState } from "react";
import SecondarySubmit from "@/components/secondarySubmit";
import TertiaryButton from "@/components/tertiaryButton";
import EditButton from "@/components/editButton";
import TextAreaLabel from "@/components/textAreaLabel";
import SelectInputLabel from "@/components/selectInputLabel";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const DetallesTesisComponent = ({
    className,
    token,
    idTesis,
    tesis,
    catalogoAutores,
    catalogoPronaces,
    catalogoCoordinaciones,
    catalogoGrados,
}:{
    className: string,
    token: string,
    idTesis: number,
    tesis: TesisType,
    catalogoAutores: AutorType[],
    catalogoPronaces: PronaceType[],
    catalogoCoordinaciones: CoordinacionType[],
    catalogoGrados: GradoType[],
}) => {
    const [ error, setError ] = useState<string | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ editMode, setEditMode ] = useState<boolean>(false);
    const { register, handleSubmit, reset, formState:{ isDirty, errors, },  } = useForm<TesisDataType>({
        resolver: zodResolver(TesisDataScheme),
        defaultValues: TesisDataScheme.parse(tesis),
    });

    const handleCancel = () => {
        reset();
        setEditMode(false);
    };

    const onSubmit: SubmitHandler<TesisDataType> = async (data) => {
        setLoading(true);
        const response = await updateTesis(idTesis, data, token);
        if(!response.success){
            console.log(response);
            setError(response.message);
        }
        setLoading(false);
        setEditMode(false);
        reset(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={className}>
            <div className='flex justify-center'>
                <Link href={`/tesis/detalles/${idTesis-1}`} ><ArrowLeftIcon className='size-8' /></Link>
                <Link href={`/tesis/detalles/${idTesis+1}`} ><ArrowRightIcon className='size-8'/></Link>
            </div>
            {loading && (
                <p>Cargando....</p>
            )}
            {!editMode? (
                <EditButton title='Editar Tesis' className='' handleEdit={()=>setEditMode(true)} />
            ):(
                <div className='flex'>
                    <SecondarySubmit className='mx-1' isDirty={isDirty} buttonLabel='Guardar'/>
                    <TertiaryButton className='mx-1' handleAction={handleCancel} buttonLabel='Cancelar'/>
                </div>
            )}
            <TextAreaLabel
                className='h-[8rem]'
                idPrefix='titulo'
                idRaw='0'
                label='Titulo'
                helpText='Titulo de la tesis'
                editMode={editMode}
                register={register('titulo')}
                placeholder='Ingrese el titulo de la tesis'
                error={errors.titulo}
                showBorder={true}
            />
            <div className='flex'>
                <SelectInputLabel
                    className='w-1/3 p-1'
                    idPrefix='id_pronace'
                    idRaw='0'
                    label='Pronace'
                    helpText=''
                    register={register('id_pronace',{ valueAsNumber:true })}
                    editMode={editMode}
                    options={catalogoPronaces}
                    error={errors.id_pronace}
                    placeholder='Ingrese Pronace'
                    idKey='id'
                    valueKey='pronace'
                    showBorder={true}
                />
           
                <div className=' flex flex-col w-fit p-1'>
                    <label htmlFor='fecha'>Fecha Publicacion</label>
                    <input id='fecha' className='input border' type='date' {...register('fecha')} disabled={!editMode} />
                    {errors.fecha && <p className='error-text'>{errors.fecha.message}</p>}
                </div>

                <SelectInputLabel
                    className='flex-grow p-1'
                    idPrefix='id_autor'
                    idRaw='0'
                    label='Autor'
                    helpText=''
                    register={register('id_autor',{ valueAsNumber:true })}
                    editMode={editMode}
                    options={catalogoAutores}
                    error={errors.id_autor}
                    placeholder='Ingrese Autor'
                    idKey='id'
                    valueKey='autor'
                    showBorder={true}
                />

            </div>

            <TextAreaLabel
                className='h-[25rem]'
                idPrefix='resumen'
                idRaw='0'
                label='Resumen'
                helpText='Resumen de la tesis'
                editMode={editMode}
                register={register('resumen')}
                placeholder='Ingrese el resumen de la tesis'
                error={errors.resumen}
                showBorder={true}
            />

            <SelectInputLabel
                    className='flex-grow p-1'
                    idPrefix='id_coordinacion'
                    idRaw='0'
                    label='Coordinacion'
                    helpText=''
                    register={register('id_coordinacion',{ valueAsNumber:true })}
                    editMode={editMode}
                    options={catalogoCoordinaciones}
                    error={errors.id_coordinacion}
                    placeholder='Ingrese Coordinacion'
                    idKey='id'
                    valueKey='coordinacion'
                    showBorder={true}
                />

            <SelectInputLabel
                    className='flex-grow p-1'
                    idPrefix='id_grado'
                    idRaw='0'
                    label='Grado Obtenido'
                    helpText=''
                    register={register('id_grado',{ valueAsNumber:true })}
                    editMode={editMode}
                    options={catalogoGrados}
                    error={errors.id_grado}
                    placeholder='Ingrese un Grado'
                    idKey='id'
                    valueKey='grado'
                    showBorder={true}
            />

            <TextAreaLabel
                className='h-[10rem]'
                idPrefix='palabras_clave'
                idRaw='0'
                label='Palabras Clave'
                helpText='Palabras Clave de la tesis'
                editMode={editMode}
                register={register('palabras_clave')}
                placeholder='Ingrese el palabras clave de la tesis'
                error={errors.palabras_clave}
                showBorder={true}
            />

            <div className='flex justify-center'>
                <Link href={`/tesis/detalles/${idTesis-1}`} ><ArrowLeftIcon className='size-8' /></Link>
                <Link href={`/tesis/detalles/${idTesis+1}`} ><ArrowRightIcon className='size-8'/></Link>
            </div>
           <Alert error={error} setError={() => setError(null)}/>
        </form>
    );
};
export default DetallesTesisComponent;
