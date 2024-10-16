import { getCriteriosCurso } from '@/utils/criterios/getCriteriosCurso';
import ListaCriterios from './listaCriterios';
import { parseId } from '@utils/parseId';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

const Evaluacion = async ({
    params
}:{
    params:{id_curso: string}
}) => {
    const idCurso = parseId(params.id_curso);
    if(!idCurso){
        notFound();
    }

    const cookieStoke = cookies();
    const token = cookieStoke.get('authToken')?.value || '';
    if( token === '' ){
        notFound();
    }

    const responseGetCriteriosCurso = await getCriteriosCurso( idCurso, token );

    if ( !responseGetCriteriosCurso.success ){
        notFound();
    }

    return (
        <section>
            <h2 className='title-2'>Criterios de Evaluacion del Curso</h2>
            <ListaCriterios
                className=''
                idCurso={idCurso}
                criterios={responseGetCriteriosCurso.criterios}
                token={token}
            />
        </section>
    );
};

export default Evaluacion;
