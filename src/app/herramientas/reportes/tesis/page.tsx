import { getCatalogoGrados, GetCatalogoGradosType } from "@/utils/repo_tesis/grados/getCatalogoGrados";
import { getCatalogoPronaces, GetCatalogoPronacesType } from "@/utils/repo_tesis/pronaces/getCatalogoPronaces";
import { getTesisMini, GetTesisMiniResponseType } from "@/utils/repo_tesis/tesis/getTesisMini";
import { getCatalogoCoordinaciones, GetCatalogoCoordinacionesType } from '@utils/repo_tesis/coordinaciones/getCatalogoCoordinaciones';
import { cookies } from "next/headers";
import ReporteTesis from "./ReporteTesis";
import { notFound } from "next/navigation";
import { GetCatalogoOpcionesTerminalesType, getCatalogoOpcionesTerminales } from "@/utils/repo_tesis/opcionesTerminales/getCatalogoOpcionesTerminales";


const ReporteTesisServer = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';

    const [
        responseGetTesisMini,
        responseGetCatalogoCoordinaciones,
        responseGetCatalogoGrados,
        responseGetCatalogoPronaces,
        responseGetCatalogoOpcionesTerminales,
    ]:[
        GetTesisMiniResponseType,
        GetCatalogoCoordinacionesType,
        GetCatalogoGradosType,
        GetCatalogoPronacesType,
        GetCatalogoOpcionesTerminalesType,
    ] = await Promise.all([
        getTesisMini(token),
        getCatalogoCoordinaciones(token),
        getCatalogoGrados(token),
        getCatalogoPronaces(token),
        getCatalogoOpcionesTerminales(token),
    ]);

    if( !responseGetTesisMini.success && !responseGetCatalogoCoordinaciones.success && !responseGetCatalogoGrados.success &&
        !responseGetCatalogoPronaces.success && !responseGetCatalogoOpcionesTerminales.success ){
        notFound();
    }

    const catalogoAnos: string[] = ['2018','2019', '2020', '2021', '2022', '2023', '2024'];

    console.log(responseGetCatalogoOpcionesTerminales);
    return (
        <ReporteTesis
            className='p-4'
            token={token}
            tesisMini={responseGetTesisMini.tesis_mini}
            catalogoCoordinaciones={responseGetCatalogoCoordinaciones.catalogo_coordinaciones}
            catalogoPronaces={responseGetCatalogoPronaces.catalogo_pronaces}
            catalogoGrados={responseGetCatalogoGrados.catalogo_grados}
            catalogoAnos={catalogoAnos}
            catalogoOpcionesTerminales={responseGetCatalogoOpcionesTerminales.catalogo_opciones_terminales}
        />
    );
};

export default ReporteTesisServer;
