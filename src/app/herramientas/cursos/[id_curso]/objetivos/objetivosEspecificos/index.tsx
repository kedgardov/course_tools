'use client'

import { ObjetivoDataType, ObjetivoType } from '@models/objetivo';
import { useState } from 'react';
import ListHeaders from '@/components/listHeaders';
import WidthType from '@/models/width';
import NewObjetivo from './newObjetivo';
import PrimaryButton from '@/components/primaryButton';
import Objetivo from './objetivo';
import { addObjetivo } from '@/utils/objetivos/addObjetivo';
import Alert from '@/components/alert';
import { deleteObjetivo } from '@/utils/objetivos/deleteObjetivo';
import SectionHeaders from '@/components/SectionHeader';

const ObjetivosEspecificos = ({
    objetivosEspecificos,
    className,
    idCurso,
    token,
}: {
    objetivosEspecificos: ObjetivoType[],
    className: string,
    idCurso: number,
    token: string,
}) => {
    const widths: [WidthType, WidthType] = ['w-[70%]', 'w-[20%]'];

    const [addingMode, setAddingMode] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [currentObjetivos, setCurrentObjetivos] = useState<ObjetivoType[]>(objetivosEspecificos);
    const [error, setError] = useState<string | null>(null);

    const handleAdd = async (data: ObjetivoDataType) => {
        const newObjetivo: ObjetivoType = {
            id: 0,
            id_curso: idCurso,
            objetivo: data.objetivo,
            tipo: 'especifico',
        };
        const response = await addObjetivo(newObjetivo, token);
        if (response.success) {
            setCurrentObjetivos((prev) => [...prev, { ...newObjetivo, id: response.id }]);
            setAddingMode(false);
        } else {
            setError(response.message);
        }
    };

    const handleDeleteObjetivo = async (id: number) => {
        const response = await deleteObjetivo(id, token);
        if (response.success) {
            const newObjetivosEspecificos = currentObjetivos.filter((o) => o.id !== id);
            setCurrentObjetivos(newObjetivosEspecificos);
        } else {
            setError(response.message);
        }
    };

    return (
        <section className={`${className}`}>
            <SectionHeaders
                className=''
                sectionHeader='Objetivos Especificos del Curso'
                helpText='De clic aqui para editar los objetivos especificos del curso'
                editMode={editMode}
                startEditMode={() => setEditMode(true)}
                isLoading={false}
            />

            <ListHeaders
                className='divider-dark'
                headersList={['Objetivo', 'Acciones']}
                widthList={widths}
            />

            {currentObjetivos.length === 0 ? (
                <p className='italic p-2 text-less-dark'>
                    Este curso aun no cuenta con objetivos especificos, para agregar una presione el boton de agregar
                </p>
            ) : (
                <ul>
                    {currentObjetivos.map((objetivo) => (
                        <Objetivo
                            key={objetivo.id}
                            className=''
                            objetivo={objetivo}
                            token={token}
                            handleDelete={handleDeleteObjetivo}
                            widthList={widths}
                        />
                    ))}
                </ul>
            )}

            {addingMode ? (
                <NewObjetivo
                    className='divider-dark p-1'
                    widthList={widths}
                    handleAdd={handleAdd}
                    selfDestruct={() => setAddingMode(false)}
                />
            ) : (
                <PrimaryButton className='flex ml-auto mr-4' handleAction={() => setAddingMode(true)} buttonLabel='Agregar' />
            )}

            <Alert error={error} setError={setError} />
        </section>
    );
};

export default ObjetivosEspecificos;
