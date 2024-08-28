'use client';
import { useState } from 'react';
import { FuenteMiniDataType, FuenteMiniType } from "@/models/fuente";
import { TipoFuenteType } from "@/models/tipoFuente";
import Fuente from './fuente';
import NewFuente from './newFuente';
import PrimaryButton from '@components/primaryButton';
import ListHeaders from '@components/listHeaders';

import WidthType from '@models/width';
import Confirm from '@/components/confirm';

const ListaFuentes = ({
    className,
    idCurso,
    fuentes,
    catalogoTiposFuentes,
}:{
    className: string,
    idCurso: number,
    fuentes: FuenteMiniType[],
    catalogoTiposFuentes: TipoFuenteType[],
}) => {

    const [currentFuentes, setCurrentFuentes] = useState<FuenteMiniType[]>(fuentes);
    const [addingMode, setAddingMode] = useState<boolean>(false);

    const widths: [WidthType, WidthType, WidthType] = ['w-[50%]', 'w-[20%]', 'w-[30%]'];

    const handleAddFuente = ( data: FuenteMiniDataType ) => {
        const newCita = '';
        const newFuente: FuenteMiniType = {
            id: 0,
            id_curso: idCurso,
            titulo: data.titulo,
            id_tipo: data.id_tipo,
            cita: newCita,
        };
        setCurrentFuentes(prev => [...prev, newFuente]);
    };

    const handleDelete = ( id: number ) => {

        const newFuentes = currentFuentes.filter((fuente) => fuente.id !== id);
        setCurrentFuentes(newFuentes);
    };

    return (
        <div className={`${className}`}>
            <ul>
                <ListHeaders
                    className=''
                    headersList={['Titulo','Tipo','Acciones']}
                    widthList={widths}
                />
                {currentFuentes.map((fuente: FuenteMiniType) => (
                    <li key={fuente.id}>
                        <Fuente
                            className='divider-dark p-1'
                            fuente={fuente}
                            idCurso={idCurso}
                            catalogoTiposFuentes={catalogoTiposFuentes}
                            handleDelete={handleDelete}
                            widthList={widths}
                        />
                    </li>
                ))}
                {addingMode ? (
                    <NewFuente
                        className='divider-dark p-1'
                        catalogoTiposFuentes={catalogoTiposFuentes}
                        handleAddFuente={handleAddFuente}
                        selfDestruct={() => setAddingMode(false)}
                        widthList={widths}
                    />
                ) : (
                    <PrimaryButton
                        className='ml-auto flex mr-4'
                        handleAction={() => setAddingMode(true)}
                        buttonLabel='Nueva Fuente'
                    />
                )}
            </ul>
        </div>
    );
};

export default ListaFuentes;
