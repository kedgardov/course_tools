import { parseId } from "@/utils/parseId";
import { notFound } from "next/navigation";
import DatosBasicos from './datosBasicos';
//import LGACs from "./lgacs";
import OpcionesTerminales from './opcionesTerminales';
import Coordinaciones from "./coordinaciones";
import { cookies } from "next/headers";
import Encargados from "./encargados";
import HorasCurso from "./horasCursoForm";

const General = ({
    params,
}:{
    params: { id_curso: string, },
}) => {
    const idCurso: number | null = parseId(params.id_curso);
    if( !idCurso ){
        notFound();
    }

    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';
    if ( token === '' ){
        notFound();
    }

    return (
        <section>
            <DatosBasicos
                className=' px-2 p-4'
                idCurso={idCurso}
                token={token}
            />
            {/*<LGACs
                className='border p-2'
                idCurso={idCurso}
                token={token}
                />*/}
            <OpcionesTerminales
                className=' px-2 py-4'
                idCurso={idCurso}
                token={token}
            />
            <Coordinaciones
                className=' px-2 py-4'
                idCurso={idCurso}
                token={token}
            />
            <Encargados
                className=' px-2 py-4'
                idCurso={idCurso}
                token={token}
            />
            <HorasCurso
                className=' px-2 py-4'
                idCurso={idCurso}
                token={token}
            />
        </section>
    );
};


export default General;
