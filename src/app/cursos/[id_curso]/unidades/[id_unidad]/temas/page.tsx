import Link from "next/link";
import { parseId } from '@utils/parseId';
import { notFound } from "next/navigation";

import ListaTemas from './listaTemas';
import { ArrowTurnLeftUpIcon } from '@heroicons/react/24/outline';
import { TemaType } from '@models/tema';

const TemasUnidad = ({ params }:{ params: { id_curso: string, id_unidad: string } }) => {

    const idCurso = parseId(params.id_curso);
    const idUnidad = parseId(params.id_unidad);
    if(!idCurso || !idUnidad) {
        return notFound();
    }

    const temas: TemaType[] = [
        {id:1, id_unidad:idUnidad, numero:1, titulo:'Tema 1'},
        {id:2, id_unidad:idUnidad, numero:2, titulo:'Tema 2'},
        {id:3, id_unidad:idUnidad, numero:3, titulo:'Tema 3'},
        {id:4, id_unidad:idUnidad, numero:4, titulo:'Tema 4'},

    ];

    return (
        <section>
            <ListaTemas
                className = ''
                temas={temas}
                idCurso={idCurso}
                idUnidad = { idUnidad }
            />
        </section>

    );
};

export default TemasUnidad;
