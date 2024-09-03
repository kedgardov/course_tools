import { getAutores, GetAutoresResponseType } from "@/utils/repo_tesis/autores/getCatalogoAutores";
import { getCatalogoGrados, GetCatalogoGradosType } from "@/utils/repo_tesis/grados/getCatalogoGrados";
import { getCatalogoPronaces, GetCatalogoPronacesType } from "@/utils/repo_tesis/pronaces/getCatalogoPronaces";
import { getTesisMini, GetTesisMiniResponseType } from "@/utils/repo_tesis/tesis/getTesisMini";
import { getCatalogoCoordinaciones, GetCatalogoCoordinacionesType } from '@utils/repo_tesis/coordinaciones/getCatalogoCoordinaciones';
import { cookies } from "next/headers";
import ListaTesis from './listaTesis';

const Tesis = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';

    const [
        responseGetTesisMini,
        responseGetCatalogoCoordinaciones,
        responseGetCatalogoAutores,
        responseGetCatalogoGrados,
        responseGetCatalogoPronaces,
    ]:[
        GetTesisMiniResponseType,
        GetCatalogoCoordinacionesType,
        GetAutoresResponseType,
        GetCatalogoGradosType,
        GetCatalogoPronacesType,
    ] = await Promise.all([
        getTesisMini(token),
        getCatalogoCoordinaciones(token),
        getAutores(token),
        getCatalogoGrados(token),
        getCatalogoPronaces(token),
    ]);
    return (
        <ListaTesis
            className='p-4'
            token={token}
            tesisMini={responseGetTesisMini.tesis_mini}
        />
    );
};

export default Tesis;
