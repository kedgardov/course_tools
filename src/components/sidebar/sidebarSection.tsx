'use client'

import { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';

interface SidebarSectionEntry {
    id: number,
    title: string,
    link: string
};

const SidebarSection = ({ label, name, entries }: { label:string, name:string, entries: SidebarSectionEntry[] }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);


  //const { id } = router.query;

  const toggleAccordion = () => {
    setIsVisible(prevState => !prevState);
  };

  return (
    <section
      className='sidebar-section'
      aria-labelledby={name}
    >
      <button
        className='text-left flex'
        onClick={toggleAccordion}
      >
        {label}
      <ChevronRightIcon className={`size-6 ml-auto transition-transform duration-500 ease-in-out ${isVisible? 'rotate-90':''}`}/>
      </button>
      <div className={`sidebar-accordion-section flex flex-col shadow-xl ${isVisible ? 'max-h-screen mt-2' : 'max-h-0'}`}>
        {entries.map((entry) => (
          <Link key={entry.id} href={entry.link} className='sidebar-entry'>{entry.title}</Link>
        ))}
    </div>
    </section>
  );
};

export default SidebarSection;
