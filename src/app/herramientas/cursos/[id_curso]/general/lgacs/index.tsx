import { Suspense } from "react";
import LoadingLGACs from "./loading";
import LGACsComponent from './lgacs';

const LGACs = ({
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
            <Suspense fallback={<LoadingLGACs className={className}/>}>
                <LGACsComponent
                    className={className}
                    idCurso={idCurso}
                    token={token}
                />
            </Suspense>
        </section>
    );
};

export default LGACs;
