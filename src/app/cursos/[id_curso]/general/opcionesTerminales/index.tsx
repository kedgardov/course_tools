import { Suspense } from "react";
import LoadingOpcionesTerminales from "./loading";
import OpcionesTerminalesComponent from './opcionesTerminales';

const OpcionesTerminales = ({
    className,
    idCurso,
}:{
    className: string,
    idCurso: number,
}) => {

    return (
        <section>
            <Suspense fallback={<LoadingOpcionesTerminales className={className}/>}>
                <OpcionesTerminalesComponent
                    className={className}
                    idCurso={idCurso}
                />
            </Suspense>
        </section>
    );
};

export default OpcionesTerminales;
