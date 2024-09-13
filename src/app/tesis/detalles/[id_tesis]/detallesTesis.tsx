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
import { ComiteDirectivoType } from "@/models/comite_directivo";
import { RolTesisType } from "@/models/rolTesis";
import { MaestroType } from "@/models/maestro";
import SelectInput from "@/components/selectInput";
import ListHeaders from "@/components/listHeaders";
import WidthType from "@/models/width";

// Function to trigger the download via the browser's native mechanism
export function downloadPdf(id_tesis: number, token: string) {
    // Construct the URL with the required parameters
    const url = `http://localhost/api/repositorio_tesis/tesis/download_pdf.php?id=${id_tesis}`;

    // Navigate to the URL to start the download
    window.location.href = url; // This will allow the browser to handle the download natively
}

const DetallesTesisComponent = ({
    className,
    token,
    idTesis,
    tesis,
    prediccionPronace,
    catalogoAutores,
    catalogoPronaces,
    catalogoCoordinaciones,
    catalogoGrados,
    comiteDirectivo,
    catalogoRolesTesis,
    catalogoMaestros,

}: {
    className: string,
    token: string,
    idTesis: number,
    tesis: TesisType,
    prediccionPronace: PronaceType | null,
    catalogoAutores: AutorType[],
    catalogoPronaces: PronaceType[],
    catalogoCoordinaciones: CoordinacionType[],
    catalogoGrados: GradoType[],
    comiteDirectivo: ComiteDirectivoType[],
    catalogoRolesTesis: RolTesisType[],
    catalogoMaestros: MaestroType[],
}) => {
    const widths: [WidthType, WidthType, WidthType] = ['w-[10%]', 'w-[50%]','w-[40%]'];

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const { register, handleSubmit, reset, formState: { isDirty, errors }, } = useForm<TesisDataType>({
        resolver: zodResolver(TesisDataScheme),
        defaultValues: TesisDataScheme.parse(tesis),
    });

    // Handler function for downloading the PDF
    const handleDownloadPdf = () => {
        downloadPdf(idTesis, token); // Call the download function with the necessary parameters
    };

    const handleCancel = () => {
        reset();
        setEditMode(false);
    };

    const onSubmit: SubmitHandler<TesisDataType> = async (data) => {
        setLoading(true);
        const response = await updateTesis(idTesis, data, token);
        if (!response.success) {
            console.log(response);
            setError(response.message);
        }
        setLoading(false);
        setEditMode(false);
        reset(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={className}>
                <div className='flex justify-center'>
                    <Link href={`/tesis/detalles/${idTesis - 1}`}><ArrowLeftIcon className='size-8' /></Link>
                    <Link href={`/tesis/detalles/${idTesis + 1}`}><ArrowRightIcon className='size-8' /></Link>
                </div>
                {loading && (
                    <p>Cargando....</p>
                )}
                {!editMode ? (
                    <EditButton title='Editar Tesis' className='' handleEdit={() => setEditMode(true)} />
                ) : (
                    <div className='flex'>
                        <SecondarySubmit className='mx-1' isDirty={isDirty} buttonLabel='Guardar' />
                        <TertiaryButton className='mx-1' handleAction={handleCancel} buttonLabel='Cancelar' />
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

                {tesis.checked ? (
                    <p>Checked</p>
                ) : (
                    <p>Not Checked</p>
                )}
                {prediccionPronace && (<p>{`prediccion: ${prediccionPronace.pronace}`}</p>)}

                <div className='flex'>
                    <SelectInputLabel
                        className='w-1/3 p-1'
                        idPrefix='id_pronace'
                        idRaw='0'
                        label='Pronace'
                        helpText=''
                        register={register('id_pronace', { valueAsNumber: true })}
                        editMode={editMode}
                        options={catalogoPronaces}
                        error={errors.id_pronace}
                        placeholder='Ingrese Pronace'
                        idKey='id'
                        valueKey='pronace'
                        showBorder={true}
                    />
                    <div className='flex flex-col w-fit p-1'>
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
                        register={register('id_autor', { valueAsNumber: true })}
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
                    register={register('id_coordinacion', { valueAsNumber: true })}
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
                    register={register('id_grado', { valueAsNumber: true })}
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
                    <Link href={`/tesis/detalles/${idTesis - 1}`}><ArrowLeftIcon className='size-8' /></Link>
                    <Link href={`/tesis/detalles/${idTesis + 1}`}><ArrowRightIcon className='size-8' /></Link>
                </div>
                <Alert error={error} setError={() => setError(null)} />
                <section>
                <h2 className='title-2'>Comite Directivo</h2>
                <ul>
                    <ListHeaders className='' headersList={['Rol', 'Directivo' , 'Acciones']} widthList={widths}/>
                    {comiteDirectivo.map((directivo) => (
                        <li className='flex p-2 divider-dark' key={directivo.id}>
                            <div className={widths[0]} >{catalogoRolesTesis.find((r) => r.id === directivo.id_rol_tesis)?.rol_tesis}</div>
                            <div className={widths[1]}>{catalogoMaestros.find((m) => m.id === directivo.id_maestro )?.label}</div>
                            <div className={widths[2]} ><Link className='text-blue-400 transition hover:text-blue-600' href={`/docentes/${directivo.id_maestro}`}> Ver Directivo </Link></div>
                        </li>
                    ))}
                </ul>
                </section>
            </form>
            <button type='button' className='border rounded p-2' onClick={handleDownloadPdf}>
                Descargar PDF
            </button>
        </>
    );
};

export default DetallesTesisComponent;
