import { parseId } from "@/utils/parseId";
import { getTesis, GetTesisResponseType } from "@/utils/repo_tesis/tesis/getTesis";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import DetallesTesisComponent from "./detallesTesis";
import { getCatalogoCoordinaciones, GetCatalogoCoordinacionesType } from "@/utils/repo_tesis/coordinaciones/getCatalogoCoordinaciones";
import { getAutores, GetAutoresResponseType } from "@/utils/repo_tesis/autores/getCatalogoAutores";
import { getCatalogoGrados, GetCatalogoGradosType } from "@/utils/repo_tesis/grados/getCatalogoGrados";
import { getCatalogoPronaces, GetCatalogoPronacesType } from "@/utils/repo_tesis/pronaces/getCatalogoPronaces";

const DetallesTesis = async ({
    params,
}:{
    params: { id_tesis: string, },
}) => {
    const idTesis = parseId(params.id_tesis);
    if( !idTesis ){
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
    ]:[
        GetTesisResponseType,
        GetCatalogoCoordinacionesType,
        GetAutoresResponseType,
        GetCatalogoGradosType,
        GetCatalogoPronacesType,
    ] = await Promise.all([
        getTesis(idTesis, token),
        getCatalogoCoordinaciones(token),
        getAutores(token),
        getCatalogoGrados(token),
        getCatalogoPronaces(token),
    ]);

    if( !responseGetTesis.tesis ){
        notFound();
    }


    return (
        <section>
            <DetallesTesisComponent
                className=' flex flex-col p-2'
                token={token}
                idTesis={idTesis}
                tesis={responseGetTesis.tesis}
                catalogoAutores={responseGetCatalogoAutores.autores}
                catalogoPronaces={responseGetCatalogoPronaces.catalogo_pronaces}
                catalogoCoordinaciones={responseGetCatalogoCoordinaciones.catalogo_coordinaciones}
                catalogoGrados={responseGetCatalogoGrados.catalogo_grados}
            />
        </section>
    );
};

export default DetallesTesis;
