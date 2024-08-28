import { AcademicCapIcon } from '@heroicons/react/24/outline';
import Spinner from '@components/spinner';

const LoadingSidebar = ({ className }: { className: string }) => {
    return (
        <aside className={`sidebar ${className}`}>
            <header className='p-2 m-2 flex flex-col items-center text-light'>
                <AcademicCapIcon className='size-24' />
                <h1 className='text-4xl uppercase'>Course Tools</h1>
            </header>
            <section className='sidebar-section'>
                <div className='flex'>
                    <p>Mis Cursos</p>
                    <Spinner size={1.5} className='ml-auto' color='white'/>
                </div>
            </section>
            <section className='sidebar-section'>
                <div className='flex'>
                    <p>Panel Admin</p>
                    <Spinner size={1.5} className='ml-auto' color='white' />
                </div>
            </section>
            <section className='sidebar-section'>
                <div className='flex'>
                    <p>Repositorios de Tesis</p>
                    <Spinner size={1.5} className='ml-auto' color='white'/>
                </div>
            </section>
            <section className='sidebar-section'>
                <div className='flex'>
                    <p>Facultades</p>
                    <Spinner size={1.5} className='ml-auto' color='white'/>
                </div>
            </section>
        </aside>
    );
};

export default LoadingSidebar;
