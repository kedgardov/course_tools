'use client'
import BarsPlot from "@/components/barsPlot";
import { NivelCurricularType } from "@/models/nivelCurricular";
import { OpcionTerminalType } from "@/models/opcionTerminal";
import { OpcionTerminalCursoType } from "@/models/opcionTerminalCurso";
import { ProgramaType } from "@/models/programa";
import { useEffect, useState } from "react";


// Count by Opcion Terminal
const countByOpcionTerminal = (opcionesTerminales: OpcionTerminalCursoType[]) => {
    return opcionesTerminales.reduce((acc, { id_opcion_terminal }) => {
        acc[id_opcion_terminal] = ( acc[id_opcion_terminal] || 0 ) + 1;
        return acc;
    }, {} as {[key: number]: number});
};

// Count by Programa
const countByPrograma = (opcionesTerminales: OpcionTerminalCursoType[]) => {
    return opcionesTerminales.reduce((acc, { id_programa }) => {
        acc[id_programa] = ( acc[id_programa] || 0 ) + 1;
        return acc;
    }, {} as {[key: number]: number});
};

// Count by Nivel Curricular
const countByNivelCurricular = (opcionesTerminales: OpcionTerminalCursoType[]) => {
    return opcionesTerminales.reduce((acc, { id_nivel_curricular }) => {
        acc[id_nivel_curricular] = ( acc[id_nivel_curricular] || 0 ) + 1;
        return acc;
    }, {} as {[key: number]: number});
};

const CursosPlot = ({
    className,
    currentOpcionesTerminales,
    catalogoOpcionesTerminales,
    catalogoProgramas,
    catalogoNivelesCurriculares
}:{
    className: string,
    currentOpcionesTerminales: OpcionTerminalCursoType[],
    catalogoOpcionesTerminales: OpcionTerminalType[],
    catalogoProgramas: ProgramaType[],
    catalogoNivelesCurriculares: NivelCurricularType[],
}) => {
    type CategoryType = 'opcion-terminal' | 'programa' | 'nivel-curricular';

    const [ selectedCategory, setSelectedCategory ] = useState<CategoryType>('opcion-terminal');
    const [ currentPlotData, setCurrentPlotData ] = useState<any>({});

    useEffect(() => {
        switch (selectedCategory){
            case 'opcion-terminal':
                const opcionTerminalCounts = countByOpcionTerminal(currentOpcionesTerminales);
                setCurrentPlotData({
                    labels: catalogoOpcionesTerminales.map((ot) => ot.opcion_terminal),
                    data: catalogoOpcionesTerminales.map((ot) => opcionTerminalCounts[ot.id]),
                    title: 'Frecuencia Por Opcion Terminal',
                    xLabel: 'Frecuencia',
                    yLabel: 'Opcion Terminal',
                });
                break;
            case 'programa':
                const programaCounts = countByPrograma(currentOpcionesTerminales);
                setCurrentPlotData({
                    labels: catalogoProgramas.map((p) => p.programa),
                    data: catalogoProgramas.map((p) => programaCounts[p.id]),
                    title: 'Frecuencia Por Programa',
                    xLabel: 'Frecuencia',
                    yLabel: 'Programas',
                });
                break;
            case 'nivel-curricular':
                const nivelCurricularCounts = countByNivelCurricular(currentOpcionesTerminales);
                setCurrentPlotData({
                    labels: catalogoNivelesCurriculares.map((nc) => nc.nivel_curricular),
                    data: catalogoNivelesCurriculares.map((nc) => nivelCurricularCounts[nc.id]),
                    title: 'Frecuencia Por Nivel Curricular',
                    xLabel: 'Frecuencia',
                    yLabel: 'Niveles Curriculares',
                });
                break;
        }
    }, [selectedCategory, currentOpcionesTerminales, catalogoOpcionesTerminales, catalogoProgramas, catalogoNivelesCurriculares]);

    return (
        <div className={`${className}`}>
            {/* Category Selection Buttons */}
            <button className='m-2 bg-blue-300 p-2' onClick={() => setSelectedCategory('opcion-terminal')} > Opción Terminal </button>
            <button className='m-2 bg-blue-300 p-2' onClick={() => setSelectedCategory('programa')} > Programa </button>
            <button className='m-2 bg-blue-300 p-2' onClick={() => setSelectedCategory('nivel-curricular')} > Nivel Curricular </button>

            {/* Bar Plot Display */}
            <div>
                <BarsPlot
                    labels={currentPlotData.labels}
                    data={currentPlotData.data}
                    title={currentPlotData.title}
                    xLabel={currentPlotData.xLabel}
                    yLabel={currentPlotData.yLabel}
                />
            </div>
        </div>
    );
};
export default CursosPlot;
