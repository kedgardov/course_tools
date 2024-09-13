import { CriterioType } from '@models/criterio';
import ListaCriterios from './listaCriterios';
import { parseId } from '@utils/parseId';
import { notFound } from 'next/navigation';

const Evaluacion = ({params}:{params:{id_curso: string}}) => {

    const idCurso = parseId(params.id_curso);
    if(!idCurso){
        notFound();
    }

    const criterios: CriterioType[] = [
        {id:1, id_curso:1, criterio:'Tareas', valor:30},
        {id:2, id_curso:1, criterio:'Examen', valor:30},
        {id:3, id_curso:1, criterio:'Presentacion', valor:30},
        {id:4, id_curso:1, criterio:'Participacion', valor:10},
    ];

    return (
        <section>
            <h2 className='title-2'>Criterios de Evaluacion del Curso</h2>
            <ListaCriterios
                className=''
                idCurso={idCurso}
                criterios={criterios}
            />
        </section>
    );
};

export default Evaluacion;
