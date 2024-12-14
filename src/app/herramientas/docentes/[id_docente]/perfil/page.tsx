import { getMaestro, GetMaestroType } from "@/utils/maestros/getMaestro";
import { parseId } from "@/utils/parseId";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import PerfilDocenteForm from "./perfilDocenteForm";
import TrayectoriaDocente from "./trayectoriaDocente";

const PerfilDocente = async ({
    params,
}:{
    params: {
        id_docente: string,
    },
}) => {

    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';
    if ( token === '' ){
        notFound();
    }

    const idDocente = parseId(params.id_docente);
    if ( !idDocente ){
        notFound();
    }

    const [
        responseGetMaestro,
    ]:[
        GetMaestroType,
    ] = await Promise.all([
        getMaestro(idDocente, token),
    ]);

    if ( !responseGetMaestro.success || !responseGetMaestro.maestro ){
        notFound();
    }

    return (
        <div>
            <PerfilDocenteForm maestro={responseGetMaestro.maestro} />
            <TrayectoriaDocente/>
        </div>
    );
};
export default PerfilDocente;
