import ListaLGACs from './listaLgacs';
import { getCatalogoNivelesCurriculares, GetCatalogoNivelesCurricularesType } from "@/utils/facultades/getCatalogoNivelesCurriculares";
import { getCatalogoProgramas, GetCatalogoProgramasType } from "@/utils/facultades/getCatalogoProgramas";
import { getCatalogoLGACs, GetCatalogoLGACsType } from "@/utils/facultades/getCatalogoLGACs";
import { getLGACs, GetLGACsType } from "@/utils/facultades/getLGACs";
import { notFound } from 'next/navigation';

const LGACsComponent = async ({
    className,
    idCurso,
    token,
}:{
    className: string,
    idCurso: number,
    token: string,
}) => {

    const [
        getCatalogoNivelesCurricularesResponse,
        getCatalogoProgramasResponse,
        getCatalogoLGACsResponse,
        getLGACsResponse,
    ]:[
        GetCatalogoNivelesCurricularesType,
        GetCatalogoProgramasType,
        GetCatalogoLGACsType,
        GetLGACsType,
    ] = await Promise.all([
        getCatalogoNivelesCurriculares(token),
        getCatalogoProgramas(token),
        getCatalogoLGACs(token),
        getLGACs(idCurso, token),
    ]);

    console.log('debug',getLGACsResponse);

    if( !getCatalogoNivelesCurricularesResponse.success || !getCatalogoProgramasResponse.success || !getCatalogoLGACsResponse.success || !getLGACsResponse.success ){
        notFound();
    }

    return (
        <>
            <ListaLGACs
                className={className}
                idCurso={idCurso}
                token={token}
                catalogoLGACs={getCatalogoLGACsResponse.catalogo_lgacs}
                catalogoNivelesCurriculares={getCatalogoNivelesCurricularesResponse.catalogo_niveles_curriculares}
                catalogoProgramas={getCatalogoProgramasResponse.catalogo_programas}
                lgacs={getLGACsResponse.lgacs}
            />
        </>
    );
};

export default LGACsComponent;
