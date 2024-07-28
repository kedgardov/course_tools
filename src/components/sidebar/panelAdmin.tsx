'use client'
import { useState } from 'react';

const PanelAdmin = ({ title, id, name }: { title: string, id: string, name: string }) => {
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
          <p className='sidebar-entry'>Crear Curso</p>
          <p className='sidebar-entry'>Editar Curso</p>
          <p className='sidebar-entry'>Habilitar Actualizaciones</p>
      </div>
    </section>
  );
};

export default PanelAdmin;
