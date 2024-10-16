
import { parseId } from '@utils/parseId';
import { notFound } from "next/navigation";
import ListaTemas from './listaTemas';
import { cookies } from "next/headers";
import { getTemasUnidad, GetTemasUnidadType } from '@/utils/temas/getTemasUnidad';
import { GetUnidadCursoType, getUnidadeCurso } from '@/utils/unidades/getUnidadCurso';

const TemasUnidad = async ({
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
    if( token === '' ){
        notFound();
    }

    const [
        responseGetTemasUnidad,
        responseGetUnidadCurso,
    ]:[
        GetTemasUnidadType,
        GetUnidadCursoType,
    ] = await Promise.all([
        getTemasUnidad(idUnidad, token),
        getUnidadeCurso(idUnidad, token),
    ]);

    if( !responseGetTemasUnidad.success || !responseGetUnidadCurso.success || !responseGetUnidadCurso.unidad ){
        notFound();
    }

    return (
        <section>
            <ListaTemas
                className = ''
                temas={responseGetTemasUnidad.temas}
                idCurso={idCurso}
                idUnidad = { idUnidad }
                unidad = { responseGetUnidadCurso.unidad}
                token={token}
            />
        </section>

    );
};

export default TemasUnidad;
