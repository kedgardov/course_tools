'use client'
import { CriterioDataType, CriterioType } from "@/models/criterio";
import { useEffect, useState } from 'react';

import Criterio from './criterio';
import NewCriterio from './newCriterio';

import WidthType from '@models/width';
import ListHeaders from "@/components/listHeaders";
import PrimaryButton from "@/components/primaryButton";
import { insertCriterio } from "@/utils/criterios/insertCriterio";
import Alert from "@/components/alert";
import { deleteCriterio } from "@/utils/criterios/deleteCriterio";

const ListaCriterios = ({
    className,
    idCurso,
    criterios,
    token,
}:{
    className: string,
    idCurso: number,
    criterios: CriterioType[],
    token: string,
}) => {
    const widths: [WidthType, WidthType, WidthType] = ['w-[40%]', 'w-[30%]','w-[30%]'];

    const [suma, setSuma] = useState<number>(0);
    const [currentCriterios, setCurrentCriterios] = useState<CriterioType[]>(criterios);

    const [addingState, setAddingState] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);

    const handleAddCriterio = async (data: CriterioDataType) => {
        if ( ( suma + data.valor ) > 100 ){
            setError('El suma total de los criterios no puede exeder de 100%');
            return;
        }
        const newCriterio: CriterioType = {
            id: 0,
            id_curso: idCurso,
            criterio: data.criterio,
            valor: data.valor,
        };
        const response = await insertCriterio(newCriterio, token);
        if ( response.success ){
            setCurrentCriterios(prev => [...prev, {...newCriterio, id: response.id}]);
            setAddingState(false);
        } else {
            setError(response.message);
        }
    };

    useEffect(()=>{
        let newSuma = 0;
        currentCriterios.forEach((criterio) => newSuma += criterio.valor);
        setSuma(newSuma);
    },[currentCriterios]);

    const handleDelete = async (id: number) => {
        const response = await deleteCriterio(idCurso, id, token);
        if ( response.success ){
            const newCriterios = currentCriterios.filter((criterio) => criterio.id !== id);
            setCurrentCriterios(newCriterios);
        } else {
            setError(response.message);
        }
    };

    return (
        <div className={`${className}`}>

                <ListHeaders
                    className=''
                    headersList={['Criterio', 'Valor [%]', 'Acciones']}
                    widthList={widths}
                />
            {currentCriterios.length === 0? (
 <p className='italic p-2 text-less-dark'>
                    Este curso aun no cuenta con objetivos especificos, para agregar una presione el boton de agregar
                </p>

            ):(


                <ul>
                {/* Criterios Rows */}
                {currentCriterios.map((criterio) => (
                    <li className='divider-dark p-1' key={criterio.id}>
                        <Criterio
                            className='flex'
                            criterio={criterio}
                            handleDelete={handleDelete}
                            widthList={widths}
                            token={token}
                        />
                    </li>
                ))}
                </ul>
            )}
                {/* Adding New Criterio */}
                {addingState ? (

                        <NewCriterio
                            className='flex'
                            selfDestruct={()=>setAddingState(false)}
                            handleAddCriterio={handleAddCriterio}
                            widthList={widths}
                        />

                ) : (
                    <div className="flex p-1">
                        <span className={widths[0]}></span>
                        <span className={` ${widths[1]}`}>{currentCriterios.length !== 0 && (`${suma}%`)}</span>
                        <span className={widths[2]}>
                        <PrimaryButton className='' handleAction={() => setAddingState(true)} buttonLabel='Agregar'/>
                        </span>
                    </div>
                )}
            <Alert error={error} setError={setError} />
        </div>
    );
};

export default ListaCriterios;
