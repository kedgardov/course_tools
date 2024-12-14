'use client'
import { MaestroType } from "@/models/maestro";
import { useEffect, useState } from "react";
import Fuse from 'fuse.js';
import Link from "next/link";
import ListHeaders from "@/components/listHeaders";


const DocenteFinder = ({
    className,
    catalogoMaestros,
}:{
    className:string,
    catalogoMaestros: MaestroType[],
}) => {
    const [ currentMaestros, setCurrentMaestros ] = useState<MaestroType[]>(catalogoMaestros);
    const [ currentSearch, setCurrentSearch ] = useState<string>('');


    useEffect(() => {
        if(currentSearch !== ''){
            const fuse = new Fuse(catalogoMaestros, {
                keys: ['label'],
                threshold: 0.3,
            });

            const result = fuse.search(currentSearch);
            const newCurrentMaestros = result.map((r) => r.item);
            setCurrentMaestros(newCurrentMaestros);
        } else {
            setCurrentMaestros(catalogoMaestros);
        }
    }, [currentSearch, catalogoMaestros]);

    return (
        <section className={`${className}`}>
            <div>
            <h1 className='title-1'>Buscador de Docentes</h1>
            <input
                id='buscador-de-docentes'
                aria-label='buscador-de-docentes'
                className='p-1 m-2 border w-1/2 rounded'
                value={currentSearch}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCurrentSearch(event.target.value)}
                placeholder='Escriba el nombre del docente que desea buscar'
            />
            </div>
            <ul className='m-2'>
            <ListHeaders
                className=''
                headersList={['Nombre del Docente','Acciones']}
                widthList={['w-[80%]','w-[20%]']}
            />
            {currentMaestros.map((maestro) => (
                <li key={maestro.id} className='p-2 divider-dark flex items-center'>
                    <span className='m-2 w-[80%]'>{maestro.label}</span>
                    <Link className='text-blue-400 underline w-[20%] hover:text-blue-600' href={`/herramientas/docentes/${maestro.id}/actividad-academica`}>Ver Docente</Link>
                </li>
            ))}
            </ul>
        </section>
    );
};
export default DocenteFinder;
