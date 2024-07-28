'use client'
import { useState } from 'react';
import { Curso } from '../../models/curso';

const MisCursos = ({ title, id, name, cursos }: { title: string, id: string, name: string, cursos:Curso[] }) => {
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
        {cursos.map((curso) => (
          <p key={curso.clave} className='sidebar-entry'>{curso.nombre}</p>
        ))}
    </div>
    </section>
  );
};

export default MisCursos;
