'use client'

import { GradoType } from "@/models/grado";
import { OpcionTerminalType } from "@/models/opcionTerminal";
import { PronaceType } from "@/models/pronace";
import { RolTesisType } from "@/models/rolTesis";
import { TesisMiniMaestroType } from "@/models/tesis";
import { useState } from "react";
import ListaTesis from "./listaTesis";
import FiltrosTesis from "./FiltrosTesis";
import TesisPlot from "./tesisPlot";


const TesisDocente = ({
    className,
    tesisMini,
    catalogoRolesTesis,
    catalogoPronaces,
    catalogoAnos,
    catalogoGrados,
    catalogoOpcionesTerminales,

}:{
    className: string,
    tesisMini: TesisMiniMaestroType[],
    catalogoRolesTesis: RolTesisType[],
    catalogoPronaces: PronaceType[],
    catalogoAnos: string[],
    catalogoGrados: GradoType[],
    catalogoOpcionesTerminales: OpcionTerminalType[],
}) => {
    const [ currentTesis, setCurrentTesis ] = useState<TesisMiniMaestroType[]>(tesisMini);

    return (
        <div className={`${className}`}>
            <TesisPlot
                className=''
                currentTesis={currentTesis}
                catalogoPronaces={catalogoPronaces}
                catalogoProgramas={catalogoGrados}
                catalogoRolesTesis={catalogoRolesTesis}
                catalogoAnos={catalogoAnos}
                catalogoOpcionesTerminales={catalogoOpcionesTerminales}
            />
            <FiltrosTesis
                className=''
                catalogoTesis={tesisMini}
                setCurrentTesis={setCurrentTesis}
                catalogoPronaces={catalogoPronaces}
                catalogoRolesTesis={catalogoRolesTesis}
                catalogoGrados={catalogoGrados}
                catalogoAnos={catalogoAnos}
                catalogoOpcionesTerminales={catalogoOpcionesTerminales}
            />
            <ListaTesis
                className=''
                tesisList={currentTesis}
                catalogoRolesTesis={catalogoRolesTesis}
            />
        </div>
    );
};
export default TesisDocente;
