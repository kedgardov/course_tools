import { getCatalogoMaestros, GetCatalogoMaestrosType } from "@/utils/maestros/getCatalogoMaestros";
import ListaEncargados from "./listaEncargados"
import { getCatalogoRoles, GetCatalogoRolesType } from "@/utils/cursos/getCatalogoRoles";
import { getEncargados, GetEncargadosType } from "@/utils/encargados/getEncargados";
import { notFound } from "next/navigation";
import { canEditCurso, getPermisosInCurso, GetPermisosInCursoType } from "@/utils/permisosCurso";

const EncargadosComponent = async ({
    className,
    idCurso,
    token,
}:{
    className: string,
    idCurso: number,
    token: string,
}) => {

    const [
        responseGetCatalogoMaestros,
        responseGetCatalogoRoles,
        responseGetEncargados,
        responseGetPermisosCurso,
    ]:[
        GetCatalogoMaestrosType,
        GetCatalogoRolesType,
        GetEncargadosType,
        GetPermisosInCursoType,
    ] = await Promise.all([
        getCatalogoMaestros(token),
        getCatalogoRoles(token),
        getEncargados(idCurso,token),
        getPermisosInCurso(idCurso, token),
    ]);

    if( !responseGetCatalogoMaestros.success || !responseGetCatalogoRoles.success || !responseGetEncargados.success || !responseGetPermisosCurso.success ){
        notFound();
    }

    const canEdit = canEditCurso(responseGetPermisosCurso.roles_curso);

    return (
        <ListaEncargados
            className={`${className}`}
            idCurso={idCurso}
            token={token}
            catalogoMaestros={responseGetCatalogoMaestros.catalogo_maestros}
            catalogoRoles={responseGetCatalogoRoles.catalogo_roles}
            encargados={responseGetEncargados.encargados}
            canEdit={canEdit}
        />
    );
};
export default EncargadosComponent;
