import { ModalidadCursoType } from '@/models/modalidadCurso';
import DatosBasicosForm from './datosBasicosForm';

import fakeApiCall from "@/utils/fakeApi";

import { CursoType } from '@models/curso';
import { TipoCursoType } from '@models/tipoCurso';


const DatosBasicosComponent = async ({
    idCurso,
    className,
}:{
    className: string,
    idCurso: number,
}) => {

    const data = await fakeApiCall();
    console.log(idCurso, data);

    const curso: CursoType = {
        id: idCurso, // Non-negative integer
        clave: "CUR12345", // String with max 15 characters
        nombre: "Introducción a la Programación", // String with max 120 characters
        nombre_ingles: "Introduction to Programming", // Nullable string with max 120 characters
        id_tipo: 2, // Non-negative integer (could be the ID of the course type)
        id_modalidad: 1, // Non-negative integer (could be the ID of the course modality)
        horas_teoricas: 30, // Nullable non-negative integer, less than 100
        horas_practicas: 20, // Nullable non-negative integer, less than 100
        horas_independientes: 15, // Nullable non-negative integer, less than 100
        horas_semana: 65, // Nullable non-negative integer, less than 100
        horas_semestre: 195, // Nullable non-negative integer, less than 300
        vinculo_objetivos_posgrado: "Este curso está vinculado con los objetivos del posgrado en ciencias computacionales.", // Nullable string with max 1200 characters
        id_rol: 3, // Non-negative integer (could be the ID of the role)
    };

    const catalogoTiposCursos: TipoCursoType[] = [
        {id:1, tipo_curso: 'Optativo'},
        {id:2, tipo_curso: 'Obligatorio'},
    ];

    const catalogoModalidadesCursos: ModalidadCursoType[] = [
        {id:1, modalidad_curso: 'Presencial'},
        {id:2, modalidad_curso: 'Virtual'},
        {id:3, modalidad_curso: 'Hibrida'},
    ];

    return (
        <DatosBasicosForm
            className={className}
            idCurso={idCurso}
            curso={curso}
            catalogoTiposCursos={catalogoTiposCursos}
            catalogoModalidadesCursos={catalogoModalidadesCursos}
        />
    );
};

export default DatosBasicosComponent;
