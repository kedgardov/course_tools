import { getCatalogoRolesTesis, GetCatalogoRolesTesisType } from "@/utils/maestros/getCatalogoRolesTesis";
import { getMaestro, GetMaestroType } from "@/utils/maestros/getMaestro";
import { getTesisMaestro, GetTesisMaestroType } from "@/utils/maestros/getTesisDocente";
import { parseId } from "@/utils/parseId";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import DetallesDocenteForm from "./docenteForm";
import { getCatalogoPronaces, GetCatalogoPronacesType } from "@/utils/repo_tesis/pronaces/getCatalogoPronaces";
import TesisDocente from "./tesisDocente";
import { getCatalogoGrados, GetCatalogoGradosType } from "@/utils/repo_tesis/grados/getCatalogoGrados";
import { getCatalogoOpcionesTerminales, GetCatalogoOpcionesTerminalesType } from "@/utils/repo_tesis/opcionesTerminales/getCatalogoOpcionesTerminales";

const DetallesDocente = async ({
    params,
}:{
    params:{ id_docente: string }
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
        responseGetCatalogoRolesTesis,
        responseGetCatalogoPronaces,
        responseGetTesisMaestro,
        responseGetCatalogoGrados,
        responseGetCatalogoOpcionesTerminales,

    ]:[
        GetMaestroType,
        GetCatalogoRolesTesisType,
        GetCatalogoPronacesType,
        GetTesisMaestroType,
        GetCatalogoGradosType,
        GetCatalogoOpcionesTerminalesType,
    ] = await Promise.all([
        getMaestro(idDocente, token),
        getCatalogoRolesTesis(token),
        getCatalogoPronaces(token),
        getTesisMaestro(idDocente, token),
        getCatalogoGrados(token),
        getCatalogoOpcionesTerminales(token),
    ]);

    if( !responseGetMaestro.success || !responseGetCatalogoRolesTesis.success || !responseGetTesisMaestro.success ||
        !responseGetCatalogoPronaces.success || !responseGetCatalogoGrados.success || !responseGetCatalogoOpcionesTerminales.success ||
        !responseGetMaestro.maestro ){
        return notFound();
    }

    const catalogoAnos = ['2018','2019','2020','2021','2022','2023','2024'];

    return (
        <div className='p-4'>
            <DetallesDocenteForm
                maestro={responseGetMaestro.maestro}
            />
            <TesisDocente
                className=''
                tesisMini={responseGetTesisMaestro.tesis_maestro}
                catalogoRolesTesis={responseGetCatalogoRolesTesis.catalogo_roles_tesis}
                catalogoPronaces={responseGetCatalogoPronaces.catalogo_pronaces}
                catalogoAnos={catalogoAnos}
                catalogoGrados={responseGetCatalogoGrados.catalogo_grados}
                catalogoOpcionesTerminales={responseGetCatalogoOpcionesTerminales.catalogo_opciones_terminales}
            />
        </div>
    );
};
export default DetallesDocente;
