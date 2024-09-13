'use client'
import { LGACType } from '@/models/lgac';
import { LGACCursoDataType, LGACCursoDataScheme } from '@models/lgacCurso';
import { ProgramaType } from '@/models/programa';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import WidthType from '@/models/width';
import SelectInput from '@/components/selectInput';
import SecondarySubmit from '@/components/secondarySubmit';
import TertiaryButton from '@/components/tertiaryButton';
import { NivelCurricularType } from '@/models/nivelCurricular';


const NewLGAC= ({
    className,
    selfDestruct,
    handleAddLGAC,
    catalogoLGACs,
    catalogoProgramas,
    catalogoNivelesCurriculares,
    widthList,
}:{
    className: string,
    selfDestruct: () => void,
    handleAddLGAC: (data: LGACCursoDataType) => void,
    catalogoLGACs: LGACType[],
    catalogoProgramas: ProgramaType[],
    catalogoNivelesCurriculares: NivelCurricularType[],
    widthList: [WidthType, WidthType, WidthType, WidthType]
}) => {

    const { register, handleSubmit, reset, formState:{ errors, isDirty } } = useForm<LGACCursoDataType>({
        resolver: zodResolver(LGACCursoDataScheme),
    });

    const onSubmit: SubmitHandler<LGACCursoDataType> = (data) => {
        console.log(data);
        handleAddLGAC(data);
    }

    const handleCancel = () => {
        reset();
        selfDestruct();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className={`${className}`}
        >
            <div className={widthList[0]}>
                <SelectInput<LGACType>
                    className='w-full'
                    idPrefix='id-linea-generacion-acplicacion-contenido'
                    idRaw='0'
                    register={register('id_lgac', { valueAsNumber:true })}
                    editMode={true}
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
                    idRaw='0'
                    register={register('id_programa', { valueAsNumber:true })}
                    editMode={true}
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
                    idPrefix='id-modalidad-curso-lgac'
                    idRaw='0'
                    register={register('id_nivel_curricular', { valueAsNumber:true })}
                    editMode={true}
                    options={catalogoNivelesCurriculares}
                    error={errors.id_nivel_curricular}
                    placeholder='Selecciona un Nivel'
                    idKey='id'
                    valueKey='nivel_curricular'
                    showBorder={false}
                />
            </div>
            <div className={`flex ${widthList[3]}`}>
                <SecondarySubmit isDirty={isDirty} className='w-1/2 mx-1' buttonLabel='Guardar'/>
                <TertiaryButton className='w-1/2 mx-1' buttonLabel='Cancelar' handleAction={()=> handleCancel()} />
            </div>
        </form>
    );
};

export default NewLGAC;
