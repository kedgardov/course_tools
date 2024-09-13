'use client'

import TextInputLabel from "@/components/textInputLabel";
import { MaestroDetallesDataScheme, MaestroDetallesDataType, MaestroDetallesType } from "@/models/maestro";
import { UserIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const DetallesDocenteForm = ({
    maestro,
}:{
    maestro: MaestroDetallesType,
}) => {

    const { register, formState:{ errors, isDirty } } = useForm<MaestroDetallesDataType>({
        resolver: zodResolver(MaestroDetallesDataScheme),
        defaultValues: MaestroDetallesDataScheme.parse(maestro),
    });

    return (
        <form className=' flex'>
            <div className='m-2 p-2 w-48 h-48 bg-gray-300 border border-0 rounded-lg'>
                <UserIcon/>
            </div>
            <fieldset className='flex-grow border m-2 p-2'>
                <legend>
                    Datos Generales del Docente
                </legend>
                <div className='flex m-1'>
                    <TextInputLabel
                        className='w-[10%] m-1'
                        idPrefix='grado-docente'
                        idRaw={`${maestro.id}`}
                        label='Grado'
                        helpText='Grado academico del docente'
                        editMode={false}
                        register={register('grado')}
                        placeholder='Grado'
                        error={errors.grado}
                        showBorder={true}
                    />
                    <TextInputLabel
                        className='w-[45%] m-1'
                        idPrefix='nombre-docente'
                        idRaw={`${maestro.id}`}
                        label='Nombre(s) del Docente'
                        helpText=''
                        editMode={false}
                        register={register('nombre')}
                        placeholder='Nombre(s) del docente'
                        error={errors.grado}
                        showBorder={true}
                    />
                    <TextInputLabel
                        className='w-[45%] m-1'
                        idPrefix='apellido-docente'
                        idRaw={`${maestro.id}`}
                        label='Apellido(s) del Docente'
                        helpText=''
                        editMode={false}
                        register={register('apellido')}
                        placeholder='Apellido(s) del docente'
                        error={errors.grado}
                        showBorder={true}
                    />

                </div>
                <TextInputLabel
                        className='m-2 w-1/4'
                        idPrefix='email-docente'
                        idRaw={`${maestro.id}`}
                        label='Email Docente'
                        helpText=''
                        editMode={false}
                        register={register('email')}
                        placeholder='Introduzca el email del docente'
                        error={errors.grado}
                        showBorder={true}
                    />

            </fieldset>
        </form>
    );
};
export default DetallesDocenteForm;
