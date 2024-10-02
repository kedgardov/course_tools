'use client'
import { CursoNombreType } from "@/models/curso";
import { NivelCurricularType } from "@/models/nivelCurricular";
import { OpcionTerminalType } from "@/models/opcionTerminal";
import { OpcionTerminalCursoType } from "@/models/opcionTerminalCurso";
import { ProgramaType } from "@/models/programa";
import ListaCursos from "./listaCursos";
import FiltrosCursos from "./filtrosCursos";
import { useState } from "react";
import CursosPlot from "./cursosPlot";
import { downloadCSV } from "@/utils/downloadCSV";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const ReporteCursos = ({
    className,
    catalogoCursos,
    catalogoNivelesCurriculares,
    catalogoProgramas,
    catalogoOpcionesTerminales,
    opcionesTerminales,
}:{
    className: string,
    catalogoCursos: CursoNombreType[],
    catalogoNivelesCurriculares: NivelCurricularType[],
    catalogoProgramas: ProgramaType[],
    catalogoOpcionesTerminales: OpcionTerminalType[],
    opcionesTerminales: OpcionTerminalCursoType[],
}) => {
    const [currentOpcionesTerminales, setCurrentOpcionesTerminales] = useState<OpcionTerminalCursoType[]>(opcionesTerminales);


    const handleDownloadCSV = () => {
        // Create a list of objects to download
        const dataToDownload = currentOpcionesTerminales.map((opcionTerminal) => ({
            curso: catalogoCursos.find((c) => c.id === opcionTerminal.id_curso)?.nombre || '',
            opcion_terminal: catalogoOpcionesTerminales.find((ot) => ot.id === opcionTerminal.id_opcion_terminal)?.opcion_terminal || '',
            programa: catalogoProgramas.find((p) => p.id === opcionTerminal.id_programa)?.programa || '',
            nivel_curricular: catalogoNivelesCurriculares.find((nc) => nc.id === opcionTerminal.id_nivel_curricular)?.nivel_curricular || ''
        }));

        downloadCSV(dataToDownload, "Cursos");
    };

    return (
        <div className={`${className}`}>
            <CursosPlot
                className=''
                currentOpcionesTerminales={currentOpcionesTerminales}
                catalogoOpcionesTerminales={catalogoOpcionesTerminales}
                catalogoProgramas={catalogoProgramas}
                catalogoNivelesCurriculares={catalogoNivelesCurriculares}
            />
            <FiltrosCursos
                className=''
                catalogoNivelesCurriculares={catalogoNivelesCurriculares}
                catalogoProgramas={catalogoProgramas}
                catalogoOpcionesTerminales={catalogoOpcionesTerminales}
                setCurrentOpcionesTerminales={setCurrentOpcionesTerminales}
                opcionesTerminales={opcionesTerminales}
            />
            <div className='flex items-center m-1 space-x-2'>
                <p>{`Total de ${currentOpcionesTerminales.length} Modalidades de Curso Ofrecidas`}</p>
                <button title='Descargar Lista de Cursos' onClick={() => handleDownloadCSV()} >
                    <ArrowDownTrayIcon className='size-6'/>
                </button>
            </div>
            <ListaCursos
                className=''
                currentOpcionesTerminales={currentOpcionesTerminales}
                catalogoCursos={catalogoCursos}
                catalogoProgramas={catalogoProgramas}
                catalogoOpcionesTerminales={catalogoOpcionesTerminales}
                catalogoNivelesCurriculares={catalogoNivelesCurriculares}
            />
        </div>
    );
};
export default ReporteCursos;
