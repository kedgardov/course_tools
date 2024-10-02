import { getCatalogoCoordinaciones } from "@/utils/coordinaciones/getCatalogoCoordinaciones";
import { getCatalogoMaestros, GetCatalogoMaestrosType } from "@/utils/maestros/getCatalogoMaestros";
import { getCatalogoRolesTesis, GetCatalogoRolesTesisType } from "@/utils/maestros/getCatalogoRolesTesis";
import { GetCatalogoCoordinacionesType } from "@/utils/repo_tesis/coordinaciones/getCatalogoCoordinaciones";
import { getCatalogoGrados, GetCatalogoGradosType } from "@/utils/repo_tesis/grados/getCatalogoGrados";
import { getCatalogoPronaces, GetCatalogoPronacesType } from "@/utils/repo_tesis/pronaces/getCatalogoPronaces";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import ReporteParticipacionesTesis from "./reporteParticipacionesTesis";
import { getParticipacionesTesis, GetParticipacionesTesisType } from "@/utils/maestros/getParticipacionesTesis";
import { getCatalogoOpcionesTerminales, GetCatalogoOpcionesTerminalesType } from "@/utils/repo_tesis/opcionesTerminales/getCatalogoOpcionesTerminales";
import { GetTesisResponseType } from "@/utils/repo_tesis/tesis/getTesis";
import { getTesisMini, GetTesisMiniResponseType } from "@/utils/repo_tesis/tesis/getTesisMini";



const ReporteParticipacionesTesisServer = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';

    const [
        responseGetCatalogoMaestros,
        responseGetCatalogoRolesTesis,
        responseGetCatalogoCoordinaciones,
        responseGetCatalogoPronaces,
        responseGetCatalogoGrados,
        responseGetParticipacionesTesis,
        responseGetCatalogoOpcionesTerminales,
        responseGetTesisMini,
    ]:[
        GetCatalogoMaestrosType,
        GetCatalogoRolesTesisType,
        GetCatalogoCoordinacionesType,
        GetCatalogoPronacesType,
        GetCatalogoGradosType,
        GetParticipacionesTesisType,
        GetCatalogoOpcionesTerminalesType,
        GetTesisMiniResponseType,
    ] = await Promise.all([
        getCatalogoMaestros(token),
        getCatalogoRolesTesis(token),
        getCatalogoCoordinaciones(token),
        getCatalogoPronaces(token),
        getCatalogoGrados(token),
        getParticipacionesTesis(token),
        getCatalogoOpcionesTerminales(token),
        getTesisMini(token),
    ]);

    if ( !responseGetTesisMini.success|| !responseGetCatalogoMaestros.success || !responseGetCatalogoRolesTesis.success || !responseGetCatalogoCoordinaciones.success ||
         !responseGetCatalogoPronaces.success || !responseGetCatalogoGrados || !responseGetParticipacionesTesis || !responseGetCatalogoOpcionesTerminales.success ){
        notFound();
    }

    const catalogoAnos = ['2018','2019','2020','2021','2022','2023','2024'];

    return (
        <ReporteParticipacionesTesis
            className=''
            catalogoMaestros={responseGetCatalogoMaestros.catalogo_maestros}
            catalogoRolesTesis={responseGetCatalogoRolesTesis.catalogo_roles_tesis}
            catalogoCoordinaciones={responseGetCatalogoCoordinaciones.catalogo_coordinaciones}
            catalogoPronaces={responseGetCatalogoPronaces.catalogo_pronaces}
            catalogoGrados={responseGetCatalogoGrados.catalogo_grados}
            catalogoAnos={catalogoAnos}
            catalogoOpcionesTerminales={responseGetCatalogoOpcionesTerminales.catalogo_opciones_terminales}
            participacionesTesis={responseGetParticipacionesTesis.participaciones_tesis}
            tesisMini={responseGetTesisMini.tesis_mini}
        />
    );
};
export default ReporteParticipacionesTesisServer;
