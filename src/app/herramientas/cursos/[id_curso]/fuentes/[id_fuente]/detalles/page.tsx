import { getFuenteAndAutores, GetFuenteAndAutoresType } from "@/utils/fuentes/getFuente";
import { parseId } from "@/utils/parseId";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const FuenteFormPage = async ({
    params,
}:{
    params: {
        id_curso: string,
        id_fuente: string,
    },
}) => {

    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';
    if ( token === '' ){
        notFound();
    }

    const idCurso = parseId(params.id_curso);
    const idFuente = parseId(params.id_fuente);
    if ( !idCurso || !idFuente ){
        notFound();
    }

    const [
        responseGetFuenteAndAutores,
    ]:[
        GetFuenteAndAutoresType,
    ] = await Promise.all([
        getFuenteAndAutores(idFuente, token),
    ]);
    console.log(responseGetFuenteAndAutores);
    if( !responseGetFuenteAndAutores.success || !responseGetFuenteAndAutores.fuente ){
        notFound();
    }

    return (
        <p>Test</p>
    );
};
export default FuenteFormPage;
