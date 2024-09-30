'use client'
import { useState } from 'react';

import { CoordinacionCatalogoType, CoordinacionCursoDataType, CoordinacionCursoType } from "@models/coordinacion";

import Alert from '@components/alert';
import ListHeaders from '@/components/listHeaders';
import WidthType from '@/models/width';
import Coordinacion from './coordinacion';
import PrimaryButton from '@components/primaryButton';
import NewCoordinacion from './newCoordinacion';
import LoadingComponent from '@/components/loading';
import { insertCoordinacionCurso } from '@/utils/cursos/insertCoordinacionCurso';
import { deleteCoordinacionCurso } from '@/utils/cursos/deleteCoordinacionCurso';

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
    const [ loadingMode, setLoadingMode ] = useState(false);

    const [ error, setError ] = useState<string | null>(null);

    const handleDelete = async (id: number) => {
        startLoadingMode();
        const response = await deleteCoordinacionCurso(id, token);
        if( response.success ){
            const newCoordinaciones = currentCoordinaciones.filter((coordinacion) => coordinacion.id !== id);
            setCurrentCoordinaciones(newCoordinaciones);
            setAddingMode(false);
        } else {
            setError(response.message);
        }
        stopLoadingMode();
    };

    const handleAdd = async (data: CoordinacionCursoDataType) => {
        startLoadingMode();
        const newCoordinacion: CoordinacionCursoType = {
            id: 0,
            id_curso: idCurso,
            id_coordinacion: data.id_coordinacion,
        };
        const response = await insertCoordinacionCurso(newCoordinacion, token);
        if( response.success ){
            setCurrentCoordinaciones( prev => [...prev,{ ...newCoordinacion, id: response.id }] );
            setAddingMode(false);
        } else {
            setError(response.message);
        }
        stopLoadingMode();
    };

    const startLoadingMode = () => setLoadingMode(true);
    const stopLoadingMode = () => setLoadingMode(false);


    return (
        <section className={`${className}`}>
            <div className='m-1 title-2-container'>
                <h2 className='title-2'>Coordinaciones</h2>
                <LoadingComponent isLoading={loadingMode}/>
            </div>
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
                            token={token}
                            catalogoCoordinaciones={catalogo_coordinaciones}
                            className='divider-dark p-1'
                            startLoadingMode={startLoadingMode}
                            stopLoadingMode={stopLoadingMode}
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
            <Alert
                error={error}
                setError={setError}
            />
        </section>
    );
};

export default CoordinacionesList;
