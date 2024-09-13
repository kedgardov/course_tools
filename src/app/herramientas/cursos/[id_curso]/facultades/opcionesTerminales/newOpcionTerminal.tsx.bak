'use client'
import { ModalidadType } from '@/models/modalidad';
import { OpcionTerminalType } from '@/models/opcionTerminal';
import { OpcionTerminalCursoDataScheme, OpcionTerminalCursoDataType } from '@/models/opcionTerminalCurso';
import { ProgramaType } from '@/models/programa';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import WidthType from '@models/width';
import SecondarySubmit from '@/components/secondarySubmit';
import TertiaryButton from '@/components/tertiaryButton';
import SelectInput from '@/components/selectInput';

const NewOpcionTerminal= ({
    className,
    selfDestruct,
    handleAddOpcionTerminal,
    catalogoOpcionesTerminales,
    catalogoProgramas,
    catalogoModalidades,
    widthList,
}:{
    className: string,
    selfDestruct: () => void,
    handleAddOpcionTerminal: (data: OpcionTerminalCursoDataType) => void,
    catalogoOpcionesTerminales: OpcionTerminalType[],
    catalogoProgramas: ProgramaType[],
    catalogoModalidades: ModalidadType[],
    widthList: [WidthType, WidthType, WidthType, WidthType],
}) => {

    const { register, handleSubmit, reset, formState:{ errors, isDirty } } = useForm<OpcionTerminalCursoDataType>({
        resolver: zodResolver(OpcionTerminalCursoDataScheme),
    });

    const onSubmit: SubmitHandler<OpcionTerminalCursoDataType> = (data) => {
        console.log(data);
        handleAddOpcionTerminal(data);
        selfDestruct();
    }

    const handleCancel = () => {
        reset();
        selfDestruct();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className={`${className} flex`}
        >
            <div className={widthList[0]}>
                <SelectInput<OpcionTerminalType>
                    className='w-full'
                    idPrefix='id-opcion-terminal'
                    idRaw='0'
                    register={register('id_opcion_terminal',{ valueAsNumber:true })}
                    editMode={true}
                    options={catalogoOpcionesTerminales}
                    error={errors.id_opcion_terminal}
                    placeholder='Selecciona una Opcion Terminal'
                    idKey='id'
                    valueKey='opcion_terminal'
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
                />
            </div>
            <div className={widthList[2]}>
                <SelectInput<ModalidadType>
                    idPrefix='id-modalidad-curso'
                    idRaw='0'
                    className='w-full'
                    register={register('id_modalidad',{ valueAsNumber:true })}
                    editMode={true}
                    options={catalogoModalidades}
                    error={errors.id_modalidad}
                    placeholder='Selecciona una modalidad'
                    idKey='id'
                    valueKey='modalidad'
            />
            </div>
            <div className={`flex ${widthList[3]}`}>
                <SecondarySubmit isDirty={isDirty} className='w-1/2 mx-1' buttonLabel='Guardar'/>
                <TertiaryButton className='w-1/2 mx-1' buttonLabel='Cancelar' handleAction={() => handleCancel()}/>
            </div>
        </form>
    );
};

export default NewOpcionTerminal;
