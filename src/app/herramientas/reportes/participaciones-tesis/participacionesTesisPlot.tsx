'use client'

import { GradoType } from "@/models/grado";
import { ParticipacionTesisType } from "@/models/participacionTesis";
import { PronaceType } from "@/models/pronace";
import { RolTesisType } from "@/models/rolTesis";
import { CoordinacionType } from "@/utils/repo_tesis/coordinaciones/getCatalogoCoordinaciones";
import BarsPlot from "./BarsPlot";
import { useEffect, useState } from "react";
import { OpcionTerminalType } from "@/models/opcionTerminal";

  const countMaestrosByPronace = (currentParticipaciones: ParticipacionTesisType[]) => {
        return currentParticipaciones.reduce((acc, { id_maestro, id_pronace }) => {
            // Initialize the maestros map if it doesn't exist for this pronace
            if (!acc.has(id_pronace)) {
                acc.set(id_pronace, new Map<number, number>());
            }

            // Get the maestrosMap for this pronace
            const maestrosMap = acc.get(id_pronace)!; // We know it's safe because of the `has` check

            // Initialize maestro's participation count if it doesn't exist
            maestrosMap.set(id_maestro, (maestrosMap.get(id_maestro) || 0) + 1);

            return acc;
        }, new Map<number, Map<number, number>>());
    };

     const countMaestrosByCoordinacion = (currentParticipaciones: ParticipacionTesisType[]) => {
        return currentParticipaciones.reduce((acc, { id_maestro, id_coordinacion }) => {
            // Initialize the maestros map if it doesn't exist for this pronace
            if (!acc.has(id_coordinacion)) {
                acc.set(id_coordinacion, new Map<number, number>());
            }

            // Get the maestrosMap for this pronace
            const maestrosMap = acc.get(id_coordinacion)!; // We know it's safe because of the `has` check

            // Initialize maestro's participation count if it doesn't exist
            maestrosMap.set(id_maestro, (maestrosMap.get(id_maestro) || 0) + 1);

            return acc;
        }, new Map<number, Map<number, number>>());
    };

      const countMaestrosByGrado = (currentParticipaciones: ParticipacionTesisType[]) => {
        return currentParticipaciones.reduce((acc, { id_maestro, id_grado }) => {
            // Initialize the maestros map if it doesn't exist for this pronace
            if (!acc.has(id_grado)) {
                acc.set(id_grado, new Map<number, number>());
            }

            // Get the maestrosMap for this pronace
            const maestrosMap = acc.get(id_grado)!; // We know it's safe because of the `has` check

            // Initialize maestro's participation count if it doesn't exist
            maestrosMap.set(id_maestro, (maestrosMap.get(id_maestro) || 0) + 1);

            return acc;
        }, new Map<number, Map<number, number>>());
    };

       const countMaestrosByRolTesis = (currentParticipaciones: ParticipacionTesisType[]) => {
        return currentParticipaciones.reduce((acc, { id_maestro, id_rol_tesis }) => {
            // Initialize the maestros map if it doesn't exist for this pronace
            if (!acc.has(id_rol_tesis)) {
                acc.set(id_rol_tesis, new Map<number, number>());
            }

            // Get the maestrosMap for this pronace
            const maestrosMap = acc.get(id_rol_tesis)!; // We know it's safe because of the `has` check

            // Initialize maestro's participation count if it doesn't exist
            maestrosMap.set(id_maestro, (maestrosMap.get(id_maestro) || 0) + 1);

            return acc;
        }, new Map<number, Map<number, number>>());
       };

const countMaestrosByOpcionTerminal = (currentParticipaciones: ParticipacionTesisType[]) => {
    return currentParticipaciones.reduce((acc, { id_maestro, id_opcion_terminal }) => {
        // Initialize the maestros map if it doesn't exist for this pronace
        if (!acc.has(id_opcion_terminal)) {
            acc.set(id_opcion_terminal, new Map<number, number>());
        }

        // Get the maestrosMap for this pronace
        const maestrosMap = acc.get(id_opcion_terminal)!; // We know it's safe because of the `has` check

        // Initialize maestro's participation count if it doesn't exist
        maestrosMap.set(id_maestro, (maestrosMap.get(id_maestro) || 0) + 1);

        return acc;
    }, new Map<number, Map<number, number>>());
};




    const countMaestrosByFecha = (currentParticipaciones: ParticipacionTesisType[], catalogoAnos: string[]) => {
        return currentParticipaciones.reduce((acc, { id_maestro, fecha }) => {
            // Find the year in `catalogoAnos` that is present in `fecha`
            const currentFecha = catalogoAnos.find((f) => fecha.includes(f));

            // If no matching year is found, you can skip or assign it to a default like 'Unknown'
            if (!currentFecha) {
                return acc; // Skip the entry if no year is found
                // Alternatively, use this if you want to track participations without a matching year:
                // const defaultFecha = 'Unknown';
                // if (!acc.has(defaultFecha)) {
                //     acc.set(defaultFecha, new Map<number, number>());
                // }
                // const maestrosMap = acc.get(defaultFecha)!;
                // maestrosMap.set(id_maestro, (maestrosMap.get(id_maestro) || 0) + 1);
                // return acc;
            }

            // Initialize the maestros map for the found year if it doesn't exist
            if (!acc.has(currentFecha)) {
                acc.set(currentFecha, new Map<number, number>());
            }

            // Get the maestrosMap for this year
            const maestrosMap = acc.get(currentFecha)!; // Safe due to the `has` check

            // Initialize maestro's participation count if it doesn't exist
            maestrosMap.set(id_maestro, (maestrosMap.get(id_maestro) || 0) + 1);

            return acc;
        }, new Map<string, Map<number, number>>());
    };



