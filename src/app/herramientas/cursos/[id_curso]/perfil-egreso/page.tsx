import { getCurso } from "@/utils/cursos/getCurso";
import { parseId } from "@/utils/parseId";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import PerfilEgresoForm from "./perfilEgresoForm";

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

    const response = await getCurso(idCurso, token);


    if ( !response.success || response.curso === null ){

        notFound();

    }

    return (
        <PerfilEgresoForm
            className=''
            token={token}
            idCurso={idCurso}
            curso={response.curso}
        />
    );
};
export default PerfilEgreso;
