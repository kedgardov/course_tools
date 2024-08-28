'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const TabsNavbar = ({
    idCurso,
}:{
    idCurso: number,
}) => {
    const [currentTab, setCurrentTab] = useState<string>('');
    const pathname = usePathname();


    useEffect(() => {
         const tabs: string[] = [
            'general',
            'objetivos',
            'unidades',
            'evaluacion',
            'facultades',
            'colaboradores',
            'fuentes'
         ];
        const getTab = (path: string) => {
            const tab = tabs.find((tab) => path.includes(tab));
        return tab ? tab : '';
        };
        const newTab = getTab(pathname);
        setCurrentTab(newTab);
    }, [pathname]);

    return (
        <nav className='flex'>
            <Link className={`tab ${currentTab === 'general' ? 'selected-tab' : ''}`} href={`/cursos/${idCurso}/general`}>General</Link>
            <Link className={`tab ${currentTab === 'objetivos' ? 'selected-tab' : ''}`} href={`/cursos/${idCurso}/objetivos`}>Objetivos</Link>
            <Link className={`tab ${currentTab === 'unidades' ? 'selected-tab' : ''}`} href={`/cursos/${idCurso}/unidades`}>Contenido</Link>
            <Link className={`tab ${currentTab === 'evaluacion' ? 'selected-tab' : ''}`} href={`/cursos/${idCurso}/evaluacion`}>Evaluación</Link>
            <Link className={`tab ${currentTab === 'facultades' ? 'selected-tab' : ''}`} href={`/cursos/${idCurso}/facultades`}>Facultades</Link>
            <Link className={`tab ${currentTab === 'fuentes' ? 'selected-tab' : ''}`} href={`/cursos/${idCurso}/fuentes`}>Fuentes</Link>
        </nav>
    );
};

export default TabsNavbar;
            //<Link className={`tab ${currentTab === 'colaboradores' ? 'selected-tab' : ''}`} href={`/cursos/${idCurso}/colaboradores`}>Colaboradores</Link>
