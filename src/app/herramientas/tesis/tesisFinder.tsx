'use client'

import { TesisFinderType } from "@/models/tesis";
import Fuse from 'fuse.js';
import { useEffect, useState } from "react";
import Link from "next/link";

const TesisFinder = ({
    className,
    catalogoTesis,
}:{
    className: string,
    catalogoTesis: TesisFinderType[],
}) => {
    const [ currentTesis, setCurrentTesis ] = useState<TesisFinderType[]>(catalogoTesis);
    const [ currentSearch, setCurrentSearch ] = useState<string>('');

    useEffect(() => {
        if ( currentSearch !== '' ){
            const fuse = new Fuse(catalogoTesis, {
                keys: ['titulo','resumen'], // Search by title and summary
                threshold: 0.3,
            });
            const result = fuse.search(currentSearch);
            const newCurrentTesis = result.map((r) => r.item);
            setCurrentTesis(newCurrentTesis);
        } else {
            setCurrentTesis(catalogoTesis);
        }
    }, [currentSearch, catalogoTesis]);

    return (
        <section className={`${className}`}>
            <div>
                <h1 className='title-1'>Buscador de Tesis</h1>
                <input
                    id='buscador-de-tesis'
                    aria-label='buscador-de-tesis'
                    className='p-1 m-2 border w-1/2 rounded'
                    value={currentSearch}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCurrentSearch(event.target.value)}
                    placeholder='Escriba el título o resumen de la tesis que desea buscar'
                />
            </div>
            <ul className='m-2'>
                {currentTesis.map((tesis) => (
                    <li key={tesis.id} className='p-2 divider-dark flex items-center'>
                        <div className='mx-2 w-[10%]'><Link className='text-blue-400 underline' href={`/herramientas/tesis/${tesis.id}`}>Ver Tesis</Link></div>
                        <div className='mx-2 w-[90%]'>{tesis.titulo}</div>
                    </li>
                ))}
            </ul>
        </section>
    );
};
export default TesisFinder;
