'use client'

import WidthType from '@/models/width';
import Tema from './tema';

import { TemaDataType, TemaType } from '@models/tema';
import { Reorder } from 'framer-motion';
import { useState } from 'react';
import ListHeaders from '@/components/listHeaders';
import PrimaryButton from '@/components/primaryButton';
import NewTema from './newTema';
import Link from 'next/link';
import { ArrowTurnLeftUpIcon } from '@heroicons/react/24/outline';

const ListaTemas = ({
    className,
    temas,
    idCurso,
    idUnidad,
}:{
    className: string,
    temas: TemaType[],
    idCurso: number,
    idUnidad: number,
}) => {

    const widths: [WidthType, WidthType, WidthType] = ['w-[8%]', 'w-[62%]', 'w-[30%]'];

    const [currentTemas, setCurrentTemas] = useState<TemaType[]>(temas);
    const [order, setOrder] = useState(temas.map(t => t.id));
    const [addingMode, setAddingMode] = useState<boolean>(false);


    const onReorder = (newOrder: number[]) => {
        setOrder(newOrder);
        const updatedTemas = newOrder.map((id, index) => {
            const tema = currentTemas.find(t => t.id === id);
            return tema ? { ...tema, numero: index + 1 } : undefined;
        }).filter((obj): obj is TemaType => obj !== undefined);
       setCurrentTemas(updatedTemas);
    };

    const handleAddTema = (data: TemaDataType) => {
        const newTema: TemaType = {
            id:0,
            numero: order.length+1,
            id_unidad: idUnidad,
            titulo: data.titulo,
        };
        setCurrentTemas(prev => [...prev, newTema]);
        setOrder(prev => [...prev, newTema.id]);
    };

    const handleDeleteTema = (id: number) => {
        const newOrder = order.filter(order_id => order_id !== id);

        const updatedTemas = newOrder.map((id, index) => {
            const tema = currentTemas.find(tema => tema.id === id);
            return tema ? { ...tema, numero: index + 1 } : undefined;
        }).filter((t): t is TemaType => t !== undefined);

        setOrder(newOrder);
        setCurrentTemas(updatedTemas);
};


    return (
        <section className={`${className}`}>
            <div className='flex'>
                <Link className='button-3 flex w-fit' href={`/cursos/${idCurso}/unidades`}>
                    <ArrowTurnLeftUpIcon className='size-6'/>
                    Regresar
                </Link>
                <h2 className='title-2'>Temas de la Unidad</h2>
            </div>
            <ListHeaders
                className=''
                headersList={['Numero', 'Descripcion del Tema', 'Acciones']}
                widthList={widths}
            />
            <Reorder.Group
                className = ''
                axis='y' values={order}
                onReorder={onReorder}
            >
                {order.map((id) => {
                    const tema = currentTemas.find(t => t.id === id);
                    return ( tema && (
                        <Reorder.Item
                            key={tema.id}
                            value={tema.id}
                            className=''
                        >
                        <Tema
                            className='divider-dark p-1'
                            tema={tema}
                            idUnidad={idUnidad}
                            handleDeleteTema={handleDeleteTema}
                            widthList={widths}
                        />
                        </Reorder.Item>
                    ));
                })}
            </Reorder.Group>
            {addingMode? (
                <NewTema
                    className='divider-dark p-1'
                    newNumber={order.length+1}
                    idUnidad={idUnidad}
                    handleAddTema={handleAddTema}
                    selfDestruct={ () => setAddingMode(false) }
                    widthList={widths}
                />
            ):(
                <PrimaryButton className='flex ml-auto mr-4' handleAction={ () => setAddingMode(true) } buttonLabel='Agregar' />
            )}
        </section>
    );
};

export default ListaTemas;