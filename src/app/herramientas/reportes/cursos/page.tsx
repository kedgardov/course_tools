import { getCursosNombres, GetCursosNombresType } from "@/utils/cursos/getCursosNombres";
import { getAllOpcionesTerminales, GetAllOpcionesTerminalesType } from "@/utils/facultades/getAllOpcionesTerminales";
import { getCatalogoNivelesCurriculares, GetCatalogoNivelesCurricularesType } from "@/utils/facultades/getCatalogoNivelesCurriculares";
import { getCatalogoOpcionesTerminales, GetCatalogoOpcionesTerminalesType } from "@/utils/facultades/getCatalogoOpcionesTerminales";
import { getCatalogoProgramas, GetCatalogoProgramasType } from "@/utils/facultades/getCatalogoProgramas";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import ReporteCursos from "./reporteCursos";

const ReporteCursosServer = async ({

}:{

}) => {
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';
    if(token === ''){
        notFound();
    }

    const [
        responseGetCursosNombres,
        responseGetCatalogoNivelesCurriculares,
        responseGetCatalogoProgramas,
        responseGetCatalogoOpcionesTerminales,
        responseGetAllOpcionesTerminales,
    ]:[
        GetCursosNombresType,
        GetCatalogoNivelesCurricularesType,
        GetCatalogoProgramasType,
        GetCatalogoOpcionesTerminalesType,
        GetAllOpcionesTerminalesType,
    ] = await Promise.all([
        getCursosNombres(token),
        getCatalogoNivelesCurriculares(token),
        getCatalogoProgramas(token),
        getCatalogoOpcionesTerminales(token),
        getAllOpcionesTerminales(token),
    ]);

    if( !responseGetCursosNombres.success || !responseGetCatalogoNivelesCurriculares.success || !responseGetCatalogoProgramas.success ||
    !responseGetCatalogoOpcionesTerminales.success || !responseGetAllOpcionesTerminales.success){
        notFound()
    }

    return (
        <ReporteCursos
            className=''
            catalogoCursos={responseGetCursosNombres.cursos_nombres}
            catalogoNivelesCurriculares={responseGetCatalogoNivelesCurriculares.catalogo_niveles_curriculares}
            catalogoProgramas={responseGetCatalogoProgramas.catalogo_programas}
            catalogoOpcionesTerminales={responseGetCatalogoOpcionesTerminales.catalogo_opciones_terminales}
            opcionesTerminales={responseGetAllOpcionesTerminales.opciones_terminales}
        />
    );
};
export default ReporteCursosServer;
