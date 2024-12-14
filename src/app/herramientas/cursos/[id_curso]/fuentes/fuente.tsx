'use client'
import DeleteButton from "@/components/deleteButton";
import { AutorFuenteType, FuenteType } from "@/models/fuente";
import WidthType from "@/models/width";
import { generateCitation } from "@/utils/generateCitation";
import Link from "next/link";

const Fuente = ({
    className,
    fuenteData,
    autoresData,
    widths,
}:{
    className: string,
    fuenteData: FuenteType,
    autoresData: AutorFuenteType[],
    widths: WidthType[],
}) => {

    const citation = generateCitation(fuenteData, autoresData);

    return (
        <li className={`${className} flex space-x-2`}>
            <div className={`${widths[0]}`}> {citation && <span dangerouslySetInnerHTML={{__html: citation}}/>} </div>
            <Link href={`/herramientas/cursos/${fuenteData.id_curso}/fuentes/${fuenteData.id}/detalles`}>Editar Fuente</Link>
            <DeleteButton className='' handleDelete={() => console.log('delete') } title='Borrar Fuente' />
        </li>
    );
};
export default Fuente;
