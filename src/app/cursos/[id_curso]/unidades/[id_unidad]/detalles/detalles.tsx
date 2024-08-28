'use client'
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { UnidadDetallesScheme, UnidadDetallesType, UnidadType } from '@models/unidad';
import { ActividadType } from '@models/actividad';
import { HabilidadType } from '@models/habilidad';
import { CategoriaHabilidadType } from '@models/categoriaHabilidad';
import { TipoHabilidadType } from '@models/tipoHabilidad';

import { useForm } from 'react-hook-form';
import ActividadForm from './actividadForm';
import Link from 'next/link';
import { ArrowTurnLeftUpIcon } from '@heroicons/react/24/outline';




const DetallesUnidadClient = ({
    unidad,
    idUnidad,
    idCurso,
    catalogoTiposHabilidad,
    catalogoHabilidades,
    catalogoCategoriasHabilidad,
    catalogoActividades,
}: {
    unidad: UnidadType,
    idUnidad: number,
    idCurso: number,
    catalogoTiposHabilidad: TipoHabilidadType[],
    catalogoHabilidades: HabilidadType[],
    catalogoCategoriasHabilidad: CategoriaHabilidadType[],
    catalogoActividades: ActividadType[],
}) => {

    const { register, watch, setValue, handleSubmit, formState: { errors, isDirty } } = useForm<UnidadDetallesType>({
        resolver: zodResolver(UnidadDetallesScheme),
        defaultValues: UnidadDetallesScheme.parse(unidad),
    });



    const idTipoHabilidad = Number(watch('id_tipo_habilidad'));
    const idHabilidad = Number(watch('id_habilidad'));

    const [validHabilidades, setValidHabilidades] = useState<HabilidadType[]>([]);
    const [validCategorias, setValidCategorias] = useState<CategoriaHabilidadType[]>([]);
    const [validActividades, setValidActividades] = useState<ActividadType[]>([]);

    useEffect(()=>{
      if(idTipoHabilidad){
        const newValidHabilidades = catalogoHabilidades.filter((habilidad) => habilidad.id_tipo_habilidad === idTipoHabilidad);
        setValidHabilidades(newValidHabilidades);
      } else {
        setValidHabilidades([]);
      }
    },[idTipoHabilidad, catalogoHabilidades]);

    useEffect(()=>{
      if(idHabilidad){
        const newValidCategorias = catalogoCategoriasHabilidad.filter((categoria) => categoria.id_habilidad === idHabilidad);
        setValidCategorias(newValidCategorias);
      } else {
        setValidCategorias([]);
      }
    },[idHabilidad, catalogoCategoriasHabilidad]);

    useEffect(()=>{
      if(idHabilidad){
        const newValidActividades = catalogoActividades.filter((actividad) => actividad.id_habilidad === idHabilidad);
        setValidActividades(newValidActividades);
      } else {
        setValidActividades([]);
      }
    },[idHabilidad, catalogoActividades]);


    return (
        <form>
            <legend className='flex'>
                <Link className='button-3 w-fit flex' href={`/cursos/${idCurso}/unidades`} >
                    <ArrowTurnLeftUpIcon className='size-6'/>
                    Regresar
                </Link>
                <h2 className='title-2'>{unidad.titulo}</h2>
            </legend>
            <div className="bg-white my-2 p-4 border-solid border-2 rounded-lg">
                <h2 className="title-2">Objetivo</h2>
                <textarea
                    id='objetivo-unidad'
                    {...register('objetivo')}
                    aria-label='Objetivo de la unidad'
                    placeholder="Describe el objetivo de esta unidad..."
                    className="w-full h-32 p-2 border rounded"
                />
            </div>
            <div className="bg-white my-2 p-4 border-solid border-2 rounded-lg">
                <h2 className="title-2">Habilidad a desarrollar</h2>
                <div className="flex">
                    <div className="w-1/3 p-2">
                        <label htmlFor='area-de-competencia' >Area de Competencia</label>
                        <select
                            id='area-de-competencia'
                            {...register('id_tipo_habilidad')}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Seleccione un área</option>
                            {catalogoTiposHabilidad.map((tipoHabilidad)=>(
                              <option key={tipoHabilidad.id} value={tipoHabilidad.id}>{tipoHabilidad.tipo}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-1/3 p-2">
                        <label htmlFor='habilidad'>Habilidad</label>
                        <select
                            id='habilidad'
                            {...register('id_habilidad')}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Seleccione una habilidad</option>
                            {validHabilidades.map((habilidad)=>(
                              <option key={habilidad.id} value={habilidad.id}>{habilidad.habilidad}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-1/3 p-2">
                        <label htmlFor='categoria-habilidad'>Taxonomia</label>
                        <select
                            id='categoria-habilidad'
                            {...register('id_categoria')}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Seleccione un verbo</option>
                            {validCategorias.map((categoria) => (
                              <option key={categoria.id} value={categoria.id}>{categoria.categoria}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="bg-white my-2 p-4 border-solid border-2 rounded-lg">
                <p className="title-2">Actividades</p>
                <div className="flex">
                    <ActividadForm
                        className='w-1/3 m-2 p-2 border rounded'
                        tipo='presencial'
                        id_actividad_field='id_actividad_presencial'
                        descripcion_actividad_field='descripcion_actividad_presencial'
                        evidencia_actividad_field='evidencia_presencial'
                        register={register}
                        actividades={validActividades}
                        setValue={setValue}
                        watch={watch}
                        idHabilidad={idHabilidad}
                    />
                    <ActividadForm
                        className='w-1/3 m-2 p-2 border rounded'
                        tipo='independiente'
                        id_actividad_field='id_actividad_independiente'
                        descripcion_actividad_field='descripcion_actividad_independiente'
                        evidencia_actividad_field='evidencia_independiente'
                        register={register}
                        actividades={validActividades}
                        setValue={setValue}
                        watch={watch}
                        idHabilidad={idHabilidad}
                    />
                    <ActividadForm
                        className='w-1/3 m-2 p-2 border rounded'
                        tipo='tarea'
                        id_actividad_field='id_actividad_tarea'
                        descripcion_actividad_field='descripcion_actividad_tarea'
                        evidencia_actividad_field='evidencia_tarea'
                        register={register}
                        actividades={validActividades}
                        setValue={setValue}
                        watch={watch}
                        idHabilidad={idHabilidad}
                    />
                </div>
            </div>
        </form>
    );
};

export default DetallesUnidadClient;
