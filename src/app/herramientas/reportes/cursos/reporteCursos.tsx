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
            <p>{`Total de ${currentOpcionesTerminales.length} Modalidades de Curso Ofrecidas`}</p>
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
