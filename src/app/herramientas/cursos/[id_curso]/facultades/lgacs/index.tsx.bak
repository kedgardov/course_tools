'use client'
import { ModalidadType } from '@/models/modalidad';
import { ProgramaType } from '@/models/programa';
import React, { useState } from 'react';
import LGAC from './LGAC';
import NewLGAC from './newLGAC';
import { LGACCursoDataType, LGACCursoType } from '@/models/lgacCurso';
import { LGACType } from '@/models/lgac';

import ListHeaders from '@components/listHeaders';
import WidthType from '@models/width';
import PrimaryButton from '@/components/primaryButton';

const ListaLGACs = ({
    className,
    idCurso,
    catalogoModalidades,
    catalogoLGACs,
    catalogoProgramas,
    lgacs
}:{
    className: string,
    idCurso: number,
    catalogoModalidades: ModalidadType[],
    catalogoLGACs: LGACType[],
    catalogoProgramas: ProgramaType[],
    lgacs: LGACCursoType[],
}) => {
    const widths: [WidthType, WidthType, WidthType, WidthType] = ['w-[25%]', 'w-[25%]', 'w-[25%]', 'w-[25%]'];
    const [currentLGACs, setCurrentLGACs] = useState<LGACCursoType[]>(lgacs);

    const [addingMode, setAddingMode] = useState(false);

    const handleDelete = (id: number) => {
        const newLGACs: LGACCursoType[] = currentLGACs.filter((lgac)=> lgac.id !== id);
        setCurrentLGACs(newLGACs);
    };

    const handleAddLGAC = (data: LGACCursoDataType) => {
        const newLGAC: LGACCursoType = {
            id: 0,
            id_curso: idCurso,
            id_lgac: data.id_lgac,
            id_modalidad: data.id_modalidad,
            id_programa: data.id_programa,
        };
        setCurrentLGACs(prev => [...prev, newLGAC]);
        //actual api call, if !success then filter id:0.
    };

    return (
        <div className={`${className}`}>
            <h2 className="title-2 my-2 py-2">Lineas de Generacion y Aplicacion de Conocimiento del curso</h2>
                <ul>
                <ListHeaders
                    className=''
                    headersList={['LGAC', 'Programa', 'Modalidad', 'Acciones']}
                    widthList={widths}
                />
                {currentLGACs.map((lgac) => (
                    <li key={lgac.id} className='divider-dark p-1'>
                        <LGAC
                            className='flex'
                            lgac={lgac}
                            handleDelete={handleDelete}
                            catalogoLGACs={catalogoLGACs}
                            catalogoModalidades={catalogoModalidades}
                            catalogoProgramas={catalogoProgramas}
                            widthList={widths}
                        />
                    </li>
                 ))}
                {addingMode? (
                    <li className='divider-dark p-1'>
                        <NewLGAC
                            className='flex'
                            selfDestruct={() => setAddingMode(false)}
                            handleAddLGAC={handleAddLGAC}
                            catalogoLGACs={catalogoLGACs}
                            catalogoModalidades={catalogoModalidades}
                            catalogoProgramas={catalogoProgramas}
                            widthList={widths}
                        />
                    </li>
                ):(
                    <PrimaryButton className='ml-auto mr-4 flex' handleAction={() => setAddingMode(true)} buttonLabel='Agregar'/>
                )}
            </ul>
        </div>
    );
};

export default ListaLGACs;
