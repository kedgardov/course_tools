import { Suspense } from "react";
import LoadingEncargados from "./loading";
import EncargadosComponent from "./encargados";

const Encargados = ({
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
            <Suspense fallback={<LoadingEncargados className={className} />}>
                <EncargadosComponent
                    className={className}
                    idCurso={idCurso}
                    token={token}
                />
            </Suspense>
        </section>
    );
};
export default Encargados;
