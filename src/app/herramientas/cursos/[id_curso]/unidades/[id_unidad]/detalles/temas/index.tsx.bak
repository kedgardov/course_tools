
import { notFound } from "next/navigation";
import ListaTemas from './listaTemas';
import { getTemasUnidad, GetTemasUnidadType } from '@/utils/temas/getTemasUnidad';
import { GetUnidadCursoType, getUnidadeCurso } from '@/utils/unidades/getUnidadCurso';

const TemasUnidad = async ({
    idCurso,
    idUnidad,
    token,
}:{
    idCurso: number,
    idUnidad: number,
    token: string,
}) => {


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
