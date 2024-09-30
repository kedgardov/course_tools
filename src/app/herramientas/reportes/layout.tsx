import ReportesNavbar from '@/components/reportesNavbar';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Reportes Courses Tools',
    description: 'Pagina principal de generacion de reportes de cursos, tesis y participaciones de docentes en el CIAD',
}


const TabsLayout = ({
    children,

}:{
    children: React.ReactNode,

}) => {

    return (
        <div className='flex flex-col h-full w-full'>
            <h1 className='title-1-dark'>Reportes</h1>
            <ReportesNavbar/>
            <div className='p-4 border border-light rounded h-full w-full'>{children}</div>
        </div>
    );
};

export default TabsLayout;
