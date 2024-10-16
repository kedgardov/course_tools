'use client'

import { GradoType } from "@/models/grado";
import { MaestroType } from "@/models/maestro";
import { ParticipacionesDocentesType, ParticipacionTesisType } from "@/models/participacionTesis";
import { PronaceType } from "@/models/pronace";
import { RolTesisType } from "@/models/rolTesis";
import WidthType from "@/models/width";
import { CoordinacionType } from "@/utils/repo_tesis/coordinaciones/getCatalogoCoordinaciones";
import { useState } from "react";
import ListaParticipacionesTesis from "./listaParticipacionesTesis";
import FiltrosParticipacionesTesis from "./filtrosParticipacionesTesis";
import ParticipacionesTesisPlot from "./participacionesTesisPlot";
import { OpcionTerminalType } from "@/models/opcionTerminal";
import { downloadCSV } from "@/utils/downloadCSV";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { TesisMiniType } from "@/models/tesis";
import { Coordinacion2Type } from "@/models/coordinacion2";

const ReporteParticipacionesTesis = ({
    className,
    catalogoMaestros,
    catalogoRolesTesis,
    catalogoCoordinaciones,
    catalogoPronaces,
    catalogoGrados,
    catalogoAnos,
    catalogoOpcionesTerminales,
    participacionesTesis,
    tesisMini,
    catalogoCoordinaciones2,
}:{
    className: string,
    catalogoMaestros: MaestroType[],
    catalogoRolesTesis: RolTesisType[],
    catalogoCoordinaciones: CoordinacionType[],
    catalogoPronaces: PronaceType[],
    catalogoGrados: GradoType[],
    catalogoAnos: string[],
    catalogoOpcionesTerminales: OpcionTerminalType[],
    participacionesTesis: ParticipacionTesisType[],
    tesisMini: TesisMiniType[],
    catalogoCoordinaciones2: Coordinacion2Type[],
}) => {
    const widths: [ WidthType, WidthType, WidthType ] = ['w-[60%]', 'w-[20%]','w-[20%]'];
    const [ currentParticipantes, setCurrentParticipantes ] = useState<ParticipacionesDocentesType[]>([]);
    const [ currentParticipaciones, setCurrentParticipaciones ] = useState<ParticipacionTesisType[]>(participacionesTesis);


    const handleDownloadCSV = () => {
        const data1 = currentParticipantes.map((participante) => ({
            docente: catalogoMaestros.find((d) => d.id === participante.id_maestro)?.label || '',
            participaciones: participante.participaciones,
        }));
        const data2 = currentParticipaciones.map((participacion) => ({
            docente: catalogoMaestros.find((m) => m.id === participacion.id_maestro)?.label || '',
            tesis: tesisMini.find((t) => t.id === participacion.id_tesis)?.titulo || '',
            rol_tesis: catalogoRolesTesis.find((rt) => rt.id === participacion.id_rol_tesis)?.rol_tesis || '',
            coordinacion: catalogoCoordinaciones2.find((c) => c.id === participacion.id_coordinacion_2)?.coordinacion_2 || '',
            opcion_terminal: catalogoOpcionesTerminales.find((ot) => ot.id === participacion.id_opcion_terminal)?.opcion_terminal || '',
            pronace: catalogoPronaces.find((p) => p.id === participacion.id_pronace)?.pronace || '',
            fecha: participacion.fecha,
            programa: catalogoGrados.find((g) => g.id === participacion.id_grado)?.grado || '',
            //pendiente autor
        }));
        downloadCSV(data1, 'ParticipacionesTesis');
        downloadCSV(data2, 'PartipipacionesTesisDetallado');
    };

    return (
        <div className={`${className}`}>
            <ParticipacionesTesisPlot
                className=''
                currentParticipaciones={currentParticipaciones}
                catalogoPronaces={catalogoPronaces}
                catalogoGrados={catalogoGrados}
                catalogoCoordinaciones={catalogoCoordinaciones}
                catalogoAnos={catalogoAnos}
                catalogoRolesTesis={catalogoRolesTesis}
                catalogoOpcionesTerminales={catalogoOpcionesTerminales}
                catalogoCoordinaciones2={catalogoCoordinaciones2}
            />
            <FiltrosParticipacionesTesis
                className=''
                setCurrentParticipantes={setCurrentParticipantes}
                setCurrentParticipaciones={setCurrentParticipaciones}
                catalogoRolesTesis={catalogoRolesTesis}
                catalogoCoordinaciones={catalogoCoordinaciones}
                catalogoPronaces={catalogoPronaces}
                catalogoGrados={catalogoGrados}
                catalogoAnos={catalogoAnos}
                participacionesTesis={participacionesTesis}
                catalogoOpcionesTerminales={catalogoOpcionesTerminales}
                catalogoCoordinaciones2={catalogoCoordinaciones2}
            />
            <div className='flex items-center m-1 space-x-2'>
                <p>{`Total de ${Object.keys(currentParticipantes).length} Docentes Participando`}</p>
                <button title='Descargar Participaciones Tesis' onClick={()=>handleDownloadCSV()}>
                    <ArrowDownTrayIcon className='size-6'/>
                </button>
            </div>
            <ListaParticipacionesTesis
                className=''
                currentParticipantes={currentParticipantes}
                catalogoMaestros={catalogoMaestros}
                widthList={widths}
            />
        </div>
    );
};
export default ReporteParticipacionesTesis;
