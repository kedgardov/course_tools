'use client'

import { TesisFinderType } from "@/models/tesis";
import Fuse from 'fuse.js';
import { useEffect, useState } from "react";
import Link from "next/link";
import ListHeaders from "@/components/listHeaders";
import { Coordinacion2Type } from "@/models/coordinacion2";
import WidthType from "@/models/width";

const TesisFinder = ({
    className,
    catalogoTesis,
    catalogoCoordinaciones,
}:{
    className: string,
    catalogoTesis: TesisFinderType[],
    catalogoCoordinaciones: Coordinacion2Type[],
}) => {

    const widths: WidthType[] = ['w-[70%]','w-[20%]','w-[10%]'];

    const [ currentTesis, setCurrentTesis ] = useState<TesisFinderType[]>(catalogoTesis);
    const [ currentSearch, setCurrentSearch ] = useState<string>('');

    useEffect(() => {
        if ( currentSearch !== '' ){
            const fuse = new Fuse(catalogoTesis, {
                keys: ['titulo','resumen'], // Search by title and summary
                threshold: 0.5,
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
                <h1 className='title-2'>Buscador de Tesis</h1>
                <div className='flex items-center mx-2'>
                <input
                    id='buscador-de-tesis'
                    aria-label='buscador-de-tesis'
                    className='p-1 m-2 border w-[80%] rounded'
                    value={currentSearch}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCurrentSearch(event.target.value)}
                    placeholder='Escriba el título o resumen de la tesis que desea buscar'
                />
                <span className = 'text-less-dark w-[20%] text-right'>{`Mostrando ${currentTesis.length} tesis`}</span>
                </div>
            </div>
            <ul className='m-2'>
                <ListHeaders
                    className=''
                    headersList={['Titulo de la Tesis','Coordinacion','Acciones']}
                    widthList={widths}
                />
                {currentTesis.map((tesis) => (
                    <li key={tesis.id} className='p-2 divider-dark flex items-center'>
                        <div className={`${widths[0]} mx-2`}>{tesis.titulo}</div>
                        <div className={`${widths[1]} mx-2`}>{catalogoCoordinaciones.find((c) => c.id === tesis.id_coordinacion_2)?.coordinacion_2 || ''}</div>
                        <div className={`${widths[2]} mx-2`}><Link className='text-blue-400 underline' href={`/herramientas/tesis/${tesis.id}`}>Ver Tesis</Link></div>
                    </li>
                ))}
            </ul>
        </section>
    );
};
export default TesisFinder;
