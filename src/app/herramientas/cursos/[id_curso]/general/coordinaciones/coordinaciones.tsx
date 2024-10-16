import { notFound } from "next/navigation";
import CoordinacionesList from "./coordinacionesList";
import { getCoordinaciones, GetCoordinacionesType } from "@/utils/coordinaciones/getCoordinaciones";
import { getCatalogoCoordinaciones, GetCatalogoCoordinacionesType } from "@/utils/coordinaciones/getCatalogoCoordinaciones";
import { canEditCurso, getPermisosInCurso, GetPermisosInCursoType } from "@/utils/permisosCurso";

const CoordinacionesComponent = async ({
    className,
    idCurso,
    token,
}:{
    className: string,
    idCurso: number,
    token: string,
}) => {

    const [
        responseGetCatalogoCoordinaciones,
        responseGetCoordinaciones,
        responseGetPermisosCurso,
    ]:[
        GetCatalogoCoordinacionesType,
        GetCoordinacionesType,
        GetPermisosInCursoType,
    ] = await Promise.all([
        getCatalogoCoordinaciones(token),
        getCoordinaciones(idCurso, token),
        getPermisosInCurso(idCurso, token),
    ]);

    if(!responseGetCatalogoCoordinaciones.success || !responseGetCoordinaciones.success || !responseGetPermisosCurso.success){
        notFound();
    }

    const canEdit = canEditCurso(responseGetPermisosCurso.roles_curso);

    return (
        <CoordinacionesList
            coordinaciones={responseGetCoordinaciones.coordinaciones}
            idCurso={idCurso}
            catalogo_coordinaciones={responseGetCatalogoCoordinaciones.catalogo_coordinaciones}
            className={className}
            token={token}
            canEdit={canEdit}
        />
    );
};


export default CoordinacionesComponent;
