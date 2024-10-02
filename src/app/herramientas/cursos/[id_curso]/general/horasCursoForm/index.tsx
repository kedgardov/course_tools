import { Suspense } from "react";
import LoadingHorasCurso from "./loading";
import HorasCursoServer from "./horasCurso";

const HorasCurso = ({
    className,
    token,
    idCurso,
}:{
    className: string,
    token: string,
    idCurso: number,
}) => {


    return (
        <section>
            <Suspense fallback={<LoadingHorasCurso/>}>
                <HorasCursoServer
                    className={className}
                    token={token}
                    idCurso={idCurso}
                />
            </Suspense>
        </section>
    );
};
export default HorasCurso;
