import { AutorType } from "@/models/autor";
import { CoordinacionType } from "@/models/coordinacion";
import { GradoType } from "@/models/grado";
import { PronaceType } from "@/models/pronace";
import { TesisMiniType } from "@/models/tesis";
import TesisMini from "./tesis";
import WidthType from "@/models/width";
import ListHeaders from "@/components/listHeaders";

const ListaTesis = ({
    className,
    token,
    tesisMini,
}:{
    className: string,
    token: string,
    tesisMini: TesisMiniType[],
}) => {

    const widths:[WidthType, WidthType, WidthType] = ['w-[10%]','w-[70%]','w-[20%]'];

    return (
        <ul>
            <ListHeaders
                className=''
                headersList={['Status','Titulo','Acciones']}
                widthList={widths}
            />
            {tesisMini.map((tesis)=>(
                <li key={tesis.id} className='flex divider-dark'>
                   <TesisMini
                        tesisMini={tesis}
                        widthList={widths}
                    />
                </li>
            ))}
        </ul>
    );
};

export default ListaTesis;
