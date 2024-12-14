'use client'
import ListHeaders from "@/components/listHeaders";
import { GrupoHabilidadType } from "@/models/grupoHabilidad";
import { HabilidadCursoDataType, HabilidadCursoType, HabilidadType } from "@/models/habilidad";
import WidthType from "@/models/width";
import HabilidadCurso from "./habilidadCurso";
import { useState } from "react";
import LoadingComponent from "@/components/loading";
import PrimaryButton from "@/components/primaryButton";
import NewHabilidadCurso from "./newHabilidadCurso";
import { addHabilidadCurso } from "@/utils/habilidades/addHabilidadCurso";
import Alert from "@/components/alert";
import { deleteHabilidadCurso } from "@/utils/habilidades/deleteHabilidadCurso";

const TablaHabilidadesCurso = ({
    idCurso,
    className,
    token,
    habilidadesCurso,
    catalogoHabilidades,
    catalogoGruposHabilidades,
    canEdit,
}:{
    idCurso: number,
    className: string,
    token: string,
    habilidadesCurso: HabilidadCursoType[],
    catalogoHabilidades: HabilidadType[],
    catalogoGruposHabilidades: GrupoHabilidadType[],
    canEdit: boolean,
}) => {
    const widths: WidthType[] = canEdit? ['w-[45%]','w-[35%]','w-[20%]']:['w-[50%]','w-[50%]'] ;
    const listHeaders: string[] = canEdit ? ['Grupo de Habilidades', 'Habilidad', 'Acciones']:['Grupo de Habilidades', 'Habilidad'];


    const [currentHabilidadesCurso, setCurrentHabilidadesCurso] = useState<HabilidadCursoType[]>(habilidadesCurso);
    const [addingMode, setAddingMode] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);



    const handleDelete = async (id: number) => {
        setIsLoading(true);
        const response = await deleteHabilidadCurso( id, token );
        if ( response.success ){
            const newCurrentHabilidadesCurso = currentHabilidadesCurso.filter((h) => h.id !== id);
            setCurrentHabilidadesCurso(newCurrentHabilidadesCurso);
        } else {
            setError(response.message);
        }
        setIsLoading(false);
    };

    const handleAdd = async ( data: HabilidadCursoDataType ) => {
        setIsLoading(true);
        const newHabilidadCurso: HabilidadCursoType = {
            id: 0,
            id_curso: idCurso,
            id_grupo_habilidad: data.id_grupo_habilidad,
            id_habilidad: data.id_habilidad,
        };

        const response = await addHabilidadCurso(newHabilidadCurso, token);
        if ( response.success ){
            setCurrentHabilidadesCurso(prev => [...prev,{...newHabilidadCurso, id: response.id}]);
        } else {
            setError(response.message);
        }
        setIsLoading(false);
    };

    return (
        <section className={`${className}`}>
            <div className='flex'>
                <h2 className='title-2'>Habilidades a Desarrollar en el Curso</h2>
                <LoadingComponent isLoading={isLoading} />
            </div>
            {currentHabilidadesCurso.length === 0 ? (
                <p className='italic p-2 text-less-dark'>Este curso aun no cuenta con Habilidades, si used es responsable de este curso, puede agregar habilidades dando clic en el boton Agregar </p>
            ):(
            <ul>
                <ListHeaders
                    className=''
                    headersList={listHeaders}
                    widthList={widths}
                />
                {currentHabilidadesCurso.map((habilidad) => (
                    <HabilidadCurso
                        key={`${habilidad.id}`}
                        token={token}
                        widths={widths}
                        habilidad={habilidad}
                        catalogoGruposHabilidades={catalogoGruposHabilidades}
                        catalogoHabilidades={catalogoHabilidades}
                        className='divider-dark'
                        handleDelete={handleDelete}
                        canEdit={canEdit}
                    />
                ))}
            </ul>
            )}
        {addingMode ? (
            <NewHabilidadCurso
            className=''
            token={token}
            widths={widths}
            catalogoGruposHabilidades={catalogoGruposHabilidades}
            catalogoHabilidades={catalogoHabilidades}
            handleAdd={handleAdd}
            selfDestruct={() => setAddingMode(false)}
                />
        ) : (
            canEdit && (
                <PrimaryButton
                className='ml-auto mr-4 flex'
                buttonLabel='Agregar'
                handleAction={() => setAddingMode(true)}
            />
            )
        )}


            <Alert error={error} setError={setError}/>
            </section>
    );
};
export default TablaHabilidadesCurso;
