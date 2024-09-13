'use client'
import { ModalidadType } from '@/models/modalidad';
import { OpcionTerminalType } from '@/models/opcionTerminal';
import { OpcionTerminalCursoDataType, OpcionTerminalCursoType } from '@/models/opcionTerminalCurso';
import { ProgramaType } from '@/models/programa';
import React, { useState } from 'react';
import OpcionTerminal from './opcionTerminal';
import NewOpcionTerminal from './newOpcionTerminal';
import ListHeaders from '@/components/listHeaders';
import PrimaryButton from '@/components/primaryButton';
import WidthType from '@/models/width';

const ListaOpcionesTerminales = ({
    className,
    idCurso,
    catalogoModalidades,
    catalogoOpcionesTerminales,
    catalogoProgramas,
    opcionesTerminales
}:{
    className: string,
    idCurso: number,
    catalogoModalidades: ModalidadType[],
    catalogoOpcionesTerminales: OpcionTerminalType[],
    catalogoProgramas: ProgramaType[],
    opcionesTerminales: OpcionTerminalCursoType[],
}) => {
    const widths: [WidthType, WidthType, WidthType, WidthType] = ['w-[25%]', 'w-[25%]', 'w-[25%]', 'w-[25%]'];
    const [currentOpcionesTerminales, setCurrentOpcionesTerminales] = useState<OpcionTerminalCursoType[]>(opcionesTerminales);

    const [addingMode, setAddingMode] = useState(false);

    const handleDelete = (id: number) => {
        const newOpcionesTerminales: OpcionTerminalCursoType[] = currentOpcionesTerminales.filter((ot)=> ot.id !== id);
        setCurrentOpcionesTerminales(newOpcionesTerminales);
    };

    const handleAddOpcionTerminal = (data: OpcionTerminalCursoDataType) => {
        const newOpcionTerminal: OpcionTerminalCursoType = {
            id: 0,
            id_curso: idCurso,
            id_opcion_terminal: data.id_opcion_terminal,
            id_modalidad: data.id_modalidad,
            id_programa: data.id_programa,
        };
        setCurrentOpcionesTerminales(prev => [...prev, newOpcionTerminal]);
        //actual api call, if !success then filter id:0.
    };

    return (
        <div className={`${className}`}>
            <h2 className="title-2">Opciones Terminales del curso</h2>
            <ul>
                <ListHeaders
                    className=''
                    headersList={['Opciones Terminales', 'Programa', 'Modalidad', 'Acciones']}
                    widthList={widths}
                />
                {currentOpcionesTerminales.map((opcion) => (
                    <li key={opcion.id} className="divider-dark p-1">
                        <OpcionTerminal
                            className='flex'
                            opcionTerminal={opcion}
                            handleDelete={handleDelete}
                            catalogoOpcionesTerminales={catalogoOpcionesTerminales}
                            catalogoModalidades={catalogoModalidades}
                            catalogoProgramas={catalogoProgramas}
                            widthList={widths}
                        />
                    </li>
                ))}
                {addingMode? (
                    <li>
                        <NewOpcionTerminal
                            className='divider-dark p-1'
                            selfDestruct={() => setAddingMode(false)}
                            handleAddOpcionTerminal={handleAddOpcionTerminal}
                            catalogoOpcionesTerminales={catalogoOpcionesTerminales}
                            catalogoModalidades={catalogoModalidades}
                            catalogoProgramas={catalogoProgramas}
                            widthList={widths}
                        />
                    </li>
                ):(
                    <PrimaryButton
                        className='ml-auto flex mr-4'
                        handleAction={() => setAddingMode(true)}
                        buttonLabel='Agregar'
                    />
                )}
            </ul>
        </div>
    );
};

export default ListaOpcionesTerminales;
