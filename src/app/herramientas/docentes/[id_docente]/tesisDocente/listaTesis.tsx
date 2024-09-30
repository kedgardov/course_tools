//'use client'
import ListHeaders from "@/components/listHeaders";
import { RolTesisType } from "@/models/rolTesis";
import { TesisMiniMaestroType } from "@/models/tesis";
import WidthType from "@/models/width";
import Link from "next/link";

const ListaTesis = ({
    className,
    tesisList,
    catalogoRolesTesis,
}:{
    className: string,
    tesisList: TesisMiniMaestroType[],
    catalogoRolesTesis: RolTesisType[],
}) => {

    const widths: [ WidthType, WidthType, WidthType ] = ['w-[10%]','w-[60%]','w-[30%]'];

    return (
        <ul className={`${className}`}>
            <ListHeaders
                className=''
                widthList={widths}
                headersList={['Rol','Titulo de tesis','Acciones']}
            />
            {tesisList.map((tesis) =>(
                <li className='divider-dark p-1 flex' key={tesis.id}>
                    <div className={widths[0]}>{catalogoRolesTesis.find((r) => r.id === tesis.id_rol_tesis)?.rol_tesis || ''}</div>
                    <div className={`uppercase ${widths[1]}`} >{tesis.titulo}</div>
                    <Link className={` ${widths[2]}`} href={`/herramientas/tesis/${tesis.id}`} >Ver Tesis</Link>
                </li>
            ))}
        </ul>
    );
};
export default ListaTesis;
