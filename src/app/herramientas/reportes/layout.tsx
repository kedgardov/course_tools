import ReportesNavbar from '@/components/reportesNavbar';


const TabsLayout = ({
    children,

}:{
    children: React.ReactNode,

}) => {

    return (
        <div className='flex flex-col h-full w-full'>
            <h1>Reportes</h1>
            <ReportesNavbar/>
            <div className='p-4 border border-light rounded h-full w-full'>{children}</div>
        </div>
    );
};

export default TabsLayout;
