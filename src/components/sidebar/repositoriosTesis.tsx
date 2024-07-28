'use client'
import { useState } from 'react';

const RepositoriosTesis = ({ title, id, name }: { title: string, id: string, name: string }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleAccordion = () => {
    setIsVisible(prevState => !prevState);
  };

  return (
    <section
      className='sidebar-section'
      id={id}
      aria-labelledby={name}
    >
      <button
        className='text-left'
        onClick={toggleAccordion}
      >
        {title}
      </button>
      <div className={`sidebar-accordion-section ${isVisible ? 'max-h-screen mt-2' : 'max-h-0'}`}>
        <p className='sidebar-entry'>Ver Tesis</p>
        <p className='sidebar-entry'>Agregar Tesis</p>
        <p className='sidebar-entry'>Reportes de Tesis</p>
      </div>
    </section>
  );
};

export default RepositoriosTesis;
