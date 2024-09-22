import ListHeaders from "@/components/listHeaders";
import { MaestroType } from "@/models/maestro";
import { ParticipacionesDocentesType } from "@/models/participacionTesis";
import WidthType from "@/models/width";
import Link from "next/link";

const ListaParticipacionesCursos = ({
    className,
    catalogoMaestros,
    currentParticipantes,
    widthList,
}:{
    className: string,
    catalogoMaestros: MaestroType[],
    currentParticipantes: ParticipacionesDocentesType[],
    widthList: [WidthType, WidthType, WidthType],
}) => {

    return (
        <ul className={`${className}`}>
            <ListHeaders
                className=''
                headersList={['Docente','Numero de Participaciones','Acciones']}
                widthList={widthList}
            />
            {currentParticipantes.map((participante) => (
                <li className='flex p-2 divider-dark' key={participante.id_maestro}>
                    <div className={widthList[0]}>{catalogoMaestros.find((m) => m.id === participante.id_maestro)?.label || ''}</div>
                    <div className={widthList[1]}>{participante.participaciones}</div>
                    <div className={widthList[2]}>
                        <Link className='text-blue-300' href={`/herramientas/docentes/${participante.id_maestro}`}>
                            Ver Docente
                        </Link>
                    </div>
                </li>
            ))}
        </ul>
    );
};
export default ListaParticipacionesCursos;
