'use client'

import { ObjetivoDataType, ObjetivoType } from '@models/objetivo';
import { Reorder } from 'framer-motion';
import { useState } from 'react';
import Objetivo from './objetivo';
import ListHeaders from '@/components/listHeaders';
import WidthType from '@/models/width';
import NewObjetivo from './newObjetivo';
import PrimaryButton from '@/components/primaryButton';

const ObjetivosEspecificos = ({
    objetivosEspecificos,
    className,
    idCurso,
}:{
    objetivosEspecificos: ObjetivoType[]
    className: string,
    idCurso: number,
}) => {
    const widths: [WidthType, WidthType, WidthType] = ['w-[10%]','w-[70%]','w-[20%]'];

    const [addingMode, setAddingMode] = useState<boolean>(false);
    const [currentObjetivos, setCurrentObjetivos] = useState<ObjetivoType[]>(objetivosEspecificos);
    const [order, setOrder] = useState(objetivosEspecificos.map(obj => obj.id));


    const onReorder = (newOrder: number[]) => {
        setOrder(newOrder);
        const updatedObjetivos = newOrder.map((id, index) => {
            const objetivo = currentObjetivos.find(obj => obj.id === id);
            return objetivo ? { ...objetivo, numero: index + 1 } : undefined;
        }).filter((obj): obj is ObjetivoType => obj !== undefined);
       setCurrentObjetivos(updatedObjetivos);
    };

    const handleAdd = ( data: ObjetivoDataType ) => {
        const newObjetivo: ObjetivoType = {
            id:0,
            numero: order.length+1,
            id_curso: idCurso,
            objetivo: data.objetivo,
            tipo:'especifico',
        };
        setCurrentObjetivos(prev => [...prev, newObjetivo]);
        setOrder(prev => [...prev, newObjetivo.id]);
    };

    const handleDeleteObjetivo = (id: number) => {
        const newOrder = order.filter(order_id => order_id !== id);

        const updatedObjetivos = newOrder.map((id, index) => {
            const objetivo = currentObjetivos.find(objetivo => objetivo.id === id);
            return objetivo ? { ...objetivo, numero: index + 1 } : undefined;
        }).filter((obj): obj is ObjetivoType => obj !== undefined);

        setOrder(newOrder);
        setCurrentObjetivos(updatedObjetivos);
};


    return (
        <section className={`${className}`}>
            <h2 className='title-2'>Objetivos Especificos</h2>
            <ul>
                <ListHeaders
                    className='divider-dark'
                    headersList={['Numero', 'Descripcion del Objetivo','Acciones']}
                    widthList={widths}
                />
            </ul>
            <Reorder.Group
                className = ''
                axis='y' values={order}
                onReorder={onReorder}
            >
                {order.map((id) => {
                    const objetivo = currentObjetivos.find(obj => obj.id === id);
                    return (
                        objetivo && (
                            <Reorder.Item key={objetivo.id} value={objetivo.id} className=''>
                                <Objetivo
                                    className='divider-dark p-1'
                                    widthList={widths}
                                    objetivo={objetivo}
                                    handleDelete={handleDeleteObjetivo}
                                />
                            </Reorder.Item>
                    ));
                })}
            </Reorder.Group>
            {addingMode? (
                <NewObjetivo
                    className='divider-dark p-1'
                    newNumber={order.length+1}
                    widthList={widths}
                    handleAdd={handleAdd}
                    selfDestruct={ () => setAddingMode(false) }
                />
            ):(
                <PrimaryButton className='flex ml-auto mr-4' handleAction={() => setAddingMode(true)} buttonLabel='Agregar'/>
            )}
        </section>
    );
};

export default ObjetivosEspecificos;
