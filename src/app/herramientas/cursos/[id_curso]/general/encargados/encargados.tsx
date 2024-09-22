import { getCatalogoMaestros, GetCatalogoMaestrosType } from "@/utils/maestros/getCatalogoMaestros";
import ListaEncargados from "./listaEncargados"
import { getCatalogoRoles, GetCatalogoRolesType } from "@/utils/cursos/getCatalogoRoles";
import { getEncargados, GetEncargadosType } from "@/utils/encargados/getEncargados";
import { notFound } from "next/navigation";

const EncargadosComponent = async ({
    className,
    idCurso,
    token,
}:{
    className: string,
    idCurso: number,
    token: string,
}) => {

    const [
        responseGetCatalogoMaestros,
        responseGetCatalogoRoles,
        responseGetEncargados,
    ]:[
        GetCatalogoMaestrosType,
        GetCatalogoRolesType,
        GetEncargadosType,
    ] = await Promise.all([
        getCatalogoMaestros(token),
        getCatalogoRoles(token),
        getEncargados(idCurso,token)
    ]);

    console.log(responseGetCatalogoMaestros);
    if( !responseGetCatalogoMaestros.success || !responseGetCatalogoRoles.success || !responseGetEncargados.success ){
        notFound();
    }

    return (
        <ListaEncargados
            className={`${className}`}
            idCurso={idCurso}
            token={token}
            catalogoMaestros={responseGetCatalogoMaestros.catalogo_maestros}
            catalogoRoles={responseGetCatalogoRoles.catalogo_roles}
            encargados={responseGetEncargados.encargados}
        />
    );
};
export default EncargadosComponent;
