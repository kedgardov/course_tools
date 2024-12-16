import { getEncargados, GetEncargadosType } from "@/utils/encargados/getEncargados";
import { getCatalogoMaestros, GetCatalogoMaestrosType } from "@/utils/maestros/getCatalogoMaestros";
import { parseId } from "@/utils/parseId";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import CoolaboradoresCurso from "./coolaboradores";
import PrimaryButton from "@/components/primaryButton";
import JustificacionCurso from "./justificacion";

const TerminarCambiosPage = async ({
    params,
}:{
    params: { id_curso: string }
}) => {

    const idCurso = parseId(params.id_curso);
    if ( !idCurso ){
        return notFound();
    }

    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';
    if ( token === '' ){
        notFound();
    }

    const [
        responseGetEncargados,
        responseGetCatalogoMaestros,
    ]:[
        GetEncargadosType,
        GetCatalogoMaestrosType,
    ] = await Promise.all([
        getEncargados(idCurso, token),
        getCatalogoMaestros(token),
    ]);


    return (
        <section className='space-y-2'>

            <CoolaboradoresCurso
                className=''
                idCurso={idCurso}
                coolaboradores={responseGetEncargados.encargados}
                catalogoMaestros={responseGetCatalogoMaestros.catalogo_maestros}
            />

            <JustificacionCurso
                className=''
                idCurso={idCurso}
            />
            </section>
    );
};
export default TerminarCambiosPage;
