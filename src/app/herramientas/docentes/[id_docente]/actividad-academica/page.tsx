import { getCatalogoRolesTesis, GetCatalogoRolesTesisType } from "@/utils/maestros/getCatalogoRolesTesis";
import { getTesisMaestro, GetTesisMaestroType } from "@/utils/maestros/getTesisDocente";
import { parseId } from "@/utils/parseId";
import { getCatalogoGrados, GetCatalogoGradosType } from "@/utils/repo_tesis/grados/getCatalogoGrados";
import { getCatalogoOpcionesTerminales, GetCatalogoOpcionesTerminalesType } from "@/utils/repo_tesis/opcionesTerminales/getCatalogoOpcionesTerminales";
import { getCatalogoPronaces, GetCatalogoPronacesType } from "@/utils/repo_tesis/pronaces/getCatalogoPronaces";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import ActividadAcademica from "./participacionesAcademicas";

const ParticipacionAcademicaPage = async ({
    params,
}:{
    params: {
        id_docente: string,
    },
}) => {

    const cookieStore = cookies();
    const token: string = cookieStore.get('authToken')?.value || '';

    if ( token === '' ){
        notFound();
    }

    const idDocente = parseId(params.id_docente);
    if ( !idDocente ){
        notFound();
    }

    const [
        responseGetTesisMaestro,
        responseGetCatalogoRolesTesis,
        responseGetCatalogoPronaces,
        responseGetCatalogoGrados,
        responseGetCatalogoOpcionesTerminales,
    ]:[
        GetTesisMaestroType,
        GetCatalogoRolesTesisType,
        GetCatalogoPronacesType,
        GetCatalogoGradosType,
        GetCatalogoOpcionesTerminalesType,
    ] = await Promise.all([
        getTesisMaestro(idDocente, token),
        getCatalogoRolesTesis(token),
        getCatalogoPronaces(token),
        getCatalogoGrados(token),
        getCatalogoOpcionesTerminales(token),
    ]);

    if ( !responseGetTesisMaestro.success || !responseGetCatalogoRolesTesis.success ){
        notFound();

    }

    return (
        <ActividadAcademica
            className=''
            tesisList={responseGetTesisMaestro.tesis_maestro}
            catalogoRolesTesis={responseGetCatalogoRolesTesis.catalogo_roles_tesis}
        />
    );
};
export default ParticipacionAcademicaPage;