const ParticipacionesTesisPlot = ({
    className,
    currentParticipaciones,
    catalogoPronaces,
    catalogoGrados,
    catalogoCoordinaciones,
    catalogoAnos,
    catalogoRolesTesis,
    catalogoOpcionesTerminales,
}:{
    className: string,
    currentParticipaciones: ParticipacionTesisType[],
    catalogoPronaces: PronaceType[],
    catalogoGrados: GradoType[],
    catalogoCoordinaciones: CoordinacionType[],
    catalogoAnos: string[],
    catalogoRolesTesis: RolTesisType[],
    catalogoOpcionesTerminales: OpcionTerminalType[],
}) => {
    type CategoryType = 'pronace' | 'coordinacion' | 'fecha' | 'programa' | 'rolTesis' | 'opcion-terminal';
    const [ selectedCategory, setSelectedCategory ] = useState<CategoryType>('pronace');
    const [ currentPlotData, setCurrentPlotData ] = useState<any>({});


    useEffect(() => {
        switch(selectedCategory){
            case 'pronace':
                const pronaceCounts = countMaestrosByPronace(currentParticipaciones);
                setCurrentPlotData({
                    labels: catalogoPronaces.map((p) => p.pronace),
                    data: catalogoPronaces.map((p) => pronaceCounts.get(p.id)?.size || 0),
                    title: 'Participantes Por Pronace',
                    xLabel: 'Numero de Participantes',
                    yLabel: 'Pronaces',
                });
                break;
            case 'coordinacion':
                const coordinacionCounts = countMaestrosByCoordinacion(currentParticipaciones);
                setCurrentPlotData({
                    labels: catalogoCoordinaciones.map((c) => c.coordinacion),
                    data: catalogoCoordinaciones.map((c) => coordinacionCounts.get(c.id)?.size || 0),
                    title: 'Participantes Por Coordinacion',
                    xLabel: 'Numero de Participantes',
                    yLabel: 'Coordinaciones',
                });
                break;
            case 'fecha':
                const fechaCounts = countMaestrosByFecha(currentParticipaciones, catalogoAnos);
                setCurrentPlotData({
                    labels: catalogoAnos.map((a) => a),
                    data: catalogoAnos.map((a) => fechaCounts.get(a)?.size || 0),
                    title: 'Participantes Por Fecha',
                    xLabel: 'Numero de Participantes',
                    yLabel: 'Año de Publicacion',
                });
                break;
            case 'programa':
                const gradoCounts = countMaestrosByGrado(currentParticipaciones);
                setCurrentPlotData({
                    labels: catalogoGrados.map((g) => g.grado),
                    data: catalogoGrados.map((g) => gradoCounts.get(g.id)?.size || 0),
                    title: 'Participantes Por Programa Academico',
                    xLabel: 'Numero de Participantes',
                    yLabel: 'Programa',
                });
                break;
            case 'rolTesis':
                const rolTesisCounts = countMaestrosByRolTesis(currentParticipaciones);
                setCurrentPlotData({
                    labels: catalogoRolesTesis.map((r) => r.rol_tesis),
                    data: catalogoRolesTesis.map((r) => rolTesisCounts.get(r.id)?.size || 0),
                    title: 'Participantes Por Rol en Comite de Tesis',
                    xLabel: 'Numero de Participantes',
                    yLabel: 'Roles en Comite',
                });
                break;
            case 'opcion-terminal':
                const opcionTerminalCounts = countMaestrosByOpcionTerminal(currentParticipaciones);
                setCurrentPlotData({
                    labels: catalogoOpcionesTerminales.map((ot) => ot.opcion_terminal),
                    data: catalogoOpcionesTerminales.map((ot) => opcionTerminalCounts.get(ot.id)?.size || 0),
                    title: 'Participaciones Por Opcion Terminal',
                    xLabel: 'Numero de Participantes',
                    yLabel: 'Opciones Terminales',
                });
        };
    },[currentParticipaciones, catalogoPronaces, catalogoCoordinaciones, catalogoGrados, catalogoAnos, catalogoRolesTesis, selectedCategory, catalogoOpcionesTerminales]);


    return (
        <div>
            <button className='m-2 bg-blue-300 p-2' onClick={() => setSelectedCategory('pronace')} > Pronace </button>
            <button className='m-2 bg-blue-300 p-2' onClick={() => setSelectedCategory('coordinacion')} > Coordinacion </button>
            <button className='m-2 bg-blue-300 p-2' onClick={() => setSelectedCategory('programa')} > Programa </button>
            <button className='m-2 bg-blue-300 p-2' onClick={() => setSelectedCategory('fecha')} > Fecha </button>
            <button className='m-2 bg-blue-300 p-2' onClick={() => setSelectedCategory('rolTesis')} > Rol en Comite </button>
            <button className='m-2 bg-blue-300 p-2' onClick={() => setSelectedCategory('opcion-terminal')} > Opcion Terminal </button>
        <div className='w-2/3'>
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
export default ParticipacionesTesisPlot;
