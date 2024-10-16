'use client'
import { ProgramaType } from '@/models/programa';
import React, { useState } from 'react';
import OpcionTerminal from './opcionTerminal';
import NewOpcionTerminal from './newOpcionTerminal';
import ListHeaders from '@components/listHeaders';
import WidthType from '@models/width';
import PrimaryButton from '@/components/primaryButton';
import LoadingComponent from '@/components/loading';
import { OpcionTerminalType } from '@/models/opcionTerminal';
import { OpcionTerminalCursoDataType, OpcionTerminalCursoType } from '@/models/opcionTerminalCurso';
import { NivelCurricularType } from '@/models/nivelCurricular';
import { insertOpcionTerminalCurso } from '@/utils/cursos/insertOpcionTerminalCurso';
import Alert from '@/components/alert';
import { deleteOpcionTerminalCurso } from '@/utils/cursos/deleteOpcionTerminalCurso';


const ListaOpcionesTerminales = ({
    className,
    idCurso,
    token,
    catalogoNivelesCurriculares,
    catalogoOpcionesTerminales,
    catalogoProgramas,
    opcionesTerminales,
    canEdit,
}:{
    className: string,
    idCurso: number,
    token: string,
    catalogoNivelesCurriculares: NivelCurricularType[],
    catalogoOpcionesTerminales: OpcionTerminalType[],
    catalogoProgramas: ProgramaType[],
    opcionesTerminales: OpcionTerminalCursoType[],
    canEdit: boolean,
}) => {

    const widthList: WidthType[] = canEdit? ['w-[35%]', 'w-[25%]', 'w-[20%]', 'w-[20%]'] : ['w-[40%]','w-[35%]','w-[25%]'] ;
    const headers: string[] = canEdit? ['Opcion Terminal', 'Programa', 'Nivel Academico', 'Acciones']:['Opcion Terminal', 'Programa', 'Nivel Academico'];

    const [currentOpcionesTerminales, setCurrentOpcionesTerminales] = useState<OpcionTerminalCursoType[]>(opcionesTerminales);
    const [addingMode, setAddingMode] = useState(false);
    const [loadingMode, setLoadingMode] = useState(false);

    const [ error, setError ] = useState<string | null>(null);

    const handleDelete = async (id: number) => {
        startLoadingMode();
        const response = await deleteOpcionTerminalCurso(id, token);
        if( response.success ){
            const newOpcionesTerminales = currentOpcionesTerminales.filter((ot) => ot.id !== id);
            setCurrentOpcionesTerminales(newOpcionesTerminales);
            stopAddingMode();
        } else {
            setError(response.message);
        }
        stopLoadingMode()
    };

    const handleAddOpcionTerminal = async (data: OpcionTerminalCursoDataType) => {
        startLoadingMode();
        const newOpcionTerminal: OpcionTerminalCursoType = {
            id: 0,
            id_curso: idCurso,
            id_opcion_terminal: data.id_opcion_terminal,
            id_nivel_curricular: data.id_nivel_curricular,
            id_programa: data.id_programa,
        };
        const response = await insertOpcionTerminalCurso(newOpcionTerminal, token);
        if (response.success){
            setCurrentOpcionesTerminales(prev => [...prev, {...newOpcionTerminal, id: response.id}]);
            setAddingMode(false);
        }else{
            setError(response.message);
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
                    headersList={headers}
                    widthList={widthList}
                />
                {opcionesTerminales.length === 0? (
                    <li className='flex p-4'>
                        <p className='text-center flex-grow italic text-less-dark'>No Aplica o No se Encontraron Opciones Terminales</p>
                    </li>
                ):(
                    currentOpcionesTerminales.map((opcionTerminal) => (
                    <li key={opcionTerminal.id} className="divider-dark p-1">
                        <OpcionTerminal
                            className="flex"
                            canEdit={canEdit}
                            opcionTerminal={opcionTerminal}
                            token={token}
                            handleDelete={handleDelete}
                            catalogoOpcionesTerminales={catalogoOpcionesTerminales}
                            catalogoNivelesCurriculares={catalogoNivelesCurriculares}
                            catalogoProgramas={catalogoProgramas}
                            widthList={widthList}
                            startLoadingMode={startLoadingMode}
                            stopLoadingMode={stopLoadingMode}
                        />
                    </li>)
                ))}
                {canEdit && (
                <>
                {addingMode ? (
                    <li className="divider-dark p-1">
                        <NewOpcionTerminal
                            className="flex"
                            selfDestruct={stopAddingMode}
                            handleAddOpcionTerminal={handleAddOpcionTerminal}
                            catalogoOpcionesTerminales={catalogoOpcionesTerminales}
                            catalogoNivelesCurriculares={catalogoNivelesCurriculares}
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
                    </>
                )}
            </ul>
            <Alert
                error={error}
                setError={setError}
            />
        </div>
    );
};

export default ListaOpcionesTerminales;
