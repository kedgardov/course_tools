'use client'
import { ProgramaType } from '@/models/programa';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import WidthType from '@/models/width';
import SelectInput from '@/components/selectInput';
import SecondarySubmit from '@/components/secondarySubmit';
import TertiaryButton from '@/components/tertiaryButton';
import { OpcionTerminalCursoDataScheme, OpcionTerminalCursoDataType } from '@/models/opcionTerminalCurso';
import { OpcionTerminalType } from '@/models/opcionTerminal';
import { NivelCurricularType } from '@/models/nivelCurricular';


const NewOpcionTerminal= ({
    className,
    selfDestruct,
    handleAddOpcionTerminal,
    catalogoOpcionesTerminales,
    catalogoProgramas,
    catalogoNivelesCurriculares,
    widthList,
}:{
    className: string,
    selfDestruct: () => void,
    handleAddOpcionTerminal: (data: OpcionTerminalCursoDataType) => void,
    catalogoOpcionesTerminales: OpcionTerminalType[],
    catalogoProgramas: ProgramaType[],
    catalogoNivelesCurriculares: NivelCurricularType[],
    widthList: [WidthType, WidthType, WidthType, WidthType]
}) => {

    const { register, handleSubmit, reset, formState:{ errors, isDirty } } = useForm<OpcionTerminalCursoDataType>({
        resolver: zodResolver(OpcionTerminalCursoDataScheme),
    });

    const onSubmit: SubmitHandler<OpcionTerminalCursoDataType> = (data) => {
        console.log(data);
        handleAddOpcionTerminal(data);
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
                <SelectInput<OpcionTerminalType>
                    className='w-full'
                    idPrefix='id-opcion-terminal'
                    idRaw='0'
                    register={register('id_opcion_terminal', { valueAsNumber:true })}
                    editMode={true}
                    options={catalogoOpcionesTerminales}
                    error={errors.id_opcion_terminal}
                    placeholder='Selecciona una Opcion Terminal'
                    idKey='id'
                    valueKey='opcion_terminal'
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
                    idPrefix='id-modalidad-curso-en-opcion-terminal'
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

export default NewOpcionTerminal;
