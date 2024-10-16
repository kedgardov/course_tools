'use client'
import NewUnidad from './newUnidad';
import Unidad from './Unidad';

import { UnidadMiniType, UnidadTituloType } from '@models/unidad';
import { Reorder } from 'framer-motion';
import { useState } from 'react';
import WidthType from '@models/width';
import ListHeaders from '@/components/listHeaders';
import PrimaryButton from '@/components/primaryButton';
import { insertUnidad } from '@/utils/unidades/insertUnidad';
import Alert from '@/components/alert';

const Unidades = ({
    className,
    unidades,
    idCurso,
    token,
}:{
    className: string,
    unidades: UnidadMiniType[],
    idCurso: number,
    token: string
}) => {
    const widths: [WidthType, WidthType, WidthType] = ['w-[8%]', 'w-[62%]', 'w-[30%]'];

    const [addingMode, setAddingMode] = useState<boolean>(false);
    const [currentUnidades, setCurrentUnidades] = useState<UnidadMiniType[]>(unidades);
    const [order, setOrder] = useState(unidades.map(u => u.id));
    const [ error, setError ] = useState<string | null>(null);

    const onReorder = (newOrder: number[]) => {
        setOrder(newOrder);
        const updatedObjetivos = newOrder.map((id, index) => {
            const objetivo = currentUnidades.find(obj => obj.id === id);
            return objetivo ? { ...objetivo, numero: index + 1 } : undefined;
        }).filter((obj): obj is UnidadMiniType => obj !== undefined);
       setCurrentUnidades(updatedObjetivos);
    };

    const handleAddUnidad = async (unidadTitulo: UnidadTituloType) => {
        const newUnidad: UnidadMiniType = {
            id:0,
            numero: order.length+1,
            id_curso: idCurso,
            unidad: unidadTitulo.unidad,
        };
        const response = await insertUnidad(newUnidad, token);
        if( response.success ){
            setCurrentUnidades(prev => [...prev, {...newUnidad, id: response.id}]);
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
                            className='divider-dark p-1 h-fit'
                            unidad={unidad}
                            idCurso={idCurso}
                            handleDeleteUnidad={handleDeleteUnidad}
                            widthList={widths}
                            token={token}
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
                <PrimaryButton className='flex ml-auto m-4 ' handleAction={() => setAddingMode(true)} buttonLabel='Agregar'/>
            )}
        <Alert error={error} setError={setError} />
        </section>
    );
};

export default Unidades;
