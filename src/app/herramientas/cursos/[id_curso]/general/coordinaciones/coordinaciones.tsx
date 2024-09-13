import fakeApiCall from "@/utils/fakeApi";
import { notFound } from "next/navigation";
import CoordinacionesList from "./coordinacionesList";
import { GetCoordinacionesType } from "@/utils/coordinaciones/getCoordinaciones";
import { getCatalogoCoordinaciones, GetCatalogoCoordinacionesType } from "@/utils/coordinaciones/getCatalogoCoordinaciones";
import { cookies } from "next/headers";

const CoordinacionesComponent = async ({
    className,
    idCurso,
}:{
    className: string,
    idCurso: number,
}) => {

    const cookieStorage = cookies();
    const token = cookieStorage.get('authToken')?.value || '';


    const [
        responseGetCatalogoCoordinaciones,
    ]:[
        GetCatalogoCoordinacionesType,
    ] = await Promise.all([
        getCatalogoCoordinaciones(token)
    ]);


    if( !responseGetCatalogoCoordinaciones.success ){
        notFound();
    }


    const responseGetCoordinaciones: GetCoordinacionesType = {
        success:true,
        message:'all good',
        coordinaciones:[
            {id: 1, id_curso:idCurso, id_coordinacion:1},
            {id: 2, id_curso:idCurso, id_coordinacion:2},
            {id: 3, id_curso:idCurso, id_coordinacion:3},
            {id: 4, id_curso:idCurso, id_coordinacion:4},
        ],
    };


    const catalogoCoordinaciones = responseGetCatalogoCoordinaciones.catalogo_coordinaciones;
    const coordinaciones = responseGetCoordinaciones.coordinaciones;


    return (
        <CoordinacionesList
            coordinaciones={coordinaciones}
            idCurso={idCurso}
            catalogo_coordinaciones={catalogoCoordinaciones}
            className={className}
            token={token}
        />
    );
};


export default CoordinacionesComponent;
