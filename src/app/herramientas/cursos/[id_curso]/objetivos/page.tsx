import ObjetivoGeneral from './objetivoGeneral';
import ObjetivosEspecificos from './objetivosEspecificos';
import { parseId } from '@/utils/parseId';
import { notFound } from 'next/navigation';
import { getObjetivoGeneral, GetObjetivoGeneralType } from '@/utils/objetivos/getObjetivoGeneral';
import { cookies } from 'next/headers';
import { getObjetivosEspecificos, GetObjetivosEspecificosType } from '@/utils/objetivos/getObjetivosEspecificos';
import { canEditCurso, getPermisosInCurso, GetPermisosInCursoType } from '@/utils/permisosCurso';

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
        responseGetPermisosCurso,
    ]:[
        GetObjetivoGeneralType,
        GetObjetivosEspecificosType,
        GetPermisosInCursoType,
    ] = await Promise.all([
        getObjetivoGeneral(idCurso, token),
        getObjetivosEspecificos(idCurso, token),
        getPermisosInCurso(idCurso, token),
    ]);


    if (!responseGetObjetivosEspecificos.success || !responseGetObjetivoGeneral.success || !responseGetObjetivoGeneral.objetivo_general || !responseGetPermisosCurso.success ){
        notFound();
    }

    const canEdit = canEditCurso(responseGetPermisosCurso.roles_curso);

    return (
        <div className='h-full flex flex-col w-full'>
            <ObjetivoGeneral
                className='w-full'
                idCurso={idCurso}
                objetivoGeneral={responseGetObjetivoGeneral.objetivo_general}
                token={token}
                canEdit={canEdit}
            />
            <ObjetivosEspecificos
                className='w-full'
                idCurso={idCurso}
                objetivosEspecificos={responseGetObjetivosEspecificos.objetivos_especificos}
                token={token}
                canEdit={canEdit}
            />
        </div>
    );
};

export default Objetivos;
