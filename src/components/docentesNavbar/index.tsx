'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const DocentesNavbar = ({
    idDocente,
}:{
    idDocente: number,
}) => {

    const [ currentTab, setCurrentTab ] = useState<string>('');
    const pathname = usePathname();

    useEffect(() => {
        const tabs: string[] = [
            'perfil',
            'publicaciones',
            'actividad-academica',
        ];
        const getTab = ( path: string ) => {
            const tab = tabs.find((tab) => path.includes(tab));
            return tab ? tab : '';
        }
        const newTab = getTab(pathname);
        setCurrentTab(newTab);
    },[pathname]);

    return (
        <nav className = 'flex'>
            <Link className={`tab ${currentTab === 'perfil' ? 'selected-tab' : ''}`} href={`/herramientas/docentes/${idDocente}/perfil`} >Perfil</Link>
            <Link className={`tab ${currentTab === 'publicaciones' ? 'selected-tab' : ''}`} href={`/herramientas/docentes/${idDocente}/publicaciones`} >Publicaciones</Link>
            <Link className={`tab ${currentTab === 'actividad-academica' ? 'selected-tab' : ''}`} href={`/herramientas/docentes/${idDocente}/actividad-academica`} >Actividad Academica</Link>
        </nav>
    );
};

export default DocentesNavbar;
