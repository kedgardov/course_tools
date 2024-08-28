import { parseId } from '@utils/parseId';
import { notFound } from 'next/navigation';
import DetallesFuenteForm from './detallesFuenteForm';
import Link from 'next/link';

const DetallesFuente = ({
    params,
}:{
    params: { id_curso: string, id_fuente: string }
}) => {
    const idCurso = parseId(params.id_curso);
    const idFuente = parseId(params.id_fuente);
    if( !idCurso || !idFuente ){
        return notFound();
    }

    return (
        <section>
            <div className='flex'>
            <Link href={`/cursos/${idCurso}/fuentes`}>Regresar</Link>
            <h2>Detalles de la fuente</h2>
            </div>
            <DetallesFuenteForm/>
        </section>
    );

};

export default DetallesFuente;
