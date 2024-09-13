import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { UnidadDetallesType } from '@models/unidad';
import { ActividadType } from '@/models/actividad';
import { useEffect } from 'react';


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
            <select
                id={`actividad-${tipo}`}
                {...register(id_actividad_field)}
                className="w-full p-2 border rounded"
            >
                <option value="">Actividades sugeridas</option>
                {actividades.map((actividad) => (
                    <option key={actividad.id} value={actividad.id}>{actividad.actividad}</option>
                ))}
            </select>

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
