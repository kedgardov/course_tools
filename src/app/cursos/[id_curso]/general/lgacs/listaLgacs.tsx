'use client'
import { ProgramaType } from '@/models/programa';
import React, { useState } from 'react';
import LGAC from './lgac';
import NewLGAC from './newLgac';
import { LGACCursoDataType, LGACCursoType } from '@/models/lgacCurso';
import { LGACType } from '@/models/lgac';

import ListHeaders from '@components/listHeaders';
import WidthType from '@models/width';
import PrimaryButton from '@/components/primaryButton';
import { NivelAcademicoType } from '@/models/nivelAcademico';
import fakeApiCall from '@/utils/fakeApi';
import LoadingComponent from '@/components/loading';


const ListaLGACs = ({
    className,
    idCurso,
    catalogoNivelesAcademicos,
    catalogoLGACs,
    catalogoProgramas,
    lgacs
}:{
    className: string,
    idCurso: number,
    catalogoNivelesAcademicos: NivelAcademicoType[],
    catalogoLGACs: LGACType[],
    catalogoProgramas: ProgramaType[],
    lgacs: LGACCursoType[],
}) => {

    const widthList: [WidthType, WidthType, WidthType, WidthType] = ['w-[30%]', 'w-[25%]', 'w-[25%]', 'w-[20%]'];

    const [currentLGACs, setCurrentLGACs] = useState<LGACCursoType[]>(lgacs);
    const [addingMode, setAddingMode] = useState(false);
    const [loadingMode, setLoadingMode] = useState(false);

    const handleDelete = (id: number) => {
        setCurrentLGACs(prev => prev.filter(lgac => lgac.id !== id));
    };

    const handleAddLGAC = async (data: LGACCursoDataType) => {
        startLoadingMode();
        const newLGAC: LGACCursoType = {
            id: 0,
            id_curso: idCurso,
            id_lgac: data.id_lgac,
            id_nivel_academico: data.id_nivel_academico,
            id_programa: data.id_programa,
        };
        const response = await fakeApiCall();
        if (response.success){
            setCurrentLGACs(prev => [...prev, newLGAC]);
            setAddingMode(false);
        }else{
            console.log('Algo salio mal');
        }
        stopLoadingMode();
    };

    const startAddingMode = () => setAddingMode(true);
    const stopAddingMode = () => setAddingMode(false);
    const startLoadingMode = () => setLoadingMode(true);
    const stopLoadingMode = () => setLoadingMode(false);

    return (
        <div className={className}>
            <div className='m-1 title-2-container'>
                <h2 className="title-2">Lineas de Generacion y Aplicacion de Conocimiento del curso</h2>
                <LoadingComponent isLoading={loadingMode} />
            </div>
            <ul>
                <ListHeaders
                    className=''
                    headersList={['LGAC', 'Programa', 'Nivel Academico', 'Acciones']}
                    widthList={widthList}
                />
                {currentLGACs.map((lgac) => (
                    <li key={lgac.id} className="divider-dark p-1">
                        <LGAC
                            className="flex"
                            lgac={lgac}
                            handleDelete={handleDelete}
                            catalogoLGACs={catalogoLGACs}
                            catalogoNivelesAcademicos={catalogoNivelesAcademicos}
                            catalogoProgramas={catalogoProgramas}
                            widthList={widthList}
                            startLoadingMode={startLoadingMode}
                            stopLoadingMode={stopLoadingMode}
                        />
                    </li>
                ))}
                {addingMode ? (
                    <li className="divider-dark p-1">
                        <NewLGAC
                            className="flex"
                            selfDestruct={stopAddingMode}
                            handleAddLGAC={handleAddLGAC}
                            catalogoLGACs={catalogoLGACs}
                            catalogoNivelesAcademicos={catalogoNivelesAcademicos}
                            catalogoProgramas={catalogoProgramas}
                            widthList={widthList}
                        />
                    </li>
                ) : (
                    <PrimaryButton
                        className="ml-auto mr-4 flex"
                        handleAction={startAddingMode}
                        buttonLabel="Agregar"
                    />
                )}
            </ul>
        </div>
    );
};

export default ListaLGACs;
