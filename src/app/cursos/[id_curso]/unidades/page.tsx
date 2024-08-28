import Unidades from './unidades';

import { UnidadMiniType } from '@models/unidad';

import { parseId } from '@utils/parseId';
import { notFound } from 'next/navigation';

const Contenido = ({ params }:{ params:{ id_curso: string } }) => {

    const idCurso = parseId(params.id_curso);
    if(!idCurso){
        return notFound();
    }

    const unidadesPool: UnidadMiniType[] = [
        {id:1, id_curso:1, numero:1, titulo:'Unidad 1'},
        {id:2, id_curso:2, numero:2, titulo:'Unidad 2'},
        {id:3, id_curso:3, numero:3, titulo:'Unidad 3'},
        {id:4, id_curso:4, numero:4, titulo:'Unidad 4'},
    ];


    return (
        <Unidades
            className=''
            unidadesPool = {unidadesPool}
            idCurso={idCurso}
        />
    );
}

export default Contenido;
