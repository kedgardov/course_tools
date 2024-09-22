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
}) => {
    const widths: [ WidthType, WidthType, WidthType ] = ['w-[60%]', 'w-[20%]','w-[20%]'];
    const [ currentParticipantes, setCurrentParticipantes ] = useState<ParticipacionesDocentesType[]>([]);
    const [ currentParticipaciones, setCurrentParticipaciones ] = useState<ParticipacionTesisType[]>(participacionesTesis);

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
            />
            {`Total de ${Object.keys(currentParticipantes).length} Docentes Participando`}
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
