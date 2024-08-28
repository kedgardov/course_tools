import { Suspense } from "react";

import DatosBasicosLoading from './loading';
import DatosBasicosComponent from "./datosBasicos";



const DatosBasicos = ({
    className,
    idCurso,
}:{
    className: string,
    idCurso: number,
}) => {

    return (
        <section>
            <Suspense fallback={<DatosBasicosLoading/>} >
                <DatosBasicosComponent
                    idCurso={idCurso}
                    className={className}
                />
            </Suspense>
        </section>
    );
};

export default DatosBasicos;
