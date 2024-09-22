'use client'

import { TesisMiniType } from "@/models/tesis";
import { PronaceType } from "@/models/pronace";
import { CoordinacionType } from "@/utils/repo_tesis/coordinaciones/getCatalogoCoordinaciones";
import { GradoType } from "@/models/grado";
import { useEffect, useState } from "react";
import BarsPlot from "./BarsPlot";
import { OpcionTerminalType } from "@/models/opcionTerminal";

const countByPronace = (tesis: TesisMiniType[]) => {
        return tesis.reduce((acc, { id_pronace }) => {
            acc[id_pronace] = (acc[id_pronace] || 0) + 1;
            return acc;
        }, {} as { [key: number]: number });
    };

    const countByCoordinacion = (tesis: TesisMiniType[]) => {
        return tesis.reduce((acc, { id_coordinacion }) => {
            acc[id_coordinacion] = (acc[id_coordinacion] || 0) + 1;
            return acc;
        }, {} as { [key: number]: number });
    };

    const countByPrograma = (tesis: TesisMiniType[]) => {
        return tesis.reduce((acc, { id_grado }) => {
            acc[id_grado] = (acc[id_grado] || 0) + 1;
            return acc;
        }, {} as { [key: number]: number });
    };

    const countByOpcionTerminal = (tesis: TesisMiniType[]) => {
        return tesis.reduce((acc, { id_opcion_terminal }) => {
            acc[id_opcion_terminal] = (acc[id_opcion_terminal] || 0) + 1;
            return acc;
        }, {} as { [key: number]:number });
    };

    const countByFecha = (tesisList: TesisMiniType[], catalogoAnos: string[]) => {
        return tesisList.reduce((acc, { fecha }) => {
            // Check if any year in catalogoAnos is included in the fecha string
            const matchingAno = catalogoAnos.find((a) => fecha.includes(a));

            if (matchingAno) {
                acc[matchingAno] = (acc[matchingAno] || 0) + 1; // Increment the count for that year
            }

            return acc;
        }, {} as { [key: string]: number }); // Initial accumulator object
    };


const TesisPlot = ({
    className,
    currentTesis,
    catalogoPronaces,
    catalogoProgramas,
    catalogoCoordinaciones,
    catalogoAnos,
    catalogoOpcionesTerminales,
}:{
    className: string,
    currentTesis: TesisMiniType[],
    catalogoPronaces: PronaceType[],
    catalogoProgramas: GradoType[],
    catalogoCoordinaciones: CoordinacionType[],
    catalogoAnos: string[],
    catalogoOpcionesTerminales: OpcionTerminalType[]
}) => {

    type CategoryType = 'pronace' | 'coordinacion' | 'fecha' | 'programa' | 'opcion-terminal';

    const [ selectedCategory, setSelectedCategory ] = useState<CategoryType>('pronace');

    const [ currentPlotData, setCurrentPlotData ] = useState<any>({});

    useEffect(() => {
        console.time('useEffectDuration');
        switch (selectedCategory){
            case 'pronace':
                console.time('countByPronaceDuration');
                const pronaceCounts = countByPronace(currentTesis);
                console.timeEnd('countByPronaceDuration');
                //setPronaceFrequency(pronaceCounts);
                setCurrentPlotData({
                    labels: catalogoPronaces.map((p) => p.pronace),
                    //data: catalogoPronaces.map((p) => pronaceFrequency[p.id]),
                    data: catalogoPronaces.map((p) => pronaceCounts[p.id]),
                    title: 'Frecuencia Por Pronace',
                    xLabel: 'Frecuencia',
                    yLabel: 'Pronaces',
                });
                break;

            case 'coordinacion':
                const coordinacionCounts = countByCoordinacion(currentTesis);
                //setCoordinacionFrequency(coordinacionCounts);
                setCurrentPlotData({
                    labels: catalogoCoordinaciones.map((c) => c.coordinacion),
                    //data: catalogoCoordinaciones.map((c) => coordinacionFrequency[c.id]),
                    data: catalogoCoordinaciones.map((c) => coordinacionCounts[c.id]),
                    title: 'Frecuencia Por Coordinacion',
                    xLabel: 'Frecuencia',
                    yLabel: 'Coordinaciones',
                });
                break;

            case 'programa':
                const programaCounts = countByPrograma(currentTesis);
                //setProgramaFrequency(programaCounts);
                setCurrentPlotData({
                    labels: catalogoProgramas.map((p) => p.grado),
                    //data: catalogoProgramas.map((p) => programaFrequency[p.id]),
                    data: catalogoProgramas.map((p) => programaCounts[p.id]),
                    title: 'Frecuencia Por Programa',
                    xLabel: 'Frecuencia',
                    yLabel: 'Programas',
                });
                break;

            case 'fecha':
                const fechaCounts = countByFecha(currentTesis, catalogoAnos);
                //setFechaFrequency(fechaCounts);
                setCurrentPlotData({
                    labels: catalogoAnos,
                    //data: catalogoAnos.map((a) => fechaFrequency[a]),
                    data: catalogoAnos.map((a) => fechaCounts[a]),
                    title: 'Frecuencia Por Fecha',
                    xLabel: 'Frecuencia',
                    yLabel: 'Fecha',
                });
                break;

            case 'opcion-terminal':
                const opcionTerminalCounts = countByOpcionTerminal(currentTesis);
                setCurrentPlotData({
                    labels: catalogoOpcionesTerminales.map((ot) => ot.opcion_terminal),
                    data: catalogoOpcionesTerminales.map((ot) => opcionTerminalCounts[ot.id]),
                    title: 'Frecuencia Por Opcion Terminal',
                    xLabel: 'Frecuencia',
                    yLabel: 'Opcion Terminal',
                });
                break;
        }
        console.timeEnd('useEffectDuration');
    },[currentTesis, selectedCategory, catalogoAnos, catalogoProgramas, catalogoCoordinaciones, catalogoPronaces, catalogoOpcionesTerminales]);

    return (
        <div>
            <button className='m-2 bg-blue-300 p-2' onClick={() => setSelectedCategory('pronace')} > Pronace </button>
            <button className='m-2 bg-blue-300 p-2' onClick={() => setSelectedCategory('coordinacion')} > Coordinacion </button>
            <button className='m-2 bg-blue-300 p-2' onClick={() => setSelectedCategory('programa')} > Programa </button>
            <button className='m-2 bg-blue-300 p-2' onClick={() => setSelectedCategory('fecha')} > Fecha </button>
            <button className='m-2 bg-blue-300 p-2' onClick={() => setSelectedCategory('opcion-terminal')} > Opcion Terminal </button>
        <div className={`${className} w-2/3`}>
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
export default TesisPlot;


