import { Suspense } from "react";
import CoordinacionesComponent from "./coordinaciones";
import LoadingCoordinaciones from "./loading";

const Coordinaciones = ({
    className,
    idCurso,
}:{
    className: string,
    idCurso: number,
}) => {

    return (
        <section>
            <Suspense fallback={<LoadingCoordinaciones className={className} />}>
                <CoordinacionesComponent
                    className={className}
                    idCurso={idCurso}
                />
            </Suspense>
        </section>
    );
};

export default Coordinaciones;
