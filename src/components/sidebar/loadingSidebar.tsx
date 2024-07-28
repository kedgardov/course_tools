const LoadingSidebar = async ( { className }:{ className: string } ) => {

    return (
        <aside className={`${className} bg-primary divide-y`}>
            <header className='p-2 m-2 text-light flex justify-center text-4xl font-bold'>Course Tools</header>
            <section className='sidebar-section'>Mis Cursos</section>
            <section className='sidebar-section'>Panel Admin</section>
            <section className='sidebar-section'>Repositorios de Tesis</section>
            <section className='sidebar-section'>Facultades</section>
        </aside>
    );
};

export default LoadingSidebar;
