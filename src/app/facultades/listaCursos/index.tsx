import ListHeaders from "@/components/listHeaders";
import WidthType from "@/models/width";
import { getCursosNombres, GetCursosNombresType } from "@/utils/cursos/getCursosNombres";
import { getAllOpcionesTerminales, GetAllOpcionesTerminalesType } from "@/utils/facultades/getAllOpcionesTerminales";
import { getCatalogoNivelesCurriculares, GetCatalogoNivelesCurricularesType } from "@/utils/facultades/getCatalogoNivelesCurriculares";
import { getCatalogoOpcionesTerminales, GetCatalogoOpcionesTerminalesType } from "@/utils/facultades/getCatalogoOpcionesTerminales";
import { getCatalogoProgramas, GetCatalogoProgramasType } from "@/utils/facultades/getCatalogoProgramas";
import ListaCursosClient from "./ListaCursos";
import { CursoFacultadType } from "@/models/curso";

const ListaCursosServer = async ({
    className,
    token,
}: {
    className: string,
    token: string,
}) => {
    // Fetching data concurrently using Promise.all
    const [
        responseGetCursosNombres,
        responseGetCatalogoNivelesCurriculares,
        responseGetCatalogoProgramas,
        responseGetCatalogoOpcionesTerminales,
        responseGetAllOpcionesTerminales,
    ]: [
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

    // Create catalogoCursosFacultades by matching nombres with opciones_terminales
    const catalogoCursosFacultades: CursoFacultadType[] = responseGetAllOpcionesTerminales.opciones_terminales
        .map((ot) => {
            const matchingCurso = responseGetCursosNombres.cursos_nombres.find((curso) => curso.id === ot.id_curso);
            if (matchingCurso) {
                return { ...ot, nombre: matchingCurso.nombre }; // Combine fields to create CursoFacultadType
            }
            return null;
        })
        .filter((item): item is CursoFacultadType => item !== null); // Filter out null values

    return (
        <ListaCursosClient
            className={className}
            catalogoCursosFacultades={catalogoCursosFacultades}
            catalogoNivelesCurriculares={responseGetCatalogoNivelesCurriculares.catalogo_niveles_curriculares}
            catalogoProgramas={responseGetCatalogoProgramas.catalogo_programas}
            catalogoOpcionesTerminales={responseGetCatalogoOpcionesTerminales.catalogo_opciones_terminales}
            opcionesTerminales={responseGetAllOpcionesTerminales.opciones_terminales}
        />
    );
};

export default ListaCursosServer;
