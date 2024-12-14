'use client'
import NewUnidad from './newUnidad';
import Unidad from './Unidad';

import { UnidadMiniType, UnidadTituloType } from '@models/unidad';
import { Reorder, useDragControls } from 'framer-motion';
import { useState } from 'react';
import WidthType from '@models/width';
import ListHeaders from '@/components/listHeaders';
import PrimaryButton from '@/components/primaryButton';
import { insertUnidad } from '@/utils/unidades/insertUnidad';
import Alert from '@/components/alert';
import GuardarButton from '@/components/guardarButton';
import SecondarySubmit from '@/components/secondarySubmit';

// Define the ReorderUnidadItem component
const ReorderUnidadItem = ({
    unidad,
    idCurso,
    handleDeleteUnidad,
    widthList,
    token,
}: {
    unidad: UnidadMiniType;
    idCurso: number;
    handleDeleteUnidad: (id: number) => void;
    widthList: [WidthType, WidthType, WidthType];
    token: string;
}) => {
    const dragControls = useDragControls(); // Initialize unique drag controls for each item

    return (
        <Reorder.Item
            key={unidad.id}
            value={unidad.id}
            dragListener={false} // Disable default drag listener
            dragControls={dragControls} // Attach unique drag controls
            className=""
        >
            <Unidad
                className="divider-dark p-1 h-fit"
                unidad={unidad}
                idCurso={idCurso}
                handleDeleteUnidad={handleDeleteUnidad}
                widthList={widthList}
                token={token}
                dragControls={dragControls} // Pass drag controls to Unidad
            />
        </Reorder.Item>
    );
};

const Unidades = ({
    className,
    unidades,
    idCurso,
    token,
}: {
    className: string,
    unidades: UnidadMiniType[],
    idCurso: number,
    token: string
}) => {
    const widths: [WidthType, WidthType, WidthType] = ['w-[8%]', 'w-[62%]', 'w-[30%]'];

    const [addingMode, setAddingMode] = useState<boolean>(false);
    const [isReordering, setIsReordering] = useState<boolean>(false); // New state
    const [currentUnidades, setCurrentUnidades] = useState<UnidadMiniType[]>(unidades);
    const [lastUnidades, setLastUnidades] = useState<UnidadMiniType[]>(unidades);
    const [order, setOrder] = useState(unidades.map(u => u.id));
    const [error, setError] = useState<string | null>(null);

    const onReorder = (newOrder: number[]) => {
        setOrder(newOrder);
        const updatedUnidades = newOrder.map((id, index) => {
            const unidad = currentUnidades.find(obj => obj.id === id);
            return unidad ? { ...unidad, numero: index + 1 } : undefined;
        }).filter((obj): obj is UnidadMiniType => obj !== undefined);
        setCurrentUnidades(updatedUnidades);
    };

    const handleAddUnidad = async (unidadTitulo: UnidadTituloType) => {
        const newUnidad: UnidadMiniType = {
            id: 0,
            numero: order.length + 1,
            id_curso: idCurso,
            unidad: unidadTitulo.unidad,
        };
        const response = await insertUnidad(newUnidad, token);
        if (response.success) {
            setCurrentUnidades(prev => [...prev, { ...newUnidad, id: response.id }]);
            setOrder(prev => [...prev, response.id]);
        } else {
            setError(response.message);
        }
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

    const handleStartReordering = () => {
        setLastUnidades(currentUnidades);
        setIsReordering(true);
    }

    const handleCancelReordering = () => {
        setCurrentUnidades(lastUnidades);
        setOrder(lastUnidades.map((u) => u.id));
        setIsReordering(false);
    }

    const handleGuardarOrden = async () => {
        /*call reordering api*/
        setLastUnidades(currentUnidades);
        setIsReordering(false);
    }


    return (
        <section className={`${className}`}>
            <h2 className="title-2">Unidades del curso</h2>
            <ul>
                <ListHeaders
                    className=""
                    headersList={['Numero', 'Unidad', 'Acciones']}
                    widthList={widths}
                />
            </ul>
            {isReordering ? (
                <Reorder.Group
                    className=""
                    axis="y"
                    values={order}
                    onReorder={onReorder}
                >
                    {order.map((id) => {
                        const unidad = currentUnidades.find(u => u.id === id);
                        return unidad && (
                            <ReorderUnidadItem
                                key={unidad.id}
                                unidad={unidad}
                                idCurso={idCurso}
                                handleDeleteUnidad={handleDeleteUnidad}
                                widthList={widths}
                                token={token}
                            />
                        );
                    })}
                </Reorder.Group>
            ) : (
                <ul className="list-none">
                    {order.map((id) => {
                        const unidad = currentUnidades.find(u => u.id === id);
                        return unidad && (
                            <li key={unidad.id}>
                                <Unidad
                                    className="divider-dark p-1 h-fit"
                                    unidad={unidad}
                                    idCurso={idCurso}
                                    handleDeleteUnidad={handleDeleteUnidad}
                                    widthList={widths}
                                    token={token}
                                />
                            </li>
                        );
                    })}
                </ul>
            )}
            {addingMode? (
                <NewUnidad
                    className="divider-dark p-1"
                    nextNumber={order.length + 1}
                    idCurso={idCurso}
                    handleAddUnidad={handleAddUnidad}
                    selfDestruct={() => setAddingMode(false)}
                    widthList={widths}
                />
            ):(
                <div className='flex'>
                    { isReordering? (
                        <div className='space-x-2'>
                            <button className='button-1-secondary' onClick={() => handleGuardarOrden()}>Guardar</button>
                            <button className='button-1-tertiary' onClick={() => handleCancelReordering()}> Cancelar</button>
                        </div>
                    ):(
                        <>
                        <PrimaryButton
                            className="m-4"
                            handleAction={() => handleStartReordering()} // Toggle reordering mode
                            buttonLabel='Reordenar'
                        />
                        <PrimaryButton
                            className="m-4 ml-auto"
                            handleAction={() => setAddingMode(true)}
                            buttonLabel="Agregar"
                        />
                        </>
                    )}
                </div>
            )}
            <Alert error={error} setError={setError} />
        </section>
    );
};

export default Unidades;
