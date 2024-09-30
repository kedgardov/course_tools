'use client'

import WidthType from '@/models/width';
import ListHeaders from '@/components/listHeaders';
import Link from 'next/link';
import { CursoMiniType } from '@/models/curso';
import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

const CursosFinder = ({
    className,
    catalogoCursos,
}:{
    className: string,
    catalogoCursos: CursoMiniType[],
}) => {
    const widths: [WidthType, WidthType, WidthType] = ['w-[10%]', 'w-[60%]','w-[30%]'];

    const [currentCursos, setCurrentCursos] = useState<CursoMiniType[]>(catalogoCursos);
    const [ currentSearch, setCurrentSearch ] = useState<string>('');


    useEffect(() => {
        if(currentSearch !== ''){
            const fuse = new Fuse(catalogoCursos, {
                keys: ['nombre','clave'],
                threshold: 0.3,
            });

            const result = fuse.search(currentSearch);
            const newCurrentCursos = result.map((r) => r.item);
            setCurrentCursos(newCurrentCursos);
        } else {
            setCurrentCursos(catalogoCursos);
        }
    }, [currentSearch, catalogoCursos]);


    return (
        <section className={`${className}}`}>
            <h1 className='title-1'>Buscador de Cursos</h1>
            <input
                id='buscador-de-cursos'
                aria-label='buscador-de-cursos'
                className='p-1 m-2 border w-1/2 rounded'
                value={currentSearch}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCurrentSearch(event.target.value)}
                placeholder='Escriba el nombre o clave del curso que desea buscar'
            />
            <ul>
                <ListHeaders
                    className=''
                    headersList={['Clave', 'Nombre del Curso', 'Acciones']}
                    widthList={widths}
                />
                {currentCursos.map((curso) => (
                    <li key={curso.id} className='flex divider-dark p-2'>
                        <div className={widths[0]}>{curso.clave}</div>
                        <div className={widths[1]}>{curso.nombre}</div>
                        <div className={widths[2]}><Link href={`/herramientas/cursos/${curso.id}/general`}>Ver Curso</Link></div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default CursosFinder;
