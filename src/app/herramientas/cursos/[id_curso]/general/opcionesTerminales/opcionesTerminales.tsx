import ListaOpcionesTerminales from "./listaOpcionesTerminales";
import { getCatalogoOpcionesTerminales, GetCatalogoOpcionesTerminalesType } from "@/utils/facultades/getCatalogoOpcionesTerminales";
import { getCatalogoNivelesCurriculares, GetCatalogoNivelesCurricularesType } from "@/utils/facultades/getCatalogoNivelesCurriculares";
import { getCatalogoProgramas, GetCatalogoProgramasType } from "@/utils/facultades/getCatalogoProgramas";
import { getOpcionesTerminales, GetOpcionesTerminalesType } from "@/utils/facultades/getOpcionesTerminales";

const OpcionesTerminalesComponent = async ({
    className,
    idCurso,
    token,
}:{
    className: string,
    idCurso: number,
    token: string,
}) => {

    const [
        responseGetCatalogoOpcionesTerminales,
        responseGetCalaogoNivelesCurriculares,
        responseGetCatalogoProgramas,
        responseGetOpcionesTerminales,
    ]:[
        GetCatalogoOpcionesTerminalesType,
        GetCatalogoNivelesCurricularesType,
        GetCatalogoProgramasType,
        GetOpcionesTerminalesType,
    ] = await Promise.all([
        getCatalogoOpcionesTerminales(token),
        getCatalogoNivelesCurriculares(token),
        getCatalogoProgramas(token),
        getOpcionesTerminales(idCurso, token),
    ]);

    return (
        <>
            <ListaOpcionesTerminales
                className={className}
                idCurso={idCurso}
                catalogoOpcionesTerminales={responseGetCatalogoOpcionesTerminales.catalogo_opciones_terminales}
                catalogoNivelesCurriculares={responseGetCalaogoNivelesCurriculares.catalogo_niveles_curriculares}
                catalogoProgramas={responseGetCatalogoProgramas.catalogo_programas}
                opcionesTerminales={responseGetOpcionesTerminales.opciones_terminales}
            />
        </>
    );
};

export default OpcionesTerminalesComponent;
