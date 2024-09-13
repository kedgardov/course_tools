import { Suspense } from 'react';
import CourseHeader from '@components/courseHeaders';
import TabsNavbar from '@/components/tabsNavbar';
import { parseId } from '@utils/parseId';
import { notFound } from 'next/navigation';
import CourseHeaderLoading from '@/components/courseHeaders/loading';


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
