import { getCatalogoRoles, GetCatalogoRolesType } from "@/utils/cursos/getCatalogoRoles";
import { getCatalogoNivelesCurriculares, GetCatalogoNivelesCurricularesType } from "@/utils/facultades/getCatalogoNivelesCurriculares";
import { getCatalogoOpcionesTerminales, GetCatalogoOpcionesTerminalesType } from "@/utils/facultades/getCatalogoOpcionesTerminales";
import { getCatalogoProgramas, GetCatalogoProgramasType } from "@/utils/facultades/getCatalogoProgramas";
import { getParticipacionesCursos, GetParticipacionesCursosType } from "@/utils/facultades/getParticipacionesCursos";
import { getCatalogoMaestros, GetCatalogoMaestrosType } from "@/utils/maestros/getCatalogoMaestros";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import ReporteParticipacionesCursos from "./reporteParticipacionesCursos";
import { getCursosMini, GetCursosMiniType } from "@/utils/cursos/getCursosMini";

const ReporteParticipacionesCursosServer = async () => {


    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';
    if( token === '' ){
        notFound();
    }

    const [
        responseGetCatalogoMaestros,
        responseGetCatalogoRoles,
        responseGetCatalogoProgramas,
        responseGetCatalogoNivelesCurriculares,
        responseGetCatalogoOpcionesTerminales,
        responseGetParticipacionesCursos,
        responseGetCursosMini,
    ]:[
        GetCatalogoMaestrosType,
        GetCatalogoRolesType,
        GetCatalogoProgramasType,
        GetCatalogoNivelesCurricularesType,
        GetCatalogoOpcionesTerminalesType,
        GetParticipacionesCursosType,
        GetCursosMiniType,
    ] = await Promise.all([
        getCatalogoMaestros(token),
        getCatalogoRoles(token),
        getCatalogoProgramas(token),
        getCatalogoNivelesCurriculares(token),
        getCatalogoOpcionesTerminales(token),
        getParticipacionesCursos(token),
        getCursosMini(token),
    ]);

    if( !responseGetCursosMini.success || !responseGetCatalogoMaestros.success || !responseGetCatalogoRoles.success || !responseGetCatalogoProgramas.success ||
        !responseGetCatalogoNivelesCurriculares.success || !responseGetCatalogoOpcionesTerminales.success || !responseGetParticipacionesCursos.success){
        notFound();
    }
    console.log(responseGetCursosMini);

    return (
        <ReporteParticipacionesCursos
            className=''
            catalogoMaestros={responseGetCatalogoMaestros.catalogo_maestros}
            catalogoRoles={responseGetCatalogoRoles.catalogo_roles}
            catalogoProgramas={responseGetCatalogoProgramas.catalogo_programas}
            catalogoNivelesCurriculares={responseGetCatalogoNivelesCurriculares.catalogo_niveles_curriculares}
            catalogoOpcionesTerminales={responseGetCatalogoOpcionesTerminales.catalogo_opciones_terminales}
            participacionesCursos={responseGetParticipacionesCursos.participaciones_cursos}
            cursosMini={responseGetCursosMini.cursos_mini}
        />
    );
};
export default ReporteParticipacionesCursosServer;
