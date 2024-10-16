import ObjetivoGeneral from './objetivoGeneral';
import ObjetivosEspecificos from './objetivosEspecificos';
import { parseId } from '@/utils/parseId';
import { notFound } from 'next/navigation';
import { getObjetivoGeneral, GetObjetivoGeneralType } from '@/utils/objetivos/getObjetivoGeneral';
import { cookies } from 'next/headers';
import { getObjetivosEspecificos, GetObjetivosEspecificosType } from '@/utils/objetivos/getObjetivosEspecificos';

const Objetivos = async ({
    params,
}:{
    params: { id_curso: string }
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


    const [
        responseGetObjetivoGeneral,
        responseGetObjetivosEspecificos,
    ]:[
        GetObjetivoGeneralType,
        GetObjetivosEspecificosType,
    ] = await Promise.all([
        getObjetivoGeneral(idCurso, token),
        getObjetivosEspecificos(idCurso, token),
    ]);


    if (!responseGetObjetivosEspecificos.success || !responseGetObjetivoGeneral.success || !responseGetObjetivoGeneral.objetivo_general ){
        notFound();
    }

    return (
        <div className='h-full flex flex-col w-full'>
            <ObjetivoGeneral
                className='w-full'
                idCurso={idCurso}
                objetivoGeneral={responseGetObjetivoGeneral.objetivo_general}
                token={token}
            />
            <ObjetivosEspecificos
                className='w-full'
                idCurso={idCurso}
                objetivosEspecificos={responseGetObjetivosEspecificos.objetivos_especificos}
                token={token}
            />
        </div>
    );
};

export default Objetivos;
