import { getCurso, GetCursoType } from "@/utils/cursos/getCurso";
import { notFound } from "next/navigation";
import HorasCursoForm from "./horasCursoForm";
import { canEditCurso, getPermisosInCurso, GetPermisosInCursoType } from "@/utils/permisosCurso";

const HorasCursoServer = async ({
    className,
    idCurso,
    token,
}:{
    className: string,
    idCurso: number,
    token: string,
}) => {

    const [
        responseGetCurso,
        responseGetPermisosCurso,
    ]:[
        GetCursoType,
        GetPermisosInCursoType,
    ] = await Promise.all([
        getCurso(idCurso, token),
        getPermisosInCurso(idCurso, token),
    ]);

    if ( !responseGetCurso.success || !responseGetPermisosCurso.success || responseGetCurso.curso === null ){
        notFound();
    }

    const canEdit = canEditCurso(responseGetPermisosCurso.roles_curso);

    return (
        <HorasCursoForm
            className=''
            idCurso={idCurso}
            token={token}
            curso={responseGetCurso.curso}
            canEdit={canEdit}
        />
    );
};
export default HorasCursoServer;
