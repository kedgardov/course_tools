import { parseId } from '@utils/parseId';
import { notFound } from 'next/navigation';
import { getFuentesAndAutores } from '@/utils/fuentes/getFuentes';
import { cookies } from 'next/headers';
import ListaFuentesCurso from './listaFuentes';

const Fuentes = async ({ params }:{ params:{ id_curso: string }}) => {

    const idCurso = parseId(params.id_curso);
    if(!idCurso){
        notFound();
    }

    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';
    if ( token === '' ){
        notFound()
    }

    const response = await getFuentesAndAutores(idCurso, token);
    if ( !response.success ){
        notFound();
    }

    return (
        <ListaFuentesCurso
            className=''
            token={token}
            idCurso={idCurso}
            fuentes={response.fuentes}
            autores={response.autores}
        />
    );
};

export default Fuentes;
