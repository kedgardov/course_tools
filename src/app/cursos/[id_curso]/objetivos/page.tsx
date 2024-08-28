import { ObjetivoType } from '@models/objetivo';

import ObjetivoGeneral from './objetivoGeneral';
import ObjetivosEspecificos from './objetivosEspecificos';
import { parseId } from '@/utils/parseId';
import { notFound } from 'next/navigation';

 const objetivosEspecificos :ObjetivoType[] = [
        {id:1, numero:1, id_curso:1, objetivo:'Objetivo 1',tipo:'especifico'},
        {id:2, numero:2, id_curso:1, objetivo:'Objetivo 2', tipo:'especifico'},
        {id:3, numero:3, id_curso:1, objetivo:'Objetivo 3',tipo:'especifico'},
        {id:4, numero:4, id_curso:1, objetivo:'Objetivo 4',tipo:'especifico'},
        {id:5, numero:5, id_curso:1, objetivo:'Objetivo 5',tipo:'especifico'},
 ];

const objetivoGeneral: ObjetivoType =
        {id:13, numero:0, id_curso:1, objetivo:'Objetivo General 1',tipo:'general'};

const Objetivos = ({
    params,
}:{
    params: { id_curso: string }
}) => {

    const idCurso = parseId(params.id_curso);
    if(!idCurso){
        notFound();
    }

    return (
        <div className='h-full flex flex-col w-full'>
            <ObjetivoGeneral
                className='w-full'
                idCurso={idCurso}
                objetivoGeneral={objetivoGeneral}
            />
            <ObjetivosEspecificos
                className='w-full'
                idCurso={idCurso}
                objetivosEspecificos={objetivosEspecificos}
            />
        </div>
    );
};

export default Objetivos;
