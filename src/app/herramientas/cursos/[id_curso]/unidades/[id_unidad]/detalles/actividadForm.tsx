import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { UnidadDetallesType } from '@models/unidad';
import { ActividadType } from '@/models/actividad';
import { useEffect } from 'react';
import SelectInput from '@/components/selectInput';


const ActividadForm = ({
    className,
    tipo,
    id_actividad_field,
    idHabilidad,
    descripcion_actividad_field,
    evidencia_actividad_field,
    register,
    actividades,
    setValue,
    watch,
    editMode,
    errors,
}: {
    className: string,
    tipo: string,
    id_actividad_field: keyof UnidadDetallesType,
    idHabilidad: number| null,
    descripcion_actividad_field: keyof UnidadDetallesType,
    evidencia_actividad_field: keyof UnidadDetallesType,
    register: UseFormRegister<any>,
    actividades: ActividadType[],
    setValue: UseFormSetValue<any>,
    watch: UseFormWatch<any>,
    editMode: boolean,
    errors: FieldErrors,
}) => {

    const idActividad = Number(watch(id_actividad_field));

    useEffect(()=>{
         setValue(id_actividad_field, null);
    },[idHabilidad, id_actividad_field, setValue]);

    useEffect(()=>{
        if(idActividad){
            const newActividad = actividades.find((actividad) => actividad.id === idActividad);
            setValue(descripcion_actividad_field, newActividad?.descripcion);
        }
    },[idActividad, actividades, descripcion_actividad_field, setValue]);


    return (
        <div className={`${className}`}>
            <p className="text-xl pb-2">Actividad {tipo}</p>

            <SelectInput<ActividadType>
                className=''
                idRaw='0'
                idPrefix={`id-actividad-${tipo}`}
                register={register(id_actividad_field, { valueAsNumber: true})}
                editMode={editMode}
                options={actividades}
                error={undefined}
                placeholder='Seleccione una actividad'
                idKey='id'
                valueKey='actividad'
                showBorder={true}
            />
            <textarea
                id={`descripcion-${tipo}`}
                {...register(descripcion_actividad_field)}
                placeholder={`Descripción de la actividad ${tipo}`}
                className="w-full h-32 p-2 border rounded"
            />

            <textarea
                id={`evidencia-${tipo}`}
                {...register(evidencia_actividad_field)}
                placeholder={`Evidencia de la actividad ${tipo}`}
                className="w-full h-16 p-2 border rounded"
            />
        </div>
    );
};

export default ActividadForm;
