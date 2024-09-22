'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ReportesNavbar = () => {

    const [currentTab, setCurrentTab] = useState<string>('');
    const pathname = usePathname();

    useEffect(() => {
        const pathToTabMap: { [key: string]: string } = {
            '/herramientas/reportes/cursos': 'cursos',
            '/herramientas/reportes/tesis': 'tesis',
            '/herramientas/reportes/participaciones-tesis': 'participaciones-tesis',
            '/herramientas/reportes/participaciones-cursos': 'participaciones-cursos',
        };

        const getSelectedTab = (path: string) => {
            return pathToTabMap[path] || '';
        };

        setCurrentTab(getSelectedTab(pathname));
    }, [pathname]);

    return (
        <nav className='flex'>
            <Link className={`tab ${currentTab === 'cursos' ? 'selected-tab' : ''}`} href='/herramientas/reportes/cursos'>Cursos</Link>
            <Link className={`tab ${currentTab === 'tesis' ? 'selected-tab' : ''}`} href='/herramientas/reportes/tesis'>Tesis</Link>
            <Link className={`tab ${currentTab === 'participaciones-tesis' ? 'selected-tab' : ''}`} href='/herramientas/reportes/participaciones-tesis'>Participaciones Tesis</Link>
            <Link className={`tab ${currentTab === 'participaciones-cursos' ? 'selected-tab' : ''}`} href='/herramientas/reportes/participaciones-cursos'>Participaciones Cursos</Link>
        </nav>
    );
};

export default ReportesNavbar;
