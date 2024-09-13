'use client'
import { useState } from 'react';
import { AcademicCapIcon, BookOpenIcon, BuildingLibraryIcon, ChevronLeftIcon, Cog6ToothIcon, HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import CourseToolsIcon from '@/components/CourseToolsIcons';

const Transformer = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [showText, setShowText] = useState<boolean>(true);
  const [isTransparent, setIsTransparent] = useState<boolean>(false);

  // Function to scroll smoothly to a section
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };


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

         <SidebarTitle className={`sidebar-link ${isExpanded? 'sidebar-link-expanded' : 'sidebar-link-contracted'}`}
    icon={<CourseToolsIcon className={`p-2 border border-0 transition-all ease-in-out duration-500 rounded-3xl ${isExpanded? 'sidebar-icon-expanded h-14 w-14':'sidebar-icon-contracted h-12 w-12'}`}/>}
              label='Course Tools'
              link='/'
              showText={showText}
              isTransparent={isTransparent}
          />



      </div>



      <SidebarDivider isExpanded={isExpanded}/>
            <SidebarEntry className={`sidebar-link ${isExpanded? 'sidebar-link-expanded' : 'sidebar-link-contracted'}`}
    icon={<HomeIcon className={`sidebar-icon ${isExpanded? 'sidebar-icon-expanded':'sidebar-icon-contracted'}`}/>}
              label='Inicio'
              link='/'
              showText={showText}
              isTransparent={isTransparent}
          />



      <SidebarEntry className={`${isExpanded? 'sidebar-link-expanded' : 'sidebar-link-contracted'}`}
    icon={<AcademicCapIcon className={`sidebar-icon ${isExpanded? 'sidebar-icon-expanded':'sidebar-icon-contracted'}`}/>}
              label='Mis Cursos'
              link='/cursos'
              showText={showText}
              isTransparent={isTransparent}
          />
      <SidebarEntry className={`${isExpanded? 'sidebar-link-expanded' : 'sidebar-link-contracted'}`}
    icon={<BookOpenIcon className={`sidebar-icon ${isExpanded? 'sidebar-icon-expanded':'sidebar-icon-contracted'}`}/>}
              label='Repositorio de Tesis'
              link='/tesis'
              showText={showText}
              isTransparent={isTransparent}
          />

   <SidebarEntry className={`${isExpanded? 'sidebar-link-expanded' : 'sidebar-link-contracted'}`}
    icon={<BuildingLibraryIcon className={`sidebar-icon ${isExpanded? 'sidebar-icon-expanded':'sidebar-icon-contracted'}`}/>}
              label='Facultades'
              link='/'
              showText={showText}
              isTransparent={isTransparent}
          />

       <SidebarEntry className={`${isExpanded? 'sidebar-link-expanded' : 'sidebar-link-contracted'}`}
    icon={<Cog6ToothIcon className={`sidebar-icon ${isExpanded? 'sidebar-icon-expanded':'sidebar-icon-contracted'}`}/>}
              label='Administrador'
              link='/'
              showText={showText}
              isTransparent={isTransparent}
          />


     <SidebarDivider isExpanded={isExpanded}/>

      <ToggleButton className={`${isExpanded? 'sidebar-link-expanded' : 'sidebar-link-contracted'}`}
              isExpanded={isExpanded}
              showText={showText}
              isTransparent={isTransparent}
              handleToggle={() => toggleSidebar()}
          />

          </aside>
      </div>




      <div className='bg-red-300/50 flex-grow'>
        {/* Updated Links with onClick for smooth scrolling */}
        <button className='p-1 border m-1' onClick={() => scrollToSection('section-1')}>Go Section 1</button>
        <button className='p-1 border m-1' onClick={() => scrollToSection('section-2')}>Go Section 2</button>
        <button className='p-1 border m-1' onClick={() => scrollToSection('section-3')}>Go Section 3</button>

        {/* Sections */}
        <div className='h-[50rem] bg-blue-300' id='section-1'>Section 1</div>
        <div className='h-[50rem] bg-red-300' id='section-2'>Section 2</div>
        <div className='h-[50rem] bg-green-300' id='section-3'>Section 3</div>
      </div>



    </div>
  );
};

export default Transformer;

const SidebarTitle = ({
  className,
  icon,
  label,
  link,
  showText,
  isTransparent,
}:{
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
      <div className={`sidebar-text-container-lg ${isTransparent? 'text-more-light/0' : 'text-more-light'} ${showText? 'w-54' : 'w-0'}`}>
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
}:{
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
      <div className={`sidebar-text-container ${isTransparent? 'text-more-light/0' : 'text-more-light'} ${showText? 'w-58' : 'w-0'}`}>
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
}:{
  className: string,
  handleToggle: () => void,
  showText: boolean,
  isExpanded: boolean,
  isTransparent: boolean,
}) => {
  return (
    <button className={`${className} sidebar-link group`} onClick={() => handleToggle()}>
      <ChevronLeftIcon className={`sidebar-icon ${isExpanded? 'sidebar-icon-expanded rotate-0':'sidebar-icon-contracted -rotate-180'}`}/>
      <div className={`sidebar-text-container ${isTransparent? 'text-more-light/0' : 'text-more-light'} ${showText? 'w-58' : 'w-0'}`}>
    {showText && <h2>Minimizar</h2>}
    </div>
      {!showText && <div className={`sidebar-tooltip`}>Maximizar</div>}
    </button>
  );
};


const SidebarDivider = ({
  isExpanded,
}:{
  isExpanded: boolean,
}) => {
  return <div className={`sidebar-divider ${isExpanded? 'w-76' : 'w-16'}`}></div>;
};
