import { cookies } from 'next/headers';
import { getCursoMini, GetCursoMiniType } from '@/utils/cursos/getCursoMini';


const CourseHeader = async ({ id_curso, className='' }:{ id_curso: number, className: string  }) => {

    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';
    const response: GetCursoMiniType = await getCursoMini(id_curso, token);
    const curso = response.curso_mini;

    return (
        <h1 className={`${className} title-1 title-1-container`}>
            <span>{`${curso?.clave? curso.clave+':' : 'No se encontro el curso'} `}</span>
            <span>{curso?.nombre}</span>
        </h1>
    );
}

export default CourseHeader;
