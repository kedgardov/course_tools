'use client';

import { EncargadoType } from "@/models/encargado";
import { MaestroType } from "@/models/maestro";
import { RolType } from "@/models/rol";
import Encargado from "./encargado";
import WidthType from "@/models/width";
import { useState } from "react";
import ListHeaders from '@/components/listHeaders';
import PrimaryButton from '@components/primaryButton';
import NewEncargado from './newEncargado'; // Assuming a similar component to handle new Encargado

const ListaEncargados = ({
    className,
    token,
    idCurso,
    catalogoMaestros,
    catalogoRoles,
    encargados,
}: {
    className: string,
    token: string,
    idCurso: number,
    catalogoMaestros: MaestroType[],
    catalogoRoles: RolType[],
    encargados: EncargadoType[],
}) => {

    const widths: [WidthType, WidthType, WidthType, WidthType] = ['w-[50%]', 'w-[20%]', 'w-[15%]', 'w-[15%]'];

    const [addingMode, setAddingMode] = useState<boolean>(false);
    const [currentEncargados, setCurrentEncargados] = useState<EncargadoType[]>(encargados);

    const handleDelete = (id: number) => {
        const updatedEncargados = currentEncargados.filter((encargado) => encargado.id !== id);
        setCurrentEncargados(updatedEncargados);
    };

    const handleAdd = (data: EncargadoType) => {
        const newEncargado: EncargadoType = {
            id: 0,
            id_curso: idCurso,
            id_maestro: data.id_maestro,
            id_rol: data.id_rol,
        };
        setCurrentEncargados((prev) => [...prev, newEncargado]);
    };

    return (
        <section className={`${className}`}>
            <h2 className='title-2'>Encargados</h2>
            <ul>
                <ListHeaders
                    className=''
                    headersList={['Encargado', 'Rol', 'Links', 'Acciones']}
                    widthList={widths}
                />
                {currentEncargados.map((encargado) => (
                    <li key={encargado.id}>
                        <Encargado
                            className='divider-dark p-1'
                            token={token}
                            idCurso={idCurso}
                            encargado={encargado}
                            catalogoMaestros={catalogoMaestros}
                            catalogoRoles={catalogoRoles}
                            widthList={widths}
                            handleDelete={() => handleDelete(encargado.id)}
                        />
                    </li>
                ))}
            </ul>
            {addingMode ? (
                <NewEncargado
                    catalogoMaestros={catalogoMaestros}
                    catalogoRoles={catalogoRoles}
                    className='divider-dark p-1'
                    idCurso={idCurso}
                    widthList={widths}
                    handleAdd={handleAdd}
                    selfDestruct={() => setAddingMode(false)}
                />
            ) : (
                <PrimaryButton className='flex ml-auto mr-4' handleAction={() => setAddingMode(true)} buttonLabel='Nuevo Encargado' />
            )}
        </section>
    );
};

export default ListaEncargados;
