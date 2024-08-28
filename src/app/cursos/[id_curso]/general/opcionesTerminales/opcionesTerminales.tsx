import fakeApiCall from "@/utils/fakeApi";
import { ProgramaType } from "@/models/programa";
import { notFound } from "next/navigation";
import { NivelAcademicoType } from "@/models/nivelAcademico";
import { OpcionTerminalType } from "@/models/opcionTerminal";
import { OpcionTerminalCursoType } from "@/models/opcionTerminalCurso";
import ListaOpcionesTerminales from "./listaOpcionesTerminales";

const OpcionesTerminalesComponent = async ({
    className,
    idCurso,
}:{
    className: string,
    idCurso: number,
}) => {

    const data = await fakeApiCall();
    if(!data.success){
        notFound();
    }

    const catalogoNivelesAcademicos: NivelAcademicoType[] = [
        { id: 1, nivel_academico: 'Introducción' },
        { id: 2, nivel_academico: 'Profundización' },
        { id: 3, nivel_academico: 'Acentuación' },
    ];

    const catalogoProgramas: ProgramaType[] = [
        { id: 1, programa: 'Maestría en Ciencias' },
        { id: 2, programa: 'Doctorado en Ciencias' },
        { id: 3, programa: 'Maestría en Desarrollo Regional' },
        { id: 4, programa: 'Doctorado en Desarrollo Regional' },
    ];

        const opcionesTerminales: OpcionTerminalCursoType[] = [{
        id: 1,
        id_curso: idCurso,
        id_opcion_terminal: 2, // Bioquímica de Proteínas y Glicanos
        id_nivel_academico: 2, // Profundización
        id_programa: 2, // Doctorado en Ciencias
    },{
        id: 2,
        id_curso:idCurso,
        id_opcion_terminal: 1, // Microbiología de Alimentos
        id_nivel_academico: 1, // Introducción
        id_programa: 1, // Maestría en Ciencias
    }];

        const catalogoOpcionesTerminales: OpcionTerminalType[] = [
        { id: 1, opcion_terminal: 'Microbiología de Alimentos' },
        { id: 2, opcion_terminal: 'Bioquímica de Proteínas y Glicanos' },
        { id: 3, opcion_terminal: 'Nutrición y Metabolismo' },
        { id: 4, opcion_terminal: 'Reproducción y Nutrición de Organismos Acuáticos' },
        { id: 5, opcion_terminal: 'Patología de Organismos Acuáticos' },
        { id: 6, opcion_terminal: 'Fisicoquímica de Polímeros' },
        { id: 7, opcion_terminal: 'Ecotoxicología' },
        { id: 8, opcion_terminal: 'Estudio Postcosecha de Productos Hortofrutículas' },
        { id: 9, opcion_terminal: 'Polisacáridos Alimentarios' },
        { id: 10, opcion_terminal: 'Bioprocesos y cultivos in vitro' },
        { id: 11, opcion_terminal: 'Control de patógenos en vegetales' },
        { id: 12, opcion_terminal: 'Enzimas y cinética enzimática' },
        { id: 13, opcion_terminal: 'Calidad e inocuidad de los alimentos' },
        { id: 14, opcion_terminal: 'Conservación de Recursos Naturales' },
        { id: 15, opcion_terminal: 'Toxicología de Alimentos' },
        { id: 16, opcion_terminal: 'No aplica' },
        { id: 17, opcion_terminal: 'Microbiología Ambiental' },
        { id: 18, opcion_terminal: 'Estudios de desarrollo humano y vulnerabilidad social' },
        { id: 19, opcion_terminal: 'Economía y Desarrollo Regional' },
        { id: 20, opcion_terminal: 'Tecnología de conservación y preservación de alimentos' },
    ];

    return (
        <>
            <ListaOpcionesTerminales
                className={className}
                idCurso={idCurso}
                catalogoOpcionesTerminales={catalogoOpcionesTerminales}
                catalogoNivelesAcademicos={catalogoNivelesAcademicos}
                catalogoProgramas={catalogoProgramas}
                opcionesTerminales={opcionesTerminales}
            />
        </>
    );
};

export default OpcionesTerminalesComponent;
