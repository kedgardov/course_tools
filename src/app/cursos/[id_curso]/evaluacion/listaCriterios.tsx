'use client'
import { CriterioDataType, CriterioType } from "@/models/criterio";
import { useEffect, useState } from 'react';

import Criterio from './criterio';
import NewCriterio from './newCriterio';

import WidthType from '@models/width';
import ListHeaders from "@/components/listHeaders";
import PrimaryButton from "@/components/primaryButton";

const ListaCriterios = ({
    className,
    idCurso,
    criterios,
}:{
    className: string,
    idCurso: number,
    criterios: CriterioType[],
}) => {
    const widths: [WidthType, WidthType, WidthType] = ['w-[40%]', 'w-[30%]','w-[30%]'];

    const [suma, setSuma] = useState<number>(0);
    const [currentCriterios, setCurrentCriterios] = useState<CriterioType[]>(criterios);

    const [addingState, setAddingState] = useState<boolean>(false);

    const handleAddCriterio = (data: CriterioDataType) => {
        const newCriterio: CriterioType = {
            id: 0,
            id_curso: idCurso,
            criterio: data.criterio,
            valor: data.valor,
        };
        setCurrentCriterios(prev => [...prev, newCriterio]);
    };

    useEffect(()=>{
        let newSuma = 0;
        currentCriterios.forEach((criterio) => newSuma += criterio.valor);
        setSuma(newSuma);
    },[currentCriterios]);

    const handleDelete = (id: number) => {
        const newCriterios = currentCriterios.filter((criterio) => criterio.id !== id);
        setCurrentCriterios(newCriterios);
    };


    return (
        <div className={`${className}`}>
            <ul>
                <ListHeaders
                    className=''
                    headersList={['Criterio', 'Valor [%]', 'Acciones']}
                    widthList={widths}
                />
                {/* Criterios Rows */}
                {currentCriterios.map((criterio) => (
                    <li className='divider-dark p-1' key={criterio.id}>
                        <Criterio
                            className='flex'
                            criterio={criterio}
                            handleDelete={handleDelete}
                            widthList={widths}
                        />
                    </li>
                ))}
                {/* Adding New Criterio */}
                {addingState ? (
                    <li className='divider-y p-1'>
                        <NewCriterio
                            className='flex'
                            selfDestruct={()=>setAddingState(false)}
                            handleAddCriterio={handleAddCriterio}
                            widthList={widths}
                        />
                    </li>
                ) : (
                    <li className="flex p-1">
                        <span className={widths[0]}></span>
                        <span className={` ${widths[1]}`}>{suma}%</span>
                        <span className={widths[2]}>
                        <PrimaryButton className='' handleAction={() => setAddingState(true)} buttonLabel='Agregar'/>
                        </span>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default ListaCriterios;
