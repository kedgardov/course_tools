import { Suspense } from "react";
import LoadingLGACs from "./loading";
import LGACsComponent from './lgacs';

const LGACs = ({
    className,
    idCurso,
}:{
    className: string,
    idCurso: number,
}) => {

    return (
        <section>
            <Suspense fallback={<LoadingLGACs className={className}/>}>
                <LGACsComponent
                    className={className}
                    idCurso={idCurso}
                />
            </Suspense>
        </section>
    );
};

export default LGACs;
