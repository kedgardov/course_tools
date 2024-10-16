import { parseId } from '@utils/parseId';
import { notFound } from "next/navigation";
import DetallesUnidadClient from './detalles';
import { cookies } from 'next/headers';
import { GetUnidadCursoType, getUnidadeCurso } from '@/utils/unidades/getUnidadCurso';
import { getCatalogoVerbos, GetCatalogoVerbosType } from '@/utils/habilidades/getCatalogoVerbos';
import { getCatalogoHabilidades, GetCatalogoHabilidadesType } from '@/utils/habilidades/getCatalogoHabilidades';
import { getHabilidadesCurso, GetHabilidadesCursoType } from '@/utils/habilidades/getHabilidadesCurso';
import { getCatalogoActividades, GetCatalogoActividadesType } from '@/utils/habilidades/getCatalogoActividades';
import { getTemasUnidad, GetTemasUnidadType } from '@/utils/temas/getTemasUnidad';
import ListaTemas from './temas/listaTemas';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

const DetallesUnidad = async ({
    params
}:{
    params: { id_curso: string, id_unidad: string }
}) => {

    const idCurso = parseId(params.id_curso);
    const idUnidad = parseId(params.id_unidad);
    if(!idCurso || !idUnidad) {
        return notFound();
    }

    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';
    if ( token === '' ){
        notFound();
    }

    const [
        responseGetUnidadCurso,
        responseGetCatalogoVerbos,
        responseGetCatalogoHabilidades,
        responseGetCatalogoActividades,
        responseGetHabilidadesCurso,
        responseGetTemasUnidad,
    ]:[
        GetUnidadCursoType,
        GetCatalogoVerbosType,
        GetCatalogoHabilidadesType,
        GetCatalogoActividadesType,
        GetHabilidadesCursoType,
        GetTemasUnidadType,
    ] = await Promise.all([
        getUnidadeCurso(idUnidad, token),
        getCatalogoVerbos(token),
        getCatalogoHabilidades(token),
        getCatalogoActividades(token),
        getHabilidadesCurso(idCurso, token),
        getTemasUnidad(idUnidad, token),
    ]);


    if ( !responseGetCatalogoActividades.success || !responseGetHabilidadesCurso.success || !responseGetCatalogoVerbos.success ||
        !responseGetCatalogoHabilidades.success || !responseGetUnidadCurso.success || !responseGetUnidadCurso.unidad ||
        !responseGetTemasUnidad.success){
        notFound();
    }

    return (
        <section>
            <DetallesUnidadClient
                unidad={responseGetUnidadCurso.unidad}
                token={token}
                idCurso={idCurso}
                catalogoHabilidades={responseGetCatalogoHabilidades.catalogo_habilidades}
                catalogoVerbos={responseGetCatalogoVerbos.catalogo_verbos}
                catalogoActividades={responseGetCatalogoActividades.catalogo_actividades}
                habilidadesCurso={responseGetHabilidadesCurso.habilidades_curso}
            />
            <ListaTemas
                className=''
                temas={responseGetTemasUnidad.temas}
                idCurso={idCurso}
                idUnidad={idUnidad}
                token={token}
            />
            <div className='flex w-full justify-center'>
                <Link className='text-primary font-bold tracking-wide w-fit flex my-2 border border-primary rounded-xl p-2' href={`/herramientas/cursos/${idCurso}/unidades`} >
                    <ArrowLeftIcon className='size-6'/>
                    Regresar
                </Link>
            </div>
        </section>
    );
};

export default DetallesUnidad;
