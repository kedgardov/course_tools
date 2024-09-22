'use client'
import { GradoType } from "@/models/grado";
import { PronaceType } from "@/models/pronace";
import { TesisMiniType } from "@/models/tesis";
import { CoordinacionType } from "@/utils/repo_tesis/coordinaciones/getCatalogoCoordinaciones";
import { useState } from "react";
import FiltrosTesis from "./FiltrosTesis";
import ListaTesis from "./listaTesis";
import WidthType from "@/models/width";
import TesisPlot from "./tesisPlot";
import { OpcionTerminalType } from "@/models/opcionTerminal";

const ReporteTesis = ({
    className,
    token,
    tesisMini,
    catalogoCoordinaciones,
    catalogoPronaces,
    catalogoGrados,
    catalogoAnos,
    catalogoOpcionesTerminales,
}:{
    className: string,
    token: string,
    tesisMini: TesisMiniType[],
    catalogoCoordinaciones: CoordinacionType[],
    catalogoPronaces: PronaceType[],
    catalogoGrados: GradoType[],
    catalogoAnos: string[],
    catalogoOpcionesTerminales: OpcionTerminalType[],
}) => {
    const widths: [WidthType, WidthType] = ['w-[80%]', 'w-[20%]'];

    const [currentTesis, setCurrentTesis] = useState<TesisMiniType[]>(tesisMini);


    return (
        <div>
            <TesisPlot
                className=''
                currentTesis={currentTesis}
                catalogoPronaces={catalogoPronaces}
                catalogoProgramas={catalogoGrados}
                catalogoCoordinaciones={catalogoCoordinaciones}
                catalogoAnos={catalogoAnos}
                catalogoOpcionesTerminales={catalogoOpcionesTerminales}
            />
            <FiltrosTesis
                catalogoTesis={tesisMini}
                setCurrentTesis={setCurrentTesis}
                catalogoPronaces={catalogoPronaces}
                catalogoCoordinaciones={catalogoCoordinaciones}
                catalogoGrados={catalogoGrados}
                catalogoAnos={catalogoAnos}
                catalogoOpcionesTerminales={catalogoOpcionesTerminales}
            />
            {`Total de ${currentTesis.length} tesis`}
            <ListaTesis
                className=''
                tesisList={currentTesis}
                widthList={widths}
            />
        </div>
    );
};
export default ReporteTesis;
