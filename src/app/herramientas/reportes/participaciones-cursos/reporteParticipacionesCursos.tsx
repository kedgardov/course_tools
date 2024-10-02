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
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { CursoMiniType } from "@/models/curso";
import { downloadCSV } from "@/utils/downloadCSV";

const ReporteParticipacionesCursos = ({
    className,
    catalogoMaestros,
    catalogoRoles,
    catalogoProgramas,
    catalogoNivelesCurriculares,
    catalogoOpcionesTerminales,
    participacionesCursos,
    cursosMini,
}:{
    className: string,
    catalogoMaestros: MaestroType[],
    catalogoRoles: RolType[],
    catalogoProgramas: ProgramaType[],
    catalogoNivelesCurriculares: NivelCurricularType[],
    catalogoOpcionesTerminales: OpcionTerminalType[],
    participacionesCursos: ParticipacionCursoType[],
    cursosMini: CursoMiniType[],
}) => {
    const widths: [ WidthType, WidthType, WidthType ] = ['w-[60%]', 'w-[20%]','w-[20%]'];
    const [ currentParticipantes, setCurrentParticipantes ] = useState<ParticipacionesDocentesType[]>([]);
    const [ currentParticipaciones, setCurrentParticipaciones ] = useState<ParticipacionCursoType[]>(participacionesCursos);

    const handleDownloadCSV = () => {
        const data1 = currentParticipantes.map((participante) => ({
            docente: catalogoMaestros.find((m) => m.id === participante.id_maestro)?.label || '',
            participaciones: participante.participaciones,
        }));

        const data2 = currentParticipaciones.map((participacion) => ({
            docente: catalogoMaestros.find((m) => m.id === participacion.id_maestro)?.label || '',
            curso: cursosMini.find((c) => c.id === participacion.id_curso)?.nombre || '',
            rol: catalogoRoles.find((r) => r.id === participacion.id_rol)?.rol || '',
            programa: catalogoProgramas.find((p) => p.id === participacion.id_programa)?.programa || '',
            nivel_curricular: catalogoNivelesCurriculares.find((n) => n.id === participacion.id_nivel_curricular)?.nivel_curricular || '',
            opcion_terminal: catalogoOpcionesTerminales.find((ot) => ot.id === participacion.id_opcion_terminal)?.opcion_terminal || '',
        }));
        downloadCSV(data1, 'ParticipacionesCursos');
        downloadCSV(data2, 'ParticipacionesCursosDetallado');
    };

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
            <div className='flex items-center m-1 space-x-2'>
                <p>{`${currentParticipantes.length} Docentes Participando en Estos Cursos`}</p>
                <button title='Descargar Lista de Participaciones en Cursos' onClick={() => handleDownloadCSV()}>
                    <ArrowDownTrayIcon className='size-6'/>
                </button>
            </div>
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
