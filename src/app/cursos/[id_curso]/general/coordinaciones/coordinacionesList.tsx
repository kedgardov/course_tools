'use client'
import { useState } from 'react';

import { CoordinacionCatalogoType, CoordinacionCursoDataType, CoordinacionCursoType } from "@models/coordinacion";

import { addCoordinacion } from '@utils/coordinaciones/addCoordinacion';
import { removeCoordinacion } from '@/utils/coordinaciones/removeCoordinacion';

import Spinner from '@components/spinner';
import Alert from '@components/alert';
import ListHeaders from '@/components/listHeaders';
import WidthType from '@/models/width';
import Coordinacion from './coordinacion';
import PrimaryButton from '@components/primaryButton';
import NewCoordinacion from './newCoordinacion';

const CoordinacionesList = ({
    coordinaciones,
    idCurso,
    catalogo_coordinaciones,
    className,
    token,
}:{
    idCurso: number,
    coordinaciones: CoordinacionCursoType[],
    catalogo_coordinaciones: CoordinacionCatalogoType[],
    className: string,
    token: string,
}) => {
    const widths: [WidthType, WidthType] = ['w-[60%]','w-[40%]'];

    const [addingMode, setAddingMode] = useState<boolean>(false);
    const [currentCoordinaciones, setCurrentCoordinaciones] = useState<CoordinacionCursoType[]>(coordinaciones);

    const handleDelete = (id: number) => {
        const newCoordinaciones = currentCoordinaciones.filter((coordinacion) => coordinacion.id !== id);
      setCurrentCoordinaciones(newCoordinaciones);
    };

    const handleAdd = (data: CoordinacionCursoDataType) => {
        const newCoordinacion: CoordinacionCursoType = {
            id:0,
            id_curso: idCurso,
            id_coordinacion: data.id_coordinacion,
        };
        setCurrentCoordinaciones(prev => [...prev, newCoordinacion]);
    };

    return (
        <section className={`${className}`}>
            <h2 className='title-2'>Coordinaciones</h2>
            <ul>
                <ListHeaders
                    className=''
                    headersList={['Coordinacion', 'Acciones']}
                    widthList={widths}
                />
                {currentCoordinaciones.map((coordinacion) => (
                    <li key={coordinacion.id}>
                        <Coordinacion
                            coordinacion={coordinacion}
                            catalogoCoordinaciones={catalogo_coordinaciones}
                            className='divider-dark p-1'
                            idCurso={idCurso}
                            widthList={widths}
                            handleDelete={handleDelete}
                        />
                    </li>
                ))}
                </ul>
                {addingMode? (
                    <NewCoordinacion
                        catalogoCoordinaciones={catalogo_coordinaciones}
                        className='divider-dark p-1'
                        idCurso={idCurso}
                        widthList={widths}
                        handleAdd={handleAdd}
                        selfDestruct={ () => setAddingMode(false) }

                    />
                ):(
                  <PrimaryButton className='flex ml-auto mr-4' handleAction={ () => setAddingMode(true) } buttonLabel='Nueva Coordinacion'/>
                )}
        </section>
    );
};

export default CoordinacionesList;
