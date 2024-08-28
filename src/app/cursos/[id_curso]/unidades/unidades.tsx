'use client'
import NewUnidad from './newUnidad';
import Unidad from './Unidad';

import { UnidadMiniType, UnidadTituloType } from '@models/unidad';
import { Reorder } from 'framer-motion';
import { useState } from 'react';
import WidthType from '@models/width';
import ListHeaders from '@/components/listHeaders';
import PrimaryButton from '@/components/primaryButton';

const Unidades = ({
    className,
    unidadesPool,
    idCurso,
}:{
    className: string,
    unidadesPool: UnidadMiniType[],
    idCurso: number,
}) => {
    const widths: [WidthType, WidthType, WidthType] = ['w-[10%]', 'w-[60%]', 'w-[30%]'];

    const [addingMode, setAddingMode] = useState<boolean>(false);
    const [currentUnidades, setCurrentUnidades] = useState<UnidadMiniType[]>(unidadesPool);
    const [order, setOrder] = useState(unidadesPool.map(u => u.id));


    const onReorder = (newOrder: number[]) => {
        setOrder(newOrder);
        const updatedObjetivos = newOrder.map((id, index) => {
            const objetivo = currentUnidades.find(obj => obj.id === id);
            return objetivo ? { ...objetivo, numero: index + 1 } : undefined;
        }).filter((obj): obj is UnidadMiniType => obj !== undefined);
       setCurrentUnidades(updatedObjetivos);
    };

    const handleAddUnidad = (unidadTitulo: UnidadTituloType) => {
        const newUnidad: UnidadMiniType = {
            id:0,
            numero: order.length+1,
            id_curso: idCurso,
            titulo: unidadTitulo.titulo,
        };
        setCurrentUnidades(prev => [...prev, newUnidad]);
        setOrder(prev => [...prev, newUnidad.id]);
    };

    const handleDeleteUnidad = (id: number) => {
        const newOrder = order.filter(order_id => order_id !== id);

        const updatedObjetivos = newOrder.map((id, index) => {
            const unidad = currentUnidades.find(unidad => unidad.id === id);
            return unidad ? { ...unidad, numero: index + 1 } : undefined;
        }).filter((u): u is UnidadMiniType => u !== undefined);

        setOrder(newOrder);
        setCurrentUnidades(updatedObjetivos);
};


    return (
        <section className={`${className}`}>
            <h2 className='title-2'>Unidades del curso</h2>
            <ul>
                <ListHeaders
                    className=''
                    headersList={['Numero', 'Unidad', 'Acciones']}
                    widthList={widths}
                />
            </ul>
            <Reorder.Group
                className = ''
                axis='y' values={order}
                onReorder={onReorder}
            >
                {order.map((id) => {
                    const unidad = currentUnidades.find(u => u.id === id);
                    return ( unidad && (
                        <Reorder.Item
                            key={unidad.id}
                            value={unidad.id}
                            className=''
                        >
                        <Unidad
                            className='divider-dark p-1'
                            unidad={unidad}
                            idCurso={idCurso}
                            handleDeleteUnidad={handleDeleteUnidad}
                            widthList={widths}
                        />
                        </Reorder.Item>
                    ));
                })}
            </Reorder.Group>
            {addingMode? (
                <NewUnidad
                    className='divider-dark p-1'
                    nextNumber={order.length+1}
                    idCurso={idCurso}
                    handleAddUnidad={handleAddUnidad}
                    selfDestruct={() => setAddingMode(false)}
                    widthList={widths}
                />
            ):(
                <PrimaryButton className='flex ml-auto mr-4' handleAction={() => setAddingMode(true)} buttonLabel='Agregar'/>
            )}

        </section>
    );
};

export default Unidades;
