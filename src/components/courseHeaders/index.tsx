import { cookies } from 'next/headers';
import { getCursoMini, GetCursoMiniType } from '@/utils/cursos/getCursoMini';
import { notFound } from 'next/navigation';


const CourseHeader = async ({ id_curso, className='' }:{ id_curso: number, className: string  }) => {

    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';

    if ( token === '' ){
        notFound();
    }

    const responseGetCursoMini: GetCursoMiniType = await getCursoMini(id_curso, token);

    if( !responseGetCursoMini.success || !responseGetCursoMini.curso_mini ){
        console.log(responseGetCursoMini);
        notFound();
    }

    const curso = responseGetCursoMini.curso_mini;

    return (
        <h1 className={`${className} title-1 title-1-container`}>
            <span>{curso.clave}</span>
            <span>: </span>
            <span>{curso.nombre}</span>
        </h1>
    );
}

export default CourseHeader;
