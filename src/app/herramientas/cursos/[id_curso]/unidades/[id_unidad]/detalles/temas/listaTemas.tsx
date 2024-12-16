// components/ListaTemas.tsx
'use client';

import WidthType from '@/models/width';
import ReorderTemaItem from './ReorderTemaItem'; // Import the new ReorderTemaItem component
import { TemaDataType, TemaType } from '@models/tema';
import { Reorder } from 'framer-motion';
import { useState } from 'react';
import ListHeaders from '@/components/listHeaders';
import PrimaryButton from '@/components/primaryButton';
import NewTema from './newTema';
import Link from 'next/link';
import { ArrowTurnLeftUpIcon } from '@heroicons/react/24/outline';
import { UnidadType } from '@/models/unidad';
import { insertTema } from '@/utils/temas/insertTema';
import Alert from '@/components/alert';
import Tema from './tema';
import TemasUnidad from '../../temas/page';

const ListaTemas = ({
    className,
    temas,
    idCurso,
    idUnidad,
    unidad,
    token,
}: {
    className: string;
    temas: TemaType[];
    idCurso: number;
    idUnidad: number;
    unidad: UnidadType;
    token: string;
}) => {
    const widths: [WidthType, WidthType, WidthType] = ['w-[8%]', 'w-[62%]', 'w-[30%]'];

    const [currentTemas, setCurrentTemas] = useState<TemaType[]>(temas);
    const [order, setOrder] = useState(temas.map(t => t.id));
    const [addingMode, setAddingMode] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isReordering, setIsReordering] = useState<boolean>(false); // New state
    const [ lastTemas, setLastTemas ] = useState<TemaType[]>(temas);

    const onReorder = (newOrder: number[]) => {
        setOrder(newOrder);
        const updatedTemas = newOrder.map((id, index) => {
            const tema = currentTemas.find(t => t.id === id);
            return tema ? { ...tema, numero: index + 1 } : undefined;
        }).filter((obj): obj is TemaType => obj !== undefined);
        setCurrentTemas(updatedTemas);
    };

    const handleAddTema = async (data: TemaDataType) => {
        setIsLoading(true);
        const newTema: TemaType = {
            id: 0,
            numero: order.length + 1,
            id_unidad: idUnidad,
            tema: data.tema,
        };
        const response = await insertTema(idCurso, newTema, token);
        if (response.success) {
            setCurrentTemas(prev => [...prev, { ...newTema, id: response.id }]);
            setOrder(prev => [...prev, response.id]);
            setAddingMode(false);
        } else {
            setError(response.message);
        }
        setIsLoading(false);
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


    const handleStartReordering = () => {
        setLastTemas(currentTemas);
        setIsReordering(true);
    }

    const handleCancelReordering = () => {
        setCurrentTemas(lastTemas);
        setOrder(lastTemas.map((t) => t.id));
        setIsReordering(false);
    }

    const handleGuardarOrden = async () => {
        setLastTemas(currentTemas);
        setIsReordering(false);
    }

    return (
        <section className={`${className}`}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="title-2">Temas de la Unidad</h2>

            </div>
            <ListHeaders
                className=""
                headersList={['Numero', 'Descripcion del Tema', 'Acciones']}
                widthList={widths}
            />
            {isReordering ? (
                <Reorder.Group
                    className=""
                    axis="y"
                    values={order}
                    onReorder={onReorder}
                >
                    {order.map((id) => {
                        const tema = currentTemas.find(t => t.id === id);
                        return tema && (
                            <ReorderTemaItem
                                key={tema.id}
                                tema={tema}
                                idCurso={idCurso}
                                idUnidad={idUnidad}
                                handleDeleteTema={handleDeleteTema}
                                widthList={widths}
                                token={token}
                            />
                        );
                    })}
                </Reorder.Group>
            ) : (
                <ul className="list-none">
                    {order.map((id) => {
                        const tema = currentTemas.find(t => t.id === id);
                        return tema && (
                            <li key={tema.id} className="divider-dark p-1">
                                <Tema
                                    className="flex items-center"
                                    tema={tema}
                                    idCurso={idCurso}
                                    idUnidad={idUnidad}
                                    handleDeleteTema={handleDeleteTema}
                                    widthList={widths}
                                    token={token}
                                />
                            </li>
                        );
                    })}
                </ul>
            )}



            {addingMode ? (
                <NewTema
                    className="divider-dark p-1"
                    newNumber={order.length + 1}
                    idUnidad={idUnidad}
                    handleAddTema={handleAddTema}
                    selfDestruct={() => setAddingMode(false)}
                    widthList={widths}
                />
            ) : (

                <div className='flex'>
                    { isReordering? (
                        <div className='space-x-2'>
                            <button className='button-1-secondary' onClick={() => handleGuardarOrden()}>Guardar</button>
                            <button className='button-1-tertiary' onClick={() => handleCancelReordering()}>Cancelar</button>
                        </div>
                    ):(
                        <>
                            <PrimaryButton
                                className='m-4'
                                handleAction={()=> handleStartReordering()}
                                buttonLabel='Reordenar'
                            />
                            <PrimaryButton
                                className='m-4 ml-auto'
                                handleAction={()=> setAddingMode(true)}
                                buttonLabel='Agregar'
                            />
                        </>
                    )}
                </div>
            )}



            <Alert error={error} setError={setError} />
        </section>
    );
};

export default ListaTemas;
