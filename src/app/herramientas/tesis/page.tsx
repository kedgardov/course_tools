import { getCatalogoTesis, GetCatalogoTesisType } from "@/utils/repo_tesis/tesis/getCatalogoTesis";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import TesisFinder from "./tesisFinder";

const Tesis = async () => {

    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';
    if ( token === '' ){
        notFound();
    }

    const responseGetCatalogoTesis: GetCatalogoTesisType = await getCatalogoTesis(token);

    if( !responseGetCatalogoTesis.success ){
        notFound();
    }

    return (
        <TesisFinder
            className=''
            catalogoTesis={responseGetCatalogoTesis.catalogo_tesis}
        />
    );
};
export default Tesis;
