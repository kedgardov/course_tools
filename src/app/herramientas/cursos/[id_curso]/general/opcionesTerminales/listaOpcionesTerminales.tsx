'use client'
import { ProgramaType } from '@/models/programa';
import React, { useState } from 'react';
import OpcionTerminal from './opcionTerminal';
import NewOpcionTerminal from './newOpcionTerminal';
import ListHeaders from '@components/listHeaders';
import WidthType from '@models/width';
import PrimaryButton from '@/components/primaryButton';
import { NivelAcademicoType } from '@/models/nivelAcademico';
import fakeApiCall from '@/utils/fakeApi';
import LoadingComponent from '@/components/loading';
import { OpcionTerminalType } from '@/models/opcionTerminal';
import { OpcionTerminalCursoDataType, OpcionTerminalCursoType } from '@/models/opcionTerminalCurso';


const ListaOpcionesTerminales = ({
    className,
    idCurso,
    catalogoNivelesAcademicos,
    catalogoOpcionesTerminales,
    catalogoProgramas,
    opcionesTerminales
}:{
    className: string,
    idCurso: number,
    catalogoNivelesAcademicos: NivelAcademicoType[],
    catalogoOpcionesTerminales: OpcionTerminalType[],
    catalogoProgramas: ProgramaType[],
    opcionesTerminales: OpcionTerminalCursoType[],
}) => {

    const widthList: [WidthType, WidthType, WidthType, WidthType] = ['w-[30%]', 'w-[25%]', 'w-[25%]', 'w-[20%]'];

    const [currentOpcionesTerminales, setCurrentOpcionesTerminales] = useState<OpcionTerminalCursoType[]>(opcionesTerminales);
    const [addingMode, setAddingMode] = useState(false);
    const [loadingMode, setLoadingMode] = useState(false);

    const handleDelete = (id: number) => {
        setCurrentOpcionesTerminales(prev => prev.filter(ot => ot.id !== id));
    };

    const handleAddOpcionTerminal = async (data: OpcionTerminalCursoDataType) => {
        startLoadingMode();
        const newOpcionTerminal: OpcionTerminalCursoType = {
            id: 0,
            id_curso: idCurso,
            id_opcion_terminal: data.id_opcion_terminal,
            id_nivel_academico: data.id_nivel_academico,
            id_programa: data.id_programa,
        };
        const response = await fakeApiCall();
        if (response.success){
            setCurrentOpcionesTerminales(prev => [...prev, newOpcionTerminal]);
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
                <h2 className="title-2">Opciones Terminales</h2>
                <LoadingComponent isLoading={loadingMode} />
            </div>
            <ul>
                <ListHeaders
                    className=''
                    headersList={['Opcion Terminal', 'Programa', 'Nivel Academico', 'Acciones']}
                    widthList={widthList}
                />
                {currentOpcionesTerminales.map((opcionTerminal) => (
                    <li key={opcionTerminal.id} className="divider-dark p-1">
                        <OpcionTerminal
                            className="flex"
                            opcionTerminal={opcionTerminal}
                            handleDelete={handleDelete}
                            catalogoOpcionesTerminales={catalogoOpcionesTerminales}
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
                        <NewOpcionTerminal
                            className="flex"
                            selfDestruct={stopAddingMode}
                            handleAddOpcionTerminal={handleAddOpcionTerminal}
                            catalogoOpcionesTerminales={catalogoOpcionesTerminales}
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

export default ListaOpcionesTerminales;
