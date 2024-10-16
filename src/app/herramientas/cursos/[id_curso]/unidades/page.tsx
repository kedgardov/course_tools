import { getUnidadesCurso, GetUnidadesCursoType } from '@/utils/unidades/getUnidadesCurso';
import Unidades from './unidades';

import { parseId } from '@utils/parseId';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

const Contenido = async ({
    params
}:{
    params:{ id_curso: string }
}) => {

    const idCurso = parseId(params.id_curso);
    if(!idCurso){
        return notFound();
    }

    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';
    if ( token === '' ){
        notFound();
    }

    const [
        responseGetUnidadesCurso,
    ]:[
        GetUnidadesCursoType,
    ] = await Promise.all([
        getUnidadesCurso(idCurso, token),
    ]);

    if( !responseGetUnidadesCurso.success ){
        notFound();
    }

    return (
        <Unidades
            className=''
            unidades = {responseGetUnidadesCurso.unidades}
            idCurso={idCurso}
            token={token}
        />
    );
}

export default Contenido;
