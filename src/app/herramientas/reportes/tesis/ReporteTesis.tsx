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
import { downloadCSV } from "@/utils/downloadCSV";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Coordinacion2Type } from "@/models/coordinacion2";

const ReporteTesis = ({
    className,
    token,
    tesisMini,
    catalogoCoordinaciones,
    catalogoPronaces,
    catalogoGrados,
    catalogoAnos,
    catalogoOpcionesTerminales,
    catalogoCoordinaciones2,
}:{
    className: string,
    token: string,
    tesisMini: TesisMiniType[],
    catalogoCoordinaciones: CoordinacionType[],
    catalogoPronaces: PronaceType[],
    catalogoGrados: GradoType[],
    catalogoAnos: string[],
    catalogoOpcionesTerminales: OpcionTerminalType[],
    catalogoCoordinaciones2: Coordinacion2Type[],
}) => {
    const widths: [WidthType, WidthType] = ['w-[80%]', 'w-[20%]'];

    const [currentTesis, setCurrentTesis] = useState<TesisMiniType[]>(tesisMini);


    const handleDownloadCSV = () => {
        const dataToDownload = currentTesis.map((tesis) => ({
            tesis: tesis.titulo,
            coordinacion: catalogoCoordinaciones2.find((c) => c.id === tesis.id_coordinacion_2)?.coordinacion_2 || '',
            fecha: tesis.fecha,
            pronace: catalogoPronaces.find((p) => p.id === tesis.id_pronace)?.pronace || '',
            programa: catalogoGrados.find((g) => g.id === tesis.id_grado)?.grado || '',
            opcion_terminal: catalogoOpcionesTerminales.find((ot) => ot.id === tesis.id_opcion_terminal)?.opcion_terminal || '',
            //pendiente autores
        }));
        downloadCSV(dataToDownload, 'Tesis');
    };

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
                catalogoCoordinaciones2={catalogoCoordinaciones2}
            />
            <FiltrosTesis
                catalogoTesis={tesisMini}
                setCurrentTesis={setCurrentTesis}
                catalogoPronaces={catalogoPronaces}
                catalogoCoordinaciones={catalogoCoordinaciones}
                catalogoGrados={catalogoGrados}
                catalogoAnos={catalogoAnos}
                catalogoOpcionesTerminales={catalogoOpcionesTerminales}
                catalogoCoordinaciones2={catalogoCoordinaciones2}
            />
            <div className='flex items-center m-1 space-x-2'>
            <p>{`Total de ${currentTesis.length} Tesis Publicadas`}</p>
            <button title='Descargar Lista de Tesis' onClick={() => handleDownloadCSV()}>
                <ArrowDownTrayIcon className='size-6'/>
            </button>
            </div>
            <ListaTesis
                className=''
                tesisList={currentTesis}
                widthList={widths}
            />
        </div>
    );
};
export default ReporteTesis;
