import { NivelCurricularType } from "@/models/nivelCurricular";
import { OpcionTerminalType } from "@/models/opcionTerminal";
import { ParticipacionCursoType } from "@/models/participacionCurso";
import { ProgramaType } from "@/models/programa";
import { RolType } from "@/models/rol";
import BarsPlot from "./BarsPlot";
import { useEffect, useState } from "react";


const countMaestrosByOpcionTerminal = (currentParticipaciones: ParticipacionCursoType[]) => {
    return currentParticipaciones.reduce((acc, { id_maestro, id_opcion_terminal }) => {
        if (!acc.has(id_opcion_terminal)) {
            acc.set(id_opcion_terminal, new Map<number, number>());
        }
        const maestrosMap = acc.get(id_opcion_terminal)!;
        maestrosMap.set(id_maestro, (maestrosMap.get(id_maestro) || 0) + 1);
        return acc;
    }, new Map<number, Map<number, number>>());
};

const countMaestrosByPrograma = (currentParticipaciones: ParticipacionCursoType[]) => {
    return currentParticipaciones.reduce((acc, { id_maestro, id_programa }) => {
        if (!acc.has(id_programa)) {
            acc.set(id_programa, new Map<number, number>());
        }
        const maestrosMap = acc.get(id_programa)!;
        maestrosMap.set(id_maestro, (maestrosMap.get(id_maestro) || 0) + 1);
        return acc;
    }, new Map<number, Map<number, number>>());
};

const countMaestrosByNivelCurricular = (currentParticipaciones: ParticipacionCursoType[]) => {
    return currentParticipaciones.reduce((acc, { id_maestro, id_nivel_curricular }) => {
        if (!acc.has(id_nivel_curricular)) {
            acc.set(id_nivel_curricular, new Map<number, number>());
        }
        const maestrosMap = acc.get(id_nivel_curricular)!;
        maestrosMap.set(id_maestro, (maestrosMap.get(id_maestro) || 0) + 1);
        return acc;
    }, new Map<number, Map<number, number>>());
};

const countMaestrosByRol = (currentParticipaciones: ParticipacionCursoType[]) => {
    return currentParticipaciones.reduce((acc, { id_maestro, id_rol }) => {
        if (!acc.has(id_rol)) {
            acc.set(id_rol, new Map<number, number>());
        }
        const maestrosMap = acc.get(id_rol)!;
        maestrosMap.set(id_maestro, (maestrosMap.get(id_maestro) || 0) + 1);
        return acc;
    }, new Map<number, Map<number, number>>());
};


const PlotParticipacionesCursos = ({
    className,
    currentParticipaciones,
    catalogoOpcionesTerminales,
    catalogoProgramas,
    catalogoNivelesCurriculares,
    catalogoRoles,
}:{
    className: string,
    currentParticipaciones: ParticipacionCursoType[],
    catalogoOpcionesTerminales: OpcionTerminalType[],
    catalogoProgramas: ProgramaType[],
    catalogoNivelesCurriculares: NivelCurricularType[],
    catalogoRoles: RolType[],
}) => {
    type CategoryType = 'opcion-terminal' | 'programa' | 'nivel-curricular' | 'rol';
    const [ selectedCategory, setSelectedCategory ] = useState<CategoryType>('opcion-terminal');
    const [ currentPlotData, setCurrentPlotData ] = useState<any>({});

    useEffect(() => {
        switch (selectedCategory) {
            case 'opcion-terminal':
                const opcionTerminalCounts = countMaestrosByOpcionTerminal(currentParticipaciones);
                setCurrentPlotData({
                    labels: catalogoOpcionesTerminales.map((ot) => ot.opcion_terminal),
                    data: catalogoOpcionesTerminales.map((ot) => opcionTerminalCounts.get(ot.id)?.size || 0),
                    title: 'Participaciones por Opción Terminal',
                    xLabel: 'Número de Participaciones',
                    yLabel: 'Opciones Terminales',
                });
                break;

            case 'programa':
                const programaCounts = countMaestrosByPrograma(currentParticipaciones);
                setCurrentPlotData({
                    labels: catalogoProgramas.map((p) => p.programa),
                    data: catalogoProgramas.map((p) => programaCounts.get(p.id)?.size || 0),
                    title: 'Participaciones por Programa',
                    xLabel: 'Número de Participaciones',
                    yLabel: 'Programas',
                });
                break;

            case 'nivel-curricular':
                const nivelCurricularCounts = countMaestrosByNivelCurricular(currentParticipaciones);
                setCurrentPlotData({
                    labels: catalogoNivelesCurriculares.map((nc) => nc.nivel_curricular),
                    data: catalogoNivelesCurriculares.map((nc) => nivelCurricularCounts.get(nc.id)?.size || 0),
                    title: 'Participaciones por Nivel Curricular',
                    xLabel: 'Número de Participaciones',
                    yLabel: 'Niveles Curriculares',
                });
                break;

            case 'rol':
                const rolCounts = countMaestrosByRol(currentParticipaciones);
                setCurrentPlotData({
                    labels: catalogoRoles.map((r) => r.rol),
                    data: catalogoRoles.map((r) => rolCounts.get(r.id)?.size || 0),
                    title: 'Participaciones por Rol',
                    xLabel: 'Número de Participaciones',
                    yLabel: 'Roles',
                });
                break;
        }
    }, [selectedCategory, currentParticipaciones, catalogoOpcionesTerminales, catalogoProgramas, catalogoNivelesCurriculares, catalogoRoles]);

    return (
        <div className={`${className}`}>
            <button className='m-2 bg-blue-300 p-2' onClick={() => setSelectedCategory('opcion-terminal')}> Opción Terminal </button>
            <button className='m-2 bg-blue-300 p-2' onClick={() => setSelectedCategory('programa')}> Programa </button>
            <button className='m-2 bg-blue-300 p-2' onClick={() => setSelectedCategory('nivel-curricular')}> Nivel Curricular </button>
            <button className='m-2 bg-blue-300 p-2' onClick={() => setSelectedCategory('rol')}> Rol </button>

            <div className='w-2/3'>
                {currentPlotData && (
                    <BarsPlot
                        labels={currentPlotData.labels}
                        data={currentPlotData.data}
                        title={currentPlotData.title}
                        xLabel={currentPlotData.xLabel}
                        yLabel={currentPlotData.yLabel}
                    />
                )}
            </div>
        </div>
    );
};
export default PlotParticipacionesCursos;
