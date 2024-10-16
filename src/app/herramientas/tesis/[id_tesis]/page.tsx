import { parseId } from "@/utils/parseId";
import { getTesis, GetTesisResponseType } from "@/utils/repo_tesis/tesis/getTesis";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import DetallesTesisComponent from "./detallesTesis";
import { getCatalogoCoordinaciones, GetCatalogoCoordinacionesType } from "@/utils/repo_tesis/coordinaciones/getCatalogoCoordinaciones";
import { getAutores, GetAutoresResponseType } from "@/utils/repo_tesis/autores/getCatalogoAutores";
import { getCatalogoGrados, GetCatalogoGradosType } from "@/utils/repo_tesis/grados/getCatalogoGrados";
import { getCatalogoPronaces, GetCatalogoPronacesType } from "@/utils/repo_tesis/pronaces/getCatalogoPronaces";
import { getPrediccion, GetPrediccionPronaceType } from "@/utils/repo_tesis/pronaces/getPrediccion";
import { getCatalogoMaestros, GetCatalogoMaestrosType } from "@/utils/maestros/getCatalogoMaestros";
import { getCatalogoRolesTesis, GetCatalogoRolesTesisType } from "@/utils/maestros/getCatalogoRolesTesis";
import { getComiteDirectivoTesis, GetComiteDirectivoTesisType } from "@/utils/repo_tesis/tesis/getComiteDirectivoTesis";
import { getCatalogoOpcionesTerminales, GetCatalogoOpcionesTerminalesType } from "@/utils/repo_tesis/opcionesTerminales/getCatalogoOpcionesTerminales";
import { getCatalogoCoordinaciones2, GetCatalogoCoordinaciones2Type } from "@/utils/repo_tesis/coordinaciones/getCatalogoCoordinaciones2";


const DetallesTesis = async ({
    params,
}: {
    params: { id_tesis: string },
}) => {
    const idTesis = parseId(params.id_tesis);
    if (!idTesis) {
        notFound();
    }

    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';

    const [
        responseGetTesis,
        responseGetCatalogoCoordinaciones,
        responseGetCatalogoAutores,
        responseGetCatalogoGrados,
        responseGetCatalogoPronaces,
        responseGetPrediccionPronace,
        responseGetCatalogoMaestros,
        responseGetCatalogoRolesTesis,
        responseGetComiteDirectivo,
        responseGetCatalogoOpcionesTerminales,
        responseGetCatalogoCoordinaciones2,
    ]: [
        GetTesisResponseType,
        GetCatalogoCoordinacionesType,
        GetAutoresResponseType,
        GetCatalogoGradosType,
        GetCatalogoPronacesType,
        GetPrediccionPronaceType,
        GetCatalogoMaestrosType,
        GetCatalogoRolesTesisType,
        GetComiteDirectivoTesisType,
        GetCatalogoOpcionesTerminalesType,
        GetCatalogoCoordinaciones2Type,
    ] = await Promise.all([
        getTesis(idTesis, token),
        getCatalogoCoordinaciones(token),
        getAutores(token),
        getCatalogoGrados(token),
        getCatalogoPronaces(token),
        getPrediccion(idTesis, token),
        getCatalogoMaestros(token),
        getCatalogoRolesTesis(token),
        getComiteDirectivoTesis(idTesis, token),
        getCatalogoOpcionesTerminales(token),
        getCatalogoCoordinaciones2(token),
    ]);

    if (!responseGetTesis.tesis) {
        notFound();
    }

    return (
        <section>
            <DetallesTesisComponent
                className='flex flex-col p-2'
                token={token}
                idTesis={idTesis}
                tesis={responseGetTesis.tesis}
                catalogoAutores={responseGetCatalogoAutores.autores}
                catalogoPronaces={responseGetCatalogoPronaces.catalogo_pronaces}
                catalogoCoordinaciones={responseGetCatalogoCoordinaciones.catalogo_coordinaciones}
                catalogoGrados={responseGetCatalogoGrados.catalogo_grados}
                prediccionPronace={responseGetPrediccionPronace.prediccion}
                comiteDirectivo={responseGetComiteDirectivo.comite_directivo}
                catalogoMaestros={responseGetCatalogoMaestros.catalogo_maestros}
                catalogoRolesTesis={responseGetCatalogoRolesTesis.catalogo_roles_tesis}
                catalogoOpcionesTerminales={responseGetCatalogoOpcionesTerminales.catalogo_opciones_terminales}
                catalogoCoordinaciones2={responseGetCatalogoCoordinaciones2.catalogo_coordinaciones_2}
            />
           
        </section>
    );
};

export default DetallesTesis;
