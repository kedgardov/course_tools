'use client'

import { canDownloadPDF } from "@/utils/repo_tesis/tesis/getPDF";

const AxiosDownload = ({
    idTesis,
    token,
}:{
    idTesis: number,
    token: string,
}) => {

    const downloadPDF = async () => {
        const response = await canDownloadPDF(idTesis, token);
        if ( response.success ){
            window.location.href = `/test/api?id=${idTesis}`;
            console.log(response.message);
        } else {
            console.log(response.message);
        }
    };

    return (
        <button className='p-2 border' onClick={() => downloadPDF()}>
            Descargar Axios
        </button>
    );
};
export default AxiosDownload;
