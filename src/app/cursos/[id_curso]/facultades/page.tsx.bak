import { notFound } from 'next/navigation';
import ListaOpcionesTerminales from './opcionesTerminales';
import { parseId } from '@utils/parseId';
import { OpcionTerminalType } from '@/models/opcionTerminal';
import { ModalidadType } from '@/models/modalidad';
import { ProgramaType } from '@/models/programa';
import { OpcionTerminalCursoType } from '@/models/opcionTerminalCurso';
import ListaLGACs from './lgacs';
import { LGACType } from '@/models/lgac';
import { LGACCursoType } from '@/models/lgacCurso';

const Facultades = ({
    params,
}:{
    params: { id_curso: string }
}) => {

    const idCurso = parseId(params.id_curso);
    if(!idCurso){
        notFound();
    }

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

    const catalogoModalidades: ModalidadType[] = [
        { id: 1, modalidad: 'Introducción' },
        { id: 2, modalidad: 'Profundización' },
        { id: 3, modalidad: 'Acentuación' },
    ];

    const catalogoProgramas: ProgramaType[] = [
        { id: 1, programa: 'Maestría en Ciencias' },
        { id: 2, programa: 'Doctorado en Ciencias' },
        { id: 3, programa: 'Maestría en Desarrollo Regional' },
        { id: 4, programa: 'Doctorado en Desarrollo Regional' },
    ];

    const catalogoLGACs: LGACType[] = [
        { id: 1, lgac: 'Ciencia y Tecnología de Alimentos' },
        { id: 2, lgac: 'Microbiología' },
        { id: 3, lgac: 'Nutrición' },
        { id: 4, lgac: 'Acuacultura' },
        { id: 5, lgac: 'Biopolímeros' },
        { id: 6, lgac: 'Bioquímica' },
        { id: 7, lgac: 'Biotecnología' },
        { id: 8, lgac: 'Toxicología' },
        { id: 9, lgac: 'Horticultura' },
        { id: 10, lgac: 'No aplica' },
    ];

    const lgacs: LGACCursoType[] =[
        {
            id: 1,
            id_curso: idCurso,
            id_lgac: 1, // Ciencia y Tecnología de Alimentos
            id_modalidad: 1, // Introducción
            id_programa: 1, // Maestría en Ciencias
        },{
            id: 2,
            id_curso: idCurso,
            id_lgac: 2, // Microbiología
            id_modalidad: 2, // Profundización
            id_programa: 2, // Doctorado en Ciencias
        },
    ];

    const opcionesTerminales: OpcionTerminalCursoType[] = [{
        id: 1,
        id_curso: idCurso,
        id_opcion_terminal: 2, // Bioquímica de Proteínas y Glicanos
        id_modalidad: 2, // Profundización
        id_programa: 2, // Doctorado en Ciencias
    },{
        id: 2,
        id_curso:idCurso,
        id_opcion_terminal: 1, // Microbiología de Alimentos
        id_modalidad: 1, // Introducción
        id_programa: 1, // Maestría en Ciencias
    }];

    return (
        <section>
            <ListaLGACs
                className=''
                idCurso={idCurso}
                catalogoModalidades={catalogoModalidades}
                catalogoLGACs={catalogoLGACs}
                catalogoProgramas={catalogoProgramas}
                lgacs={lgacs}
            />
            <ListaOpcionesTerminales
                className=''
                idCurso={idCurso}
                catalogoModalidades={catalogoModalidades}
                catalogoOpcionesTerminales={catalogoOpcionesTerminales}
                catalogoProgramas={catalogoProgramas}
                opcionesTerminales={opcionesTerminales}
            />
        </section>
    );
};

export default Facultades;
