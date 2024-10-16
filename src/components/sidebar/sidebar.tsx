'use client'
import { useState } from 'react';
import { AcademicCapIcon, BookOpenIcon, ChartPieIcon, ChevronLeftIcon, Cog6ToothIcon, HomeIcon, SquaresPlusIcon, StarIcon, UsersIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const SidebarClient = () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);
    const [showText, setShowText] = useState<boolean>(true);
    const [isTransparent, setIsTransparent] = useState<boolean>(false);

    const toggleSidebar = () => {
        if (isExpanded) {
            // Collapsing the sidebar
            setTimeout(() => setIsTransparent(true), 0);
            setTimeout(() => setShowText(false), 300);
            setTimeout(() => setIsExpanded(false), 300);
        } else {
            setTimeout(() => setIsExpanded(true), 0);
            setTimeout(() => setShowText(true), 300);
            setTimeout(() => setIsTransparent(false), 300);
        }
    };

    return (
        <div className='flex'>
            <div className={`sidebar-background ${isExpanded ? 'sidebar-background-expanded' : 'sidebar-background-contracted'}`}>
                <aside className='sidebar-layout'>
                    <div className='h-20 flex items-center'>
                        <SidebarTitle
                        className={`sidebar-link ${isExpanded ? 'sidebar-link-expanded' : 'sidebar-link-contracted'}`}
                        icon={<SquaresPlusIcon className={`sidebar-icon ${isExpanded ? 'sidebar-icon-expanded' : 'sidebar-icon-contracted'}`} />}
                        label='Courses Tools'
                        link='/'
                        showText={showText}
                        isTransparent={isTransparent}
                    />
                    </div>

                    <SidebarDivider isExpanded={isExpanded} />
                    <SidebarEntry
                        className={`sidebar-link ${isExpanded ? 'sidebar-link-expanded' : 'sidebar-link-contracted'}`}
                        icon={<HomeIcon className={`sidebar-icon ${isExpanded ? 'sidebar-icon-expanded' : 'sidebar-icon-contracted'}`} />}
                        label='Inicio'
                        link='/'
                        showText={showText}
                        isTransparent={isTransparent}
                    />

                    <SidebarEntry
                        className={`${isExpanded ? 'sidebar-link-expanded' : 'sidebar-link-contracted'}`}
                        icon={<StarIcon className={`sidebar-icon ${isExpanded ? 'sidebar-icon-expanded' : 'sidebar-icon-contracted'}`} />}
                        label='Mis Cursos'
                        link='/herramientas/mis-cursos'
                        showText={showText}
                        isTransparent={isTransparent}
                    />

                    <SidebarEntry
                        className={`${isExpanded ? 'sidebar-link-expanded' : 'sidebar-link-contracted'}`}
                        icon={<UsersIcon className={`sidebar-icon ${isExpanded ? 'sidebar-icon-expanded' : 'sidebar-icon-contracted'}`} />}
                        label='Docentes'
                        link='/herramientas/docentes'
                        showText={showText}
                        isTransparent={isTransparent}
                    />

                     <SidebarEntry
                        className={`${isExpanded ? 'sidebar-link-expanded' : 'sidebar-link-contracted'}`}
                        icon={<BookOpenIcon className={`sidebar-icon ${isExpanded ? 'sidebar-icon-expanded' : 'sidebar-icon-contracted'}`} />}
                        label='Tesis'
                        link='/herramientas/tesis'
                        showText={showText}
                        isTransparent={isTransparent}
                    />

                    <SidebarEntry
                        className={`${isExpanded ? 'sidebar-link-expanded' : 'sidebar-link-contracted'}`}
                        icon={<AcademicCapIcon className={`sidebar-icon ${isExpanded ? 'sidebar-icon-expanded' : 'sidebar-icon-contracted'}`} />}
                        label='Cursos'
                        link='/herramientas/cursos'
                        showText={showText}
                        isTransparent={isTransparent}
                    />

                    <SidebarEntry
                        className={`${isExpanded ? 'sidebar-link-expanded' : 'sidebar-link-contracted'}`}
                        icon={<ChartPieIcon className={`sidebar-icon ${isExpanded ? 'sidebar-icon-expanded' : 'sidebar-icon-contracted'}`} />}
                        label='Reportes'
                        link='/herramientas/reportes/cursos'
                        showText={showText}
                        isTransparent={isTransparent}
                    />

                    <SidebarEntry
                        className={`${isExpanded ? 'sidebar-link-expanded' : 'sidebar-link-contracted'}`}
                        icon={<Cog6ToothIcon className={`sidebar-icon ${isExpanded ? 'sidebar-icon-expanded' : 'sidebar-icon-contracted'}`} />}
                        label='Administrador'
                        link='/'
                        showText={showText}
                        isTransparent={isTransparent}
                    />

                    <SidebarDivider isExpanded={isExpanded} />

                    <ToggleButton
                        className={`${isExpanded ? 'sidebar-link-expanded' : 'sidebar-link-contracted'}`}
                        isExpanded={isExpanded}
                        showText={showText}
                        isTransparent={isTransparent}
                        handleToggle={() => toggleSidebar()}
                    />
                </aside>
            </div>
        </div>
    );
};

export default SidebarClient;

const SidebarTitle = ({
    className,
    icon,
    label,
    link,
    showText,
    isTransparent,
}: {
    className: string,
    icon: React.ReactNode,
    label: string,
    link: string,
    showText: boolean,
    isTransparent: boolean,
}) => {
    return (
        <Link href={link} className={`${className} sidebar-link group`}>
            {icon}
            <div className={`sidebar-text-container-lg ${isTransparent ? 'text-more-light/0' : 'text-more-light'} ${showText ? 'w-44' : 'w-0'}`}>
                {showText && <h2>{label}</h2>}
            </div>
            {!showText && <div className='sidebar-tooltip'>{label}</div>}
        </Link>
    );
};

const SidebarEntry = ({
    className,
    icon,
    label,
    link,
    showText,
    isTransparent,
}: {
    className: string,
    icon: React.ReactNode,
    label: string,
    link: string,
    showText: boolean,
    isTransparent: boolean,
}) => {
    return (
        <Link href={link} className={`${className} sidebar-link group`}>
            {icon}
            <div className={`sidebar-text-container ${isTransparent ? 'text-more-light/0' : 'text-more-light'} ${showText ? 'w-44' : 'w-0'}`}>
                {showText && <h2>{label}</h2>}
            </div>
            {!showText && <div className='sidebar-tooltip'>{label}</div>}
        </Link>
    );
};

const ToggleButton = ({
    className,
    handleToggle,
    showText,
    isExpanded,
    isTransparent,
}: {
    className: string,
    handleToggle: () => void,
    showText: boolean,
    isExpanded: boolean,
    isTransparent: boolean,
}) => {
    return (
        <button className={`${className} sidebar-link group`} onClick={() => handleToggle()}>
            <ChevronLeftIcon className={`sidebar-icon ${isExpanded ? 'sidebar-icon-expanded rotate-0' : 'sidebar-icon-contracted -rotate-180'}`} />
            <div className={`sidebar-text-container ${isTransparent ? 'text-more-light/0' : 'text-more-light'} ${showText ? 'w-44' : 'w-0'}`}>
                {showText && <h2>Minimizar</h2>}
            </div>
            {!showText && <div className={`sidebar-tooltip`}>Maximizar</div>}
        </button>
    );
};

const SidebarDivider = ({
    isExpanded,
}: {
    isExpanded: boolean,
}) => {
    return <div className={`sidebar-divider ${isExpanded ? 'w-56' : 'w-10'}`}></div>;
};
