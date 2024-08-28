import { TesisMiniType } from "@/models/tesis";
import WidthType from "@/models/width";
import Link from "next/link";

const TesisMini = ({
    tesisMini,
    widthList,
}:{
    tesisMini: TesisMiniType,
    widthList: [WidthType, WidthType, WidthType],
}) => {

    return (
        <>
            <div className={widthList[0]}>
                {tesisMini.checked? 'Hecho':'Pendiente'}
            </div>
            <div className={widthList[1]}>
                {tesisMini.titulo}
            </div>
            <div className={widthList[2]}>
                <Link href={`/tesis/detalles/${tesisMini.id}`}> Ver Mas </Link>
            </div>
        </>
    );
};

export default TesisMini;
