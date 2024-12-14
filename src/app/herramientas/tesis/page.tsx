import { getCatalogoTesis, GetCatalogoTesisType } from "@/utils/repo_tesis/tesis/getCatalogoTesis";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import TesisFinder from "./tesisFinder";
import { getCatalogoCoordinaciones2, GetCatalogoCoordinaciones2Type } from "@/utils/repo_tesis/coordinaciones/getCatalogoCoordinaciones2";

const Tesis = async () => {

    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';
    if ( token === '' ){
        notFound();
    }

    const [
        responseGetCatalogoTesis,
        responseGetCatalogoCoordinaciones,
    ]:[
        GetCatalogoTesisType,
        GetCatalogoCoordinaciones2Type,
    ] = await Promise.all([
        getCatalogoTesis(token),
        getCatalogoCoordinaciones2(token),
    ]);

    if( !responseGetCatalogoTesis.success || !responseGetCatalogoCoordinaciones.success ){
        notFound();
    }

    return (
        <TesisFinder
            className=''
            catalogoTesis={responseGetCatalogoTesis.catalogo_tesis}
            catalogoCoordinaciones={responseGetCatalogoCoordinaciones.catalogo_coordinaciones_2}
        />
    );
};
export default Tesis;
