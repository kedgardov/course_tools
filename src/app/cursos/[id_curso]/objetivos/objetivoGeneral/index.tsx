'use client'

import { ObjetivoType } from '@models/objetivo';
import Objetivo from '../objetivosEspecificos/objetivo';
import ListHeaders from '@/components/listHeaders';
import WidthType from '@/models/width';
import { useState } from 'react';

const ObjetivoGeneral = ({
    objetivoGeneral,
    className,
    idCurso,
}:{
    objetivoGeneral: ObjetivoType
    className: string,
    idCurso: number,
}) => {
    const widths: [WidthType, WidthType, WidthType] = ['w-[10%]','w-[70%]','w-[20%]'];
    const [currentObjetivo, setCurrentObjetivo] = useState<ObjetivoType>(objetivoGeneral);

    const handleDelete = (id: number) => {
        const newObjetivo: ObjetivoType = {
            id: id,
            id_curso: idCurso,
            tipo: 'general',
            numero: 0,
            objetivo: '',
        }; 
        setCurrentObjetivo(newObjetivo);
    };


    return (
        <section className={`${className}`}>
            <h2 className='title-2'>Objetivo General</h2>
            <ul>
                <ListHeaders
                    className='divider-dark'
                    headersList={['Numero', 'Descripcion del Objetivo','Acciones']}
                    widthList={widths}
                />
                <li>
                    <Objetivo
                        className='divider-dark p-1'
                        widthList={widths}
                        objetivo={currentObjetivo}
                        handleDelete={handleDelete}
                    />
                </li>
            </ul>
        </section>
    );
};

export default ObjetivoGeneral;
