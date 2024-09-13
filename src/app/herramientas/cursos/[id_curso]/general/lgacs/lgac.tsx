'use client'
import DeleteButton from '@/components/deleteButton';
import EditButton from '@/components/editButton';
import SecondarySubmit from '@/components/secondarySubmit';
import SelectInput from '@/components/selectInput';
import TertiaryButton from '@/components/tertiaryButton';
import { LGACType } from '@/models/lgac';
import { LGACCursoDataScheme, LGACCursoDataType, LGACCursoType } from '@/models/lgacCurso';
import { NivelCurricularType } from '@/models/nivelCurricular';
import { ProgramaType } from '@/models/programa';
import WidthType from '@/models/width';
import { updateLGAC } from '@/utils/facultades/updateLGAC';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';



const LGAC = ({
    className,
    lgac,
    token,
    handleDelete,
    catalogoLGACs,
    catalogoProgramas,
    catalogoNivelesCurriculares,
    widthList,
    startLoadingMode,
    stopLoadingMode,
    setError,
}:{
    className: string,
    lgac: LGACCursoType,
    token: string,
    handleDelete: (id: number) => void,
    catalogoLGACs: LGACType[],
    catalogoProgramas: ProgramaType[],
    catalogoNivelesCurriculares: NivelCurricularType[],
    widthList:[WidthType, WidthType, WidthType, WidthType],
    startLoadingMode: () => void,
    stopLoadingMode: () => void,
    setError: (error: string | null) => void,
}) => {

    const [editMode, setEditMode] = useState<boolean>(false);

    const { register, handleSubmit, reset, formState:{ errors, isDirty } } = useForm<LGACCursoDataType>({
        resolver: zodResolver(LGACCursoDataScheme),
        defaultValues: LGACCursoDataScheme.parse(lgac)
    });

    const onSubmit: SubmitHandler<LGACCursoDataType> = async (data) => {
        startLoadingMode()
        const updatedLGAC: LGACCursoType = {
            ...lgac,
            id_lgac: data.id_lgac,
            id_programa: data.id_programa,
            id_nivel_curricular: data.id_nivel_curricular,
        };
        const response = await updateLGAC(updatedLGAC, token);
        if(response.success){
            reset(data);
            setEditMode(false);
        }else{
            setError(response.message+'');
        }
        stopLoadingMode();
    }

    const handleCancel = () => {
        reset();
        setEditMode(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className={`${className}`}
        >
            <div className={widthList[0]}>
                <SelectInput<LGACType>
                    className='w-full'
                    idPrefix='id-linea-generacion-aplicacion-conocimiento'
                    idRaw={`${lgac.id}`}
                    register={register('id_lgac', { valueAsNumber: true })}
                    editMode={editMode}
                    options={catalogoLGACs}
                    error={errors.id_lgac}
                    placeholder='Selecciona una LGAC'
                    idKey='id'
                    valueKey='lgac'
                    showBorder={false}
                />
            </div>
            <div className={widthList[1]}>
                <SelectInput<ProgramaType>
                    className='w-full'
                    idPrefix='id-programa-academico'
                    idRaw={`${lgac.id_programa}`}
                    register={register('id_programa', { valueAsNumber: true })}
                    editMode={editMode}
                    options={catalogoProgramas}
                    error={errors.id_programa}
                    placeholder='Selecciona un Programa'
                    idKey='id'
                    valueKey='programa'
                    showBorder={false}
                />
            </div>
            <div className={widthList[2]}>
                <SelectInput<NivelCurricularType>
                    className='w-full'
                    idPrefix='id-nivel-curricular-curso-lgac'
                    idRaw={`${lgac.id_nivel_curricular}`}
                    register={register('id_nivel_curricular', { valueAsNumber: true })}
                    editMode={editMode}
                    options={catalogoNivelesCurriculares}
                    error={errors.id_nivel_curricular}
                    placeholder='Seleccion un Nivel Curricular'
                    idKey='id'
                    valueKey='nivel_curricular'
                    showBorder={false}
                />
            </div>
            <div className={widthList[3]}>
            {editMode? (
                <div className='flex'>
                    <SecondarySubmit isDirty={isDirty} className='w-1/2 mx-1' buttonLabel='Guardar'/>
                    <TertiaryButton className='w-1/2 mx-1' handleAction={() => handleCancel()} buttonLabel='Cancelar'/>
                </div>
            ):(
                <>
                    <EditButton title='Editar LGAC' className='mx-2' handleEdit={() => setEditMode(true)}/>
                    <DeleteButton title='Eliminar LGAC' className='mx-2' handleDelete={ () => handleDelete(lgac.id) }/>
                </>
            )}
            </div>
        </form>
    );
};

export default LGAC;
