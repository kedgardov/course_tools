'use client'
import Link from 'next/link';
import SidebarSection from './sidebarSection';
import { AcademicCapIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { CursoMiniType } from '@/models/curso';
import { useState } from 'react';

const SidebarClient = ({
    className,
    cursosMini,
}:{
    className: string,
    cursosMini: CursoMiniType[],
}) => {
    const [showSidebar, setShowSidebar] = useState<boolean>(true);

    const cursos = cursosMini.map((curso) => ({id:curso.id, title: curso.nombre, link:`/cursos/${curso.id}/general`}));
    const facultades = [
        {id:1, title:'Ver Facultades', link:'/'},
        {id:2, title:'Agregar Facultad', link:'/'},
        {id:3, title:'Editar Facultad', link:'/'},
    ];

    const repositorios = [
        {id:1, title:'Ver Tesis', link:'/tesis'},
        {id:2, title:'Agregar Tesis', link:'/'},
        {id:3, title:'Reportes de Tesis', link:'/'},
    ];

    const opcionesPanel = [
        {id:1, title:'Crear Curso', link:'/'},
        {id:2, title:'Editar Curso', link:'/'},
        {id:3, title:'Habilitar Actualizacion', link:'/'},
    ];

    return (
        <>
        {showSidebar ? (
            <aside className={`sidebar ${className}`}>
                <header className='p-2 m-2 flex flex-col items-center'>
                    <AcademicCapIcon className='size-24'/>
                    <Link href='/cursos' className='text-4xl uppercase'>Course Tools</Link>
                </header>
                <SidebarSection
                    label='Mis Cursos'
                    name='mis-cursos'
                    entries={cursos}
                />
                <SidebarSection
                    label='Panel Admin'
                    name='panel-administrador'
                    entries={opcionesPanel}
                />
                <SidebarSection
                    label='Repositorios de Tesis'
                    name='repositorios-tesis'
                    entries={repositorios}
                />
                <SidebarSection
                    label='Facultades'
                    name='facultades'
                    entries={facultades}
                />
                <button onClick={() => setShowSidebar(false)}>
                    Hide
                </button>
            </aside>
        ) : (
            <button className='fixed left-4 top-4 z-50' onClick={() => setShowSidebar(true)} >
                <Bars3Icon className='size-6' />
            </button>
        )}
        </>
    );
};

export default SidebarClient;
