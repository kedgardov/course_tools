import { ApiResponseType } from '@/models/apiResponse';
import requestHandler from '@requestHandler';


export const downloadTesis = async (idTesis: number, tesisName:string, token: string): Promise<ApiResponseType> => {
    try {
        const response = await requestHandler.get(`repositorio_tesis/tesis/descargar_pdf.php?id=${idTesis}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: 'blob', // To handle binary data (PDF)
        });

        // Create a link to trigger the download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${tesisName.replace(/ /g, '_')}.pdf`);
        document.body.appendChild(link);
        link.click();

        // Clean up
        if (link.parentNode) {
            link.parentNode.removeChild(link);
        }

        // Return success response
        return {
            success: true,
            message: 'File downloaded successfully.',
        };

    } catch (error) {
        console.error('Error downloading the file:', error);

        // Return failure response
        return {
            success: false,
            message: `Error downloading the file: ${error}`,
        };
    }
}
