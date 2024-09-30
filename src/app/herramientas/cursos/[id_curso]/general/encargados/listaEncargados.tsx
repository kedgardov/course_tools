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
import LoadingComponent from "@/components/loading";
import { insertEncargadoCurso } from "@/utils/encargados/insertEncargado";
import Alert from "@/components/alert";
import { deleteEncargado } from "@/utils/encargados/deleteEncargado";

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
    const [ loadingMode, setLoadingMode ] = useState(false);
    const [ error, setError ] = useState< string | null>(null);

    const handleDelete = async (id: number) => {
        setLoadingMode(true);
        const response = await deleteEncargado(id, token);
        if( response.success ){
            const updatedEncargados = currentEncargados.filter((encargado) => encargado.id !== id);
            setCurrentEncargados(updatedEncargados);
            setAddingMode(false);
        } else {
            setError(response.message);
        }
        setLoadingMode(false);
    };

    const handleAdd = async (data: EncargadoType) => {
        setLoadingMode(true);
        const newEncargado: EncargadoType = {
            id: 0,
            id_curso: idCurso,
            id_maestro: data.id_maestro,
            id_rol: data.id_rol,
        };
        const response = await insertEncargadoCurso(newEncargado, token);
        if ( response.success ){
            setCurrentEncargados( prev => [...prev, { ...newEncargado,id: response.id }] );
            setAddingMode(false);
        } else {
            setError(response.message);
        }
        setLoadingMode(false);
    };

    return (
        <section className={`${className}`}>
            <div className='m-1 title-2-container'>
                <h2 className='title-2'>Encargados</h2>
                <LoadingComponent isLoading={loadingMode}/>
            </div>
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
                            encargado={encargado}
                            catalogoMaestros={catalogoMaestros}
                            catalogoRoles={catalogoRoles}
                            widthList={widths}
                            handleDelete={() => handleDelete(encargado.id)}
                            startLoadingMode={() => setLoadingMode(true)}
                            stopLoadingMode={() => setLoadingMode(false)}
                        />
                    </li>
                ))}
            </ul>
            {addingMode ? (
                <NewEncargado
                    catalogoMaestros={catalogoMaestros}
                    catalogoRoles={catalogoRoles}
                    className='divider-dark p-1'
                    widthList={widths}
                    handleAdd={handleAdd}
                    selfDestruct={() => setAddingMode(false)}
                />
            ) : (
                <PrimaryButton className='flex ml-auto mr-4' handleAction={() => setAddingMode(true)} buttonLabel='Nuevo Encargado' />
            )}
        <Alert
            error={error}
            setError={setError}
        />
        </section>
    );
};

export default ListaEncargados;
