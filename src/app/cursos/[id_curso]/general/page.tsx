import { parseId } from "@/utils/parseId";
import { notFound } from "next/navigation";
import DatosBasicos from './datosBasicos';
import LGACs from "./lgacs";
import OpcionesTerminales from './opcionesTerminales';
import Coordinaciones from "./coordinaciones";

const General = ({
    params,
}:{
    params: { id_curso: string, },
}) => {
    const idCurso: number | null = parseId(params.id_curso);
    if( !idCurso ){
        notFound();
    }

    return (
        <section>
            <DatosBasicos
                className='border p-2'
                idCurso={idCurso}
            />
            <LGACs
                className='border p-2'
                idCurso={idCurso}
            />
            <OpcionesTerminales
                className='border p-2'
                idCurso={idCurso}
            />
            <Coordinaciones
                className='border p-2'
                idCurso={idCurso}
            />
        </section>
    );
};


export default General;
