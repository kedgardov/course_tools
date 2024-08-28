import fakeApiCall from "@/utils/fakeApi";
import ListaLGACs from './listaLgacs';
import { ProgramaType } from "@/models/programa";
import { LGACType } from "@/models/lgac";
import { LGACCursoType } from "@/models/lgacCurso";
import { notFound } from "next/navigation";
import { NivelAcademicoType } from "@/models/nivelAcademico";

const LGACsComponent = async ({
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
            id_nivel_academico: 1, // Introducción
            id_programa: 1, // Maestría en Ciencias
        },{
            id: 2,
            id_curso: idCurso,
            id_lgac: 2, // Microbiología
            id_nivel_academico: 2, // Profundización
            id_programa: 2, // Doctorado en Ciencias
        },
    ];


    return (
        <>
            <ListaLGACs
                className={className}
                idCurso={idCurso}
                catalogoLGACs={catalogoLGACs}
                catalogoNivelesAcademicos={catalogoNivelesAcademicos}
                catalogoProgramas={catalogoProgramas}
                lgacs={lgacs}
            />
        </>
    );
};

export default LGACsComponent;
