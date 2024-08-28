'use client'
import React from 'react';
import { useState } from 'react';

import { EncargadoDataType, EncargadoType } from '@models/encargado';
import { MaestroType } from '@models/maestro';

import ListHeaders from '@/components/listHeaders';
import WidthType from '@/models/width';
import Encargado from './encargado';
import { RolType } from '@/models/rol';
import NewEncargado from './newEncargado';
import PrimaryButton from '@/components/primaryButton';

const Encargados = ({
    idCurso,
    catalogoMaestros,
    catalogoRoles,
    encargados,
    className,
    token,
}:{
    idCurso: number,
    catalogoMaestros: MaestroType[],
    catalogoRoles: RolType[],
    encargados: EncargadoType[],
    className: string,
    token: string,
}) => {
    const widths: [WidthType, WidthType, WidthType] = ['w-[30%]', 'w-[30%]', 'w-[30%]'];
    const [currentEncargados, setCurrentEncargados] = useState<EncargadoType[]>(encargados);
    const [addingMode, setAddingMode] = useState<boolean>(false);

    const handleDelete = (id: number) => {
        const newEncargados: EncargadoType[] = currentEncargados.filter((encargado) => encargado.id !== id);
        setCurrentEncargados(newEncargados);
    };

    const handleAdd = (data: EncargadoDataType) => {
        const newEncargado: EncargadoType = {
            id:0,
            id_curso: idCurso,
            id_maestro: data.id_maestro,
            id_rol: data.id_rol,
        };
        setCurrentEncargados(prev => [...prev, newEncargado]);
    };

    return (
        <section className={`${className}`}>
            <h2 className='title-2'>Encargados</h2>
            <ul>
                <ListHeaders
                    className=''
                    headersList={['Docente','Rol','Acciones']}
                    widthList={widths}
                />
                {currentEncargados.map((encargado)=>(
                    <li key={encargado.id}>
                        <Encargado
                            className='divider-dark p-1'
                            encargado={encargado}
                            catalogoMaestros={catalogoMaestros}
                            catalogoRoles={catalogoRoles}
                            widthList={widths}
                            handleDelete={handleDelete}
                        />
                    </li>
                ))}
            </ul>
            {addingMode? (
                <NewEncargado
                    className='divider-dark-1'
                    catalogoMaestros={catalogoMaestros}
                    catalogoRoles={catalogoRoles}
                    widthList={widths}
                    handleAdd={handleAdd}
                    selfDestruct={ () => setAddingMode(false) }
                />
            ):(
                <PrimaryButton className='flex ml-auto mr-4' handleAction={ () => setAddingMode(true) } buttonLabel='Agregar'/>
            )}
        </section>
    );
};

export default Encargados;

