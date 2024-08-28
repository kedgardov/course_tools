import { cookies } from 'next/headers';
import { getCurso, GetCursoType } from "@/utils/cursos/getCurso";


const CourseHeader = async ({ id_curso, className='' }:{ id_curso: number, className: string  }) => {

    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';
    const response: GetCursoType = await getCurso(id_curso, token);
    const curso = response.curso;

    return (
        <h1 className={`${className} title-1 title-1-container`}>
            <span>{`${curso?.clave? curso.clave+':' : 'No se encontro el curso'} `}</span>
            <span>{curso?.nombre}</span>
        </h1>
    );
}

export default CourseHeader;
