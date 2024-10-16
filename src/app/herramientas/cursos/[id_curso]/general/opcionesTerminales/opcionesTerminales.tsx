import ListaOpcionesTerminales from "./listaOpcionesTerminales";
import { getCatalogoOpcionesTerminales, GetCatalogoOpcionesTerminalesType } from "@/utils/facultades/getCatalogoOpcionesTerminales";
import { getCatalogoNivelesCurriculares, GetCatalogoNivelesCurricularesType } from "@/utils/facultades/getCatalogoNivelesCurriculares";
import { getCatalogoProgramas, GetCatalogoProgramasType } from "@/utils/facultades/getCatalogoProgramas";
import { getOpcionesTerminales, GetOpcionesTerminalesType } from "@/utils/facultades/getOpcionesTerminales";
import { canEditCurso, getPermisosInCurso, GetPermisosInCursoType } from "@/utils/permisosCurso";
import { notFound } from "next/navigation";

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
        responseGetPermisosCurso,
    ]:[
        GetCatalogoOpcionesTerminalesType,
        GetCatalogoNivelesCurricularesType,
        GetCatalogoProgramasType,
        GetOpcionesTerminalesType,
        GetPermisosInCursoType,
    ] = await Promise.all([
        getCatalogoOpcionesTerminales(token),
        getCatalogoNivelesCurriculares(token),
        getCatalogoProgramas(token),
        getOpcionesTerminales(idCurso, token),
        getPermisosInCurso(idCurso, token),
    ]);

    if ( !responseGetCatalogoOpcionesTerminales.success || !responseGetCalaogoNivelesCurriculares.success || !responseGetCatalogoProgramas.success ||
         !responseGetOpcionesTerminales.success || !responseGetPermisosCurso.success) {
        notFound();
    }

    const canEdit = canEditCurso(responseGetPermisosCurso.roles_curso);

    return (
        <>
            <ListaOpcionesTerminales
                className={className}
                idCurso={idCurso}
                token={token}
                catalogoOpcionesTerminales={responseGetCatalogoOpcionesTerminales.catalogo_opciones_terminales}
                catalogoNivelesCurriculares={responseGetCalaogoNivelesCurriculares.catalogo_niveles_curriculares}
                catalogoProgramas={responseGetCatalogoProgramas.catalogo_programas}
                opcionesTerminales={responseGetOpcionesTerminales.opciones_terminales}
                canEdit={canEdit}
            />
        </>
    );
};

export default OpcionesTerminalesComponent;
