import { Suspense } from "react";
import CoordinacionesComponent from "./coordinaciones";
import LoadingCoordinaciones from "./loading";

const Coordinaciones = ({
    className,
    idCurso,
    token,
}:{
    className: string,
    idCurso: number,
    token: string,
}) => {

    return (
        <section>
            <Suspense fallback={<LoadingCoordinaciones className={className} />}>
                <CoordinacionesComponent
                    className={className}
                    idCurso={idCurso}
                    token={token}
                />
            </Suspense>
        </section>
    );
};

export default Coordinaciones;
