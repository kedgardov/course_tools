import { Suspense } from "react";
import LoadingOpcionesTerminales from "./loading";
import OpcionesTerminalesComponent from './opcionesTerminales';

const OpcionesTerminales = ({
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
            <Suspense fallback={<LoadingOpcionesTerminales className={className}/>}>
                <OpcionesTerminalesComponent
                    className={className}
                    idCurso={idCurso}
                    token={token}
                />
            </Suspense>
        </section>
    );
};

export default OpcionesTerminales;
