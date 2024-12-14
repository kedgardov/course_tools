import { getCurso, GetCursoType } from "@/utils/cursos/getCurso";
import { parseId } from "@/utils/parseId";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import PerfilEgresoForm from "./perfilEgresoForm";
import { getHabilidadesCurso, GetHabilidadesCursoType } from "@/utils/habilidades/getHabilidadesCurso";
import { getCatalogoHabilidades, GetCatalogoHabilidadesType } from "@/utils/habilidades/getCatalogoHabilidades";
import { getCatalogoGruposHabilidades, GetCatalogoGruposHabilidadesType } from "@/utils/habilidades/getCatalogoGruposHabilidades";
import TablaHabilidadesCurso from "./tablaHabilidadesCurso";
import { canEditCurso, getPermisosInCurso, GetPermisosInCursoType } from "@/utils/permisosCurso";

const PerfilEgreso = async ({
    params,
}:{
    params: { id_curso: string, },
}) => {

    const idCurso = parseId(params.id_curso);
    if ( !idCurso ){
        notFound();
    }
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';
    if ( token === '' ){
        notFound();
    }


    const [
        responseGetHabilidadesCurso,
        responseGetCatalogoHabilidades,
        responseGetCatalogoGruposHabilidades,
        responseGetCurso,
        responseGetPermisosCurso,
    ]:[
        GetHabilidadesCursoType,
        GetCatalogoHabilidadesType,
        GetCatalogoGruposHabilidadesType,
        GetCursoType,
        GetPermisosInCursoType,
    ] = await Promise.all([
        getHabilidadesCurso(idCurso, token),
        getCatalogoHabilidades(token),
        getCatalogoGruposHabilidades(token),
        getCurso(idCurso, token),
        getPermisosInCurso(idCurso, token),
    ]);


     if ( !responseGetHabilidadesCurso.success || !responseGetCatalogoHabilidades.success || !responseGetCatalogoGruposHabilidades.success ||
          !responseGetCurso.success || !responseGetPermisosCurso.success || responseGetCurso.curso === null){
         notFound();
     }

    const canEdit = canEditCurso(responseGetPermisosCurso.roles_curso);

    return (
        <section>
            <TablaHabilidadesCurso
                idCurso={idCurso}
                className=''
                token={token}
                habilidadesCurso={responseGetHabilidadesCurso.habilidades_curso}
                catalogoHabilidades={responseGetCatalogoHabilidades.catalogo_habilidades}
                catalogoGruposHabilidades={responseGetCatalogoGruposHabilidades.catalogo_grupos_habilidades}
                canEdit={canEdit}
            />
            <PerfilEgresoForm
                className=''
                token={token}
                idCurso={idCurso}
                curso={responseGetCurso.curso}
                habilidadesCurso={responseGetHabilidadesCurso.habilidades_curso}
                catalogoHabilidades={responseGetCatalogoHabilidades.catalogo_habilidades}
                catalogoGruposHabilidades={responseGetCatalogoGruposHabilidades.catalogo_grupos_habilidades}
                canEdit={canEdit}
            />
        </section>
    );
};
export default PerfilEgreso;
