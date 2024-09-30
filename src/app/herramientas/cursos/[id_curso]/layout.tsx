import { Suspense } from 'react';
import CourseHeader from '@components/courseHeaders';
import TabsNavbar from '@/components/tabsNavbar';
import { parseId } from '@utils/parseId';
import { notFound } from 'next/navigation';
import CourseHeaderLoading from '@/components/courseHeaders/loading';
import { getCursoMini, GetCursoMiniType } from '@/utils/cursos/getCursoMini';
import { Metadata } from 'next';
import { cookies } from 'next/headers';



export const generateMetadata = async ({
    params,
}:{
    params: {id_curso: string},
}): Promise<Metadata> => {

    const idCurso = parseId(params.id_curso);
    if ( !idCurso ){
        return {
            title: 'Algo salio mal',
            description: 'Algo salio mal'
        }
    }

    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';
    if ( token === '' ){
        return {
            title: 'Algo salio mal',
            description: 'Algo salio mal'
        }
    }

    const responseGetCursoMini: GetCursoMiniType = await getCursoMini( idCurso, token );
    if ( !responseGetCursoMini.success ){
        return {
            title: 'Algo salio mal',
            description: 'Algo salio mal',
        };
    }

    const curso = responseGetCursoMini.curso_mini;

    return {
        title: `${curso?.clave}: ${curso?.nombre}`,
        description: `Informacion sobre el curso ${curso?.clave}: ${curso?.nombre}`,
    };
};

const TabsLayout = ({
    children,
    params
}:{
    children: React.ReactNode,
    params: { id_curso: string }
}) => {
   
    const idCurso = parseId(params.id_curso);
    if( !idCurso ){
        notFound();
    }

    return (
        <div className='flex flex-col h-full w-full'>
            <Suspense fallback={<CourseHeaderLoading/>}>
                <CourseHeader id_curso={idCurso} className='' />
            </Suspense>
            <TabsNavbar idCurso={idCurso}/>
            <div className='p-4 border border-light rounded h-full w-full'>{children}</div>
        </div>
    );
};

export default TabsLayout;
