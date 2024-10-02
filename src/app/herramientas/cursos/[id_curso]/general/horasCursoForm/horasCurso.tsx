import { getCurso } from "@/utils/cursos/getCurso";
import { notFound } from "next/navigation";
import HorasCursoForm from "./horasCursoForm";

const HorasCursoServer = async ({
    className,
    idCurso,
    token,
}:{
    className: string,
    idCurso: number,
    token: string,
}) => {

    const response = await getCurso(idCurso, token);

    if ( !response.success || response.curso === null ){
        notFound();
    }

    return (
        <HorasCursoForm
            className=''
            idCurso={idCurso}
            token={token}
            curso={response.curso}
        />
    );
};
export default HorasCursoServer;
