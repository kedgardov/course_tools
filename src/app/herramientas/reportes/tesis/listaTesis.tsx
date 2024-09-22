//'use client'
import ListHeaders from "@/components/listHeaders";
import { TesisMiniType } from "@/models/tesis";
import WidthType from "@/models/width";
import Link from "next/link";

const ListaTesis = ({
    className,
    tesisList,
    widthList,
}:{
    className: string,
    tesisList: TesisMiniType[],
    widthList: [WidthType, WidthType],
}) => {

    return (
        <ul className={`${className}`}>
            <ListHeaders
                className=''
                widthList={widthList}
                headersList={['Titulo de tesis','Acciones']}
            />
            {tesisList.map((tesis) =>(
                <li className='divider-dark p-1 flex' key={tesis.id}>
                    <div className={`uppercase ${widthList[0]}`} >{tesis.titulo}</div>
                    <Link className={` ${widthList[1]}`} href={`/herramientas/tesis/${tesis.id}`} >Ver Tesis</Link>
                </li>
            ))}
        </ul>
    );
};
export default ListaTesis;
