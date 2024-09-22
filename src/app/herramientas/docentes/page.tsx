import { getCatalogoMaestros, GetCatalogoMaestrosType } from "@/utils/maestros/getCatalogoMaestros";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import DocenteFinder from "./docenteFinder";

const Docentes = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';
    if ( token === '' ){
        notFound();
    }

    const responseGetCatalogoMaestros: GetCatalogoMaestrosType = await getCatalogoMaestros(token);

    if ( !responseGetCatalogoMaestros.success ){
        notFound();
    }

    return (
        <DocenteFinder
            className=''
            catalogoMaestros={responseGetCatalogoMaestros.catalogo_maestros}
        />
    );
};
export default Docentes;
