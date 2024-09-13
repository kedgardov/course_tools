import { Suspense } from "react";

import DatosBasicosLoading from './loading';
import DatosBasicosComponent from "./datosBasicos";



const DatosBasicos = ({
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
            <Suspense fallback={<DatosBasicosLoading/>} >
                <DatosBasicosComponent
                    idCurso={idCurso}
                    className={className}
                    token={token}
                />
            </Suspense>
        </section>
    );
};

export default DatosBasicos;
