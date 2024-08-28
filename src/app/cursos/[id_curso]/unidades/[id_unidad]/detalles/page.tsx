import Link from "next/link";
import { parseId } from '@utils/parseId';
import { notFound } from "next/navigation";
import DetallesUnidadClient from './detalles';
import { ActividadType } from '@models/actividad';
import { HabilidadType } from '@models/habilidad';
import { CategoriaHabilidadType } from '@models/categoriaHabilidad';
import { TipoHabilidadType } from '@models/tipoHabilidad';
import { UnidadType } from '@models/unidad';
import { ArrowTurnLeftUpIcon } from '@heroicons/react/24/outline'

const DetallesUnidad = ({ params }:{ params: { id_curso: string, id_unidad: string } }) => {

    const idCurso = parseId(params.id_curso);
    const idUnidad = parseId(params.id_unidad);
    if(!idCurso || !idUnidad) {
        return notFound();
    }

    const unidad: UnidadType = {
        id: 1,
        id_curso: idCurso,
        numero: 1,
        titulo: `Unidad ${idUnidad}`,
        objetivo: 'Objetivo de la unidad',
        id_tipo_habilidad: 1,
        id_habilidad: 1,
        id_categoria: 128,
        id_actividad_presencial: 161,
        id_actividad_independiente: 171,
        id_actividad_tarea: 181,
        descripcion_actividad_presencial: 'Descripción de la actividad presencial',
        descripcion_actividad_independiente: 'Descripción de la actividad independiente',
        descripcion_actividad_tarea: 'Descripción de la actividad de tarea',
        evidencia_presencial: 'Evidencia presencial',
        evidencia_independiente: 'Evidencia independiente',
        evidencia_tarea: 'Evidencia de tarea',
    };

    const catalogoHabilidades: HabilidadType[] = [
        { id: 1, id_tipo_habilidad: 1, habilidad: 'Pensamiento crítico' },
        { id: 2, id_tipo_habilidad: 1, habilidad: 'Creatividad' },
        { id: 3, id_tipo_habilidad: 1, habilidad: 'Aprendizaje autónomo y continuo' },
        { id: 4, id_tipo_habilidad: 1, habilidad: 'Adaptabilidad y flexibilidad' },
        { id: 5, id_tipo_habilidad: 2, habilidad: 'Ciudadanía global y conciencia intercultural' },
        { id: 6, id_tipo_habilidad: 2, habilidad: 'Responsabilidad social y ética' },
        { id: 7, id_tipo_habilidad: 2, habilidad: 'Colaboración' },
        { id: 8, id_tipo_habilidad: 3, habilidad: 'Comunicación efectiva' },
        { id: 9, id_tipo_habilidad: 3, habilidad: 'Alfabetización digital' },
    ];

    const catalogoCategoriasHabilidad: CategoriaHabilidadType[] = [
        { id: 128, id_habilidad: 1, categoria: 'Analizar' },
        { id: 129, id_habilidad: 1, categoria: 'Evaluar' },
        { id: 130, id_habilidad: 1, categoria: 'Comparar' },
        { id: 131, id_habilidad: 1, categoria: 'Argumentar' },
        { id: 132, id_habilidad: 1, categoria: 'Sintetizar' },
        { id: 133, id_habilidad: 1, categoria: 'Cuestionar' },
        { id: 143, id_habilidad: 2, categoria: 'Imaginar' },
        { id: 144, id_habilidad: 2, categoria: 'Experimentar' },
        { id: 145, id_habilidad: 2, categoria: 'Crear' },
        { id: 146, id_habilidad: 2, categoria: 'Innovar' },
        { id: 147, id_habilidad: 2, categoria: 'Improvisar' },
        { id: 148, id_habilidad: 2, categoria: 'Diseñar' },
    ];

    const catalogoActividades: ActividadType[] = [
        { id: 161, id_habilidad: 1, actividad: 'Debates académicos', descripcion: 'Organiza debates sobre temas de actualidad o controversiales relacionados con sus áreas de estudio, animándolos a argumentar y analizar diferentes perspectivas.' },
        { id: 162, id_habilidad: 1, actividad: 'Análisis de literatura científica', descripcion: 'Proporciona artículos científicos relevantes y desafía a los estudiantes a analizar, evaluar y discutir la validez y la relevancia de los hallazgos.' },
        { id: 163, id_habilidad: 1, actividad: 'Estudios de casos complejos', descripcion: 'Presenta casos complejos o problemas prácticos que requieran un análisis crítico y una toma de decisiones fundamentada.' },
        { id: 171, id_habilidad: 2, actividad: 'Desafíos de resolución de problemas', descripcion: 'Proporciona a los estudiantes problemas complejos relacionados con su área de estudio y desafíales a encontrar soluciones creativas e innovadoras.' },
        { id: 172, id_habilidad: 2, actividad: 'Proyectos de investigación exploratoria', descripcion: 'Permite que los estudiantes exploren temas de investigación poco convencionales y abran nuevas perspectivas en sus campos de estudio.' },
        { id: 181, id_habilidad: 3, actividad: 'Proyectos de investigación independiente', descripcion: 'Fomenta que los estudiantes elijan temas de su interés y desarrollen proyectos de investigación de manera autónoma, bajo la supervisión de un tutor o asesor.' },
    ];

    const catalogoTiposHabilidad: TipoHabilidadType[] = [
        { id: 1, tipo: 'Cognitivas y de Autogestión' },
        { id: 2, tipo: 'Sociales' },
        { id: 3, tipo: 'Comunicativas' },
    ];

    return (
        <section>
            <DetallesUnidadClient
                unidad={unidad}
                idUnidad={idUnidad}
                idCurso={idCurso}
                catalogoTiposHabilidad={catalogoTiposHabilidad}
                catalogoHabilidades={catalogoHabilidades}
                catalogoCategoriasHabilidad={catalogoCategoriasHabilidad}
                catalogoActividades={catalogoActividades}
            />
        </section>
    );
};

export default DetallesUnidad;
