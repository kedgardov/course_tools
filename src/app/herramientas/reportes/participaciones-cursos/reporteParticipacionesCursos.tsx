'use client'
import { MaestroType } from "@/models/maestro";
import { NivelCurricularType } from "@/models/nivelCurricular";
import { OpcionTerminalType } from "@/models/opcionTerminal";
import { ParticipacionCursoType } from "@/models/participacionCurso";
import { ParticipacionesDocentesType } from "@/models/participacionTesis";
import { ProgramaType } from "@/models/programa";
import { RolType } from "@/models/rol";
import WidthType from "@/models/width";
import { useState } from "react";
import ListaParticipacionesCursos from "./listaParticipacionesCursos";
import FiltrosParticipantesCursos from "./filtrosParticipacionesCursos";
import PlotParticipacionesCursos from "./plotParticipacionesCursos";

const ReporteParticipacionesCursos = ({
    className,
    catalogoMaestros,
    catalogoRoles,
    catalogoProgramas,
    catalogoNivelesCurriculares,
    catalogoOpcionesTerminales,
    participacionesCursos,
}:{
    className: string,
    catalogoMaestros: MaestroType[],
    catalogoRoles: RolType[],
    catalogoProgramas: ProgramaType[],
    catalogoNivelesCurriculares: NivelCurricularType[],
    catalogoOpcionesTerminales: OpcionTerminalType[],
    participacionesCursos: ParticipacionCursoType[],
}) => {
    const widths: [ WidthType, WidthType, WidthType ] = ['w-[60%]', 'w-[20%]','w-[20%]'];
    const [ currentParticipantes, setCurrentParticipantes ] = useState<ParticipacionesDocentesType[]>([]);
    const [ currentParticipaciones, setCurrentParticipaciones ] = useState<ParticipacionCursoType[]>(participacionesCursos);

    return (
        <div>
            <PlotParticipacionesCursos
                className=''
                currentParticipaciones={currentParticipaciones}
                catalogoOpcionesTerminales={catalogoOpcionesTerminales}
                catalogoProgramas={catalogoProgramas}
                catalogoNivelesCurriculares={catalogoNivelesCurriculares}
                catalogoRoles={catalogoRoles}
            />
            <FiltrosParticipantesCursos
                className=''
                setCurrentParticipaciones={setCurrentParticipaciones}
                setCurrentParticipantes={setCurrentParticipantes}
                catalogoOpcionesTerminales={catalogoOpcionesTerminales}
                catalogoProgramas={catalogoProgramas}
                catalogoNivelesCurriculares={catalogoNivelesCurriculares}
                catalogoRoles={catalogoRoles}
                participacionesCursos={participacionesCursos}
            />
            {`${currentParticipantes.length} Docentes Participando en Estos Cursos`}
            <ListaParticipacionesCursos
                className=''
                currentParticipantes={currentParticipantes}
                catalogoMaestros={catalogoMaestros}
                widthList={widths}
            />
        </div>
    );
};
export default ReporteParticipacionesCursos;
