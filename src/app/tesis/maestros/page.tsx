import { getCatalogoMaestros, GetCatalogoMaestrosType } from "@/utils/maestros/getCatalogoMaestros";
import { getMaestrosPronaces, GetMaestrosPronacesType } from "@/utils/maestros/getMaestrosPronaces";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import ListaMaestros from "./listaMaestros";

const Maestros = async ({}:{}) => {
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';
    if ( token === '' ){
        notFound();
    }

    const [
        responseGetCatalogoMaestros,
        responseGetMaestrosPronaces,
    ]:[
        GetCatalogoMaestrosType,
        GetMaestrosPronacesType,
    ] = await Promise.all([
        getCatalogoMaestros(token),
        getMaestrosPronaces(token),
    ]);

    if ( !responseGetCatalogoMaestros.success || !responseGetMaestrosPronaces.success ){
        notFound();
    }

    return (
        <ListaMaestros
            catalogoMaestros={responseGetCatalogoMaestros.catalogo_maestros}
            maestrosPronaces={responseGetMaestrosPronaces.maestros_pronaces}
        />
    );
};
export default Maestros;
