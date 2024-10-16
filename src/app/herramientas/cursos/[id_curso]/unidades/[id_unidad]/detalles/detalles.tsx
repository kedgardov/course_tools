'use client'
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { UnidadDetallesScheme, UnidadDetallesType, UnidadType } from '@models/unidad';
import { ActividadType } from '@models/actividad';
import { HabilidadCursoType, HabilidadType } from '@models/habilidad';

import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { ArrowTurnLeftUpIcon } from '@heroicons/react/24/outline';
import { VerboHabilidadType } from '@/models/verboHabilidad';
import SelectInputLabel from '@/components/selectInputLabel';
import EditButton from '@/components/editButton';
import TextArea from '@/components/textArea';
import SecondarySubmit from '@/components/secondarySubmit';
import TertiaryButton from '@/components/tertiaryButton';
import SelectInput from '@/components/selectInput';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { updateUnidad } from '@/utils/unidades/updateUnidad';
import Alert from '@/components/alert';
import SectionHeaders from '@/components/SectionHeader';




const DetallesUnidadClient = ({
    token,
    unidad,
    catalogoHabilidades,
    catalogoVerbos,
    catalogoActividades,
    habilidadesCurso,
    idCurso,
}: {
    token: string,
    unidad: UnidadType,
    catalogoHabilidades: HabilidadType[],
    catalogoVerbos: VerboHabilidadType[],
    catalogoActividades: ActividadType[],
    habilidadesCurso: HabilidadCursoType[],
    idCurso: number,
}) => {

    const [ editMode, setEditMode ] = useState<boolean>(false);

    const { register, watch, reset, setValue, handleSubmit, formState: { errors, isDirty } } = useForm<UnidadDetallesType>({
        resolver: zodResolver(UnidadDetallesScheme),
        defaultValues: UnidadDetallesScheme.parse(unidad),
    });

    const [ error, setError ] = useState<string | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const idHabilidadCurso = Number(watch('id_habilidad'));
    const idVerbo = Number(watch('id_verbo'));
    const idActividadPresencial = Number(watch('id_actividad_presencial'));
    const idActividadTarea = Number(watch('id_actividad_tarea'));

    const [validVerbos, setValidVerbos] = useState<VerboHabilidadType[]>([]);
    const [validActividades, setValidActividades] = useState<ActividadType[]>([]);



    useEffect(() => {
        const idHabilidad = habilidadesCurso.find((hc) => hc.id === idHabilidadCurso)?.id_habilidad || 0;
        if( true ){
            //setCurrentIdHabilidad(idHabilidad);

            const newValidVerbos = catalogoVerbos.filter((v) => v.id_habilidad === idHabilidad);
            setValidVerbos(newValidVerbos);

            const newValidActividades = catalogoActividades.filter((a) => a.id_habilidad === idHabilidad);
            setValidActividades(newValidActividades);
        }
    },[idHabilidadCurso, setValidVerbos, catalogoVerbos, habilidadesCurso, setValidActividades, catalogoActividades]);


    useEffect(() => {
        const newObjetivo = catalogoVerbos.find((v) => v.id === idVerbo)?.verbo || '';
        if ( newObjetivo && newObjetivo !== '' ){
            setValue('objetivo', newObjetivo+' ');
        }
    },[idVerbo, setValue, catalogoVerbos]);

    useEffect(() => {
        const newDescripcionPresencial = catalogoActividades.find((a) => a.id === idActividadPresencial)?.descripcion || '';
        if ( newDescripcionPresencial && newDescripcionPresencial !== '' ){
            setValue('descripcion_actividad_presencial', newDescripcionPresencial);
        }
    },[setValue, catalogoActividades, idActividadPresencial]);

    useEffect(() => {
        const newDescripcionTarea = catalogoActividades.find((a) => a.id === idActividadTarea)?.descripcion || '';
        if ( newDescripcionTarea && newDescripcionTarea !== '' ){
            setValue('descripcion_actividad_tarea', newDescripcionTarea);
        }
    },[setValue, catalogoActividades, idActividadTarea]);

    const handleCancel = () => {
        reset();
        setEditMode(false);
    };

    const onSubmit: SubmitHandler<UnidadDetallesType> = async (data) => {
        //check for ids correspondate habilidad->verbo habilidad->actividad on submit
        setIsLoading(true);
        const updatedUnidad: UnidadType = {
            ...unidad,
            id_habilidad: data.id_habilidad,
            id_verbo: data.id_verbo,
            objetivo: data.objetivo,
            id_actividad_presencial: data.id_actividad_presencial,
            id_actividad_tarea: data.id_actividad_tarea,
            descripcion_actividad_presencial: data.descripcion_actividad_presencial,
            descripcion_actividad_tarea: data.descripcion_actividad_tarea,
            evidencia_presencial: data.evidencia_presencial,
            evidencia_tarea: data.evidencia_tarea,
        };
        const response = await updateUnidad( updatedUnidad, token );
        if ( response.success ){
            reset(data);
            setEditMode(false);
        } else {
            setError(response.message);
        }
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <legend>
                <SectionHeaders
                    className=''
                    sectionHeader={`Detalles de la Unidad: ${unidad.unidad}`}
                    editMode={editMode}
                    helpText='De clic para entrar al modo edicion de detalles de esta unidad'
                    startEditMode={() => setEditMode(true)}
                    isLoading={isLoading}
                />
            </legend>

                {habilidadesCurso.length === 0 && (<p className='italic text-tertiary' >Este curso aun no cuenta con habilidades a desarrollar, puede agregarlas en la pestana de Perfil de Egreso</p>)}
                <div className="my-2 p-4">
                <h2 className="title-3">Criterios de Apoyo</h2>
                <div className="flex">
            <div className="w-[60%] py-2">
                       <SelectInputLabel
                            className=''
                            idPrefix='id-habilidad-unidad'
                            idRaw={`${unidad.id}`}
                            label='Habilidad a Desarrollar en la Unidad'
                            helpText=''
                            register={register('id_habilidad', { valueAsNumber: true })}
                            editMode={editMode}
                            options={habilidadesCurso.map((h) => ({...h, habilidad: catalogoHabilidades.find((hc) => hc.id === h.id_habilidad)?.habilidad || ''}))}
                            error={errors.id_habilidad}
                            placeholder='Seleccione una Habilidad'
                            idKey='id'
                            valueKey='habilidad'
                            showBorder={true}
                        />
                    </div>
                    <div className="w-[40%] p-2">
                        <SelectInputLabel
                            className=''
                            idPrefix='id-verbo-unidad'
                            idRaw={`${unidad.id}`}
                            label='Verbo de Apoyo'
                            helpText=''
                            register={register('id_verbo',{ valueAsNumber: true })}
                            editMode={editMode}
                            options={validVerbos}
                            error={errors.id_verbo}
                            placeholder='Seleccione el verbo de apoyo'
                            idKey='id'
                            valueKey='verbo'
                            showBorder={true}
                        />
                    </div>
                </div>
            </div>

            <div className="my-2 p-4 ">
                <h2 className="title-3">Objetivo de la unidad</h2>
                <div className='h-40'>
                <TextArea
                    idPrefix='objetivo-unidad'
                    idRaw={`${unidad.id}`}
                    editMode={editMode}
                    register={register('objetivo')}
                    placeholder="Describe el objetivo de esta unidad..."
                    className=" w-full h-fit"
                    error={errors.objetivo}
                    showBorder={true}
                />
            </div>
            </div>
            <div className="my-2 p-4">
                <p className="title-3">Actividades de la Unidad</p>
                <div className="flex">


                    <div className='w-1/2 m-2 p-2 flex flex-col space-y-2'>
                        <h3 className='text-xl pb-2'>Actividad Presencial</h3>
                        <SelectInput <ActividadType>
                            className=''
                            idRaw={`${unidad.id}`}
                            idPrefix='actividad-presencial'
                            register={register('id_actividad_presencial', { valueAsNumber:true })}
                            editMode={editMode}
                            options={validActividades}
                            error={errors.id_actividad_presencial}
                            placeholder='Seleccione una actividad presencial'
                            idKey='id'
                            valueKey='actividad'
                            showBorder={true}
                        />
                        <div className='h-32 w-full'>
                        <TextArea
                            idPrefix='descripcion-actividad-presencial'
                            idRaw={`${unidad.id}`}
                            editMode={editMode}
                            register={register('descripcion_actividad_presencial')}
                            placeholder='Describa la actividad presencial de la unidad'
                            className='w-full h-full'
                            error={errors.descripcion_actividad_presencial}
                            showBorder={true}
                        />
                        </div>
                        <div className='h-24 w-full'>
                        <TextArea
                            idPrefix='evidencia-actividad-presencial'
                            idRaw={`${unidad.id}`}
                            editMode={editMode}
                            register={register('evidencia_presencial')}
                            placeholder='Describa la evidencia de la actividad presencial de esta unidad'
                            className='h-full w-full'
                            error={errors.evidencia_presencial}
                            showBorder={true}
                        />
                        </div>
                    </div>

                    <div className='w-1/2 m-2 p-2 flex flex-col space-y-2'>
                        <h3 className='text-xl pb-2'>Actividad de Tarea</h3>
                        <SelectInput <ActividadType>
                            className=''
                            idRaw={`${unidad.id}`}
                            idPrefix='actividad-tarea'
                            register={register('id_actividad_tarea', { valueAsNumber:true })}
                            editMode={editMode}
                            options={validActividades}
                            error={errors.id_actividad_tarea}
                            placeholder='Seleccione una actividad de Tarea'
                            idKey='id'
                            valueKey='actividad'
                            showBorder={true}
                        />
                        <div className='h-32 w-full'>
                        <TextArea
                            idPrefix='descripcion-actividad-tarea'
                            idRaw={`${unidad.id}`}
                            editMode={editMode}
                            register={register('descripcion_actividad_tarea')}
                            placeholder='Describa la actividad de tarea de la unidad'
                            className='w-full h-full'
                            error={errors.descripcion_actividad_tarea}
                            showBorder={true}
                        />
                        </div>
                        <div className='h-24 w-full'>
                        <TextArea
                            idPrefix='evidencia-actividad-tarea'
                            idRaw={`${unidad.id}`}
                            editMode={editMode}
                            register={register('evidencia_tarea')}
                            placeholder='Describa la evidencia de la actividad de tarea de esta unidad'
                            className='h-full w-full'
                            error={errors.evidencia_tarea}
                            showBorder={true}
                        />
                        </div>
                    </div>


            </div>
            </div>
            {editMode && (
                <div className='flex space-x-2 ml-auto mr-4'>
                    <SecondarySubmit className='' buttonLabel='Guardar' isDirty={isDirty}/>
                    <TertiaryButton className='' buttonLabel='Cancelar' handleAction={() => handleCancel()} />
                </div>
            )}


          <Alert error={error} setError={setError} />

        </form>
    );
};

export default DetallesUnidadClient;
