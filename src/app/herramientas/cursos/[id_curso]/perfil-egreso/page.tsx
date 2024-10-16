import { getCurso, GetCursoType } from "@/utils/cursos/getCurso";
import { parseId } from "@/utils/parseId";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import PerfilEgresoForm from "./perfilEgresoForm";
import { getHabilidadesCurso, GetHabilidadesCursoType } from "@/utils/habilidades/getHabilidadesCurso";
import { getCatalogoHabilidades, GetCatalogoHabilidadesType } from "@/utils/habilidades/getCatalogoHabilidades";
import { getCatalogoGruposHabilidades, GetCatalogoGruposHabilidadesType } from "@/utils/habilidades/getCatalogoGruposHabilidades";
import { GrupoHabilidadType } from "@/models/grupoHabilidad";
import { HabilidadCursoType, HabilidadType } from "@/models/habilidad";
import TablaHabilidadesCurso from "./tablaHabilidadesCurso";

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
    ]:[
        GetHabilidadesCursoType,
        GetCatalogoHabilidadesType,
        GetCatalogoGruposHabilidadesType,
        GetCursoType,
    ] = await Promise.all([
        getHabilidadesCurso(idCurso, token),
        getCatalogoHabilidades(token),
        getCatalogoGruposHabilidades(token),
        getCurso(idCurso, token),
    ]);


     if ( !responseGetHabilidadesCurso.success || !responseGetCatalogoHabilidades.success || !responseGetCatalogoGruposHabilidades.success ||
          !responseGetCurso.success || responseGetCurso.curso === null){
         notFound();
     }


    return (
        <section>
            <TablaHabilidadesCurso
                idCurso={idCurso}
                className=''
                token={token}
                habilidadesCurso={responseGetHabilidadesCurso.habilidades_curso}
                catalogoHabilidades={responseGetCatalogoHabilidades.catalogo_habilidades}
                catalogoGruposHabilidades={responseGetCatalogoGruposHabilidades.catalogo_grupos_habilidades}
            />
        <PerfilEgresoForm
            className=''
            token={token}
            idCurso={idCurso}
            curso={responseGetCurso.curso}
            habilidadesCurso={responseGetHabilidadesCurso.habilidades_curso}
            catalogoHabilidades={responseGetCatalogoHabilidades.catalogo_habilidades}
            catalogoGruposHabilidades={responseGetCatalogoGruposHabilidades.catalogo_grupos_habilidades}
        />
        </section>
    );
};
export default PerfilEgreso;
