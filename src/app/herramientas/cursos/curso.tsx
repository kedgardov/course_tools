import { CursoMiniType } from "@/models/curso";
import { RolType } from "@/models/rol";
import WidthType from "@/models/width";
import Link from "next/link";

const Curso = ({
    className,
    curso,
    widthList,
    catalogoRoles,
}:{
    className: string,
    curso: CursoMiniType,
    widthList: [WidthType, WidthType, WidthType, WidthType],
    catalogoRoles: RolType[],
}) => {

    const rolCurso = catalogoRoles.find((rol) => rol.id === curso.id_rol);

    const rol = rolCurso?.rol? rolCurso.rol : '';

    return (
        <div className={`${className} flex`}>
            <div className={widthList[0]}>{curso.clave}</div>
            <div className={widthList[1]}>{curso.nombre}</div>
            <div className={widthList[2]}>{rol}</div>
            <div className={widthList[3]}><Link href={`/cursos/${curso.id}/general`} className='button-3'>Ver Mas</Link></div>
        </div>
    );
};

export default Curso;
