import { RolTesisType } from "@/models/rolTesis";
import { TesisMiniMaestroType } from "@/models/tesis";
import WidthType from "@/models/width";
import Link from "next/link";

const TesisMini = ({
    tesisMini,
    widthList,
    catalogoRolesTesis,
}:{
    tesisMini: TesisMiniMaestroType,
    widthList: [WidthType, WidthType, WidthType],
    catalogoRolesTesis: RolTesisType[],
}) => {

    return (
        <>
            <div className={widthList[0]}>
                {catalogoRolesTesis.find((t) => t.id === tesisMini.id_rol_tesis)?.rol_tesis}
            </div>
            <div className={`${widthList[1]} uppercase`}>
                {tesisMini.titulo}
            </div>
            <div className={widthList[2]}>
                <Link href={`/tesis/detalles/${tesisMini.id}`}> Ver Tesis </Link>
            </div>
        </>
    );
};

export default TesisMini;
