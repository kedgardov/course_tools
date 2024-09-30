import { notFound } from "next/navigation";
import CoordinacionesList from "./coordinacionesList";
import { getCoordinaciones, GetCoordinacionesType } from "@/utils/coordinaciones/getCoordinaciones";
import { getCatalogoCoordinaciones, GetCatalogoCoordinacionesType } from "@/utils/coordinaciones/getCatalogoCoordinaciones";

const CoordinacionesComponent = async ({
    className,
    idCurso,
    token,
}:{
    className: string,
    idCurso: number,
    token: string,
}) => {

    const [
        responseGetCatalogoCoordinaciones,
        responseGetCoordinaciones,
    ]:[
        GetCatalogoCoordinacionesType,
        GetCoordinacionesType,
    ] = await Promise.all([
        getCatalogoCoordinaciones(token),
        getCoordinaciones(idCurso, token),
    ]);

    if(!responseGetCatalogoCoordinaciones.success || !responseGetCoordinaciones.success){
        notFound();
    }

    return (
        <CoordinacionesList
            coordinaciones={responseGetCoordinaciones.coordinaciones}
            idCurso={idCurso}
            catalogo_coordinaciones={responseGetCatalogoCoordinaciones.catalogo_coordinaciones}
            className={className}
            token={token}
        />
    );
};


export default CoordinacionesComponent;
