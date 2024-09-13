//'use server'
import { ApiResponseType } from '@models/apiResponse';
import axios from 'axios';

// Function to validate and initiate the download of the PDF
export const canDownloadPDF = async (id_tesis: number, token: string): Promise<ApiResponseType> => {
  try {
    // Perform the HEAD request to validate if the file exists with correct authorization
    await axios.head(`http://localhost/api/repositorio_tesis/tesis/download_pdf.php`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true,
      timeout: 10000, // Set a reasonable timeout for validation, e.g., 10 seconds
    });

    // Redirect to the API route that handles the file download

    // Return success response
    return {
      success: true,
      message: 'Redirecting to download...',
    };
  } catch (error: any) {
    // Handle errors and provide feedback
    const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
    console.error('Error checking file availability:', errorMessage);

    return {
      success: false,
      message: 'Error: ' + errorMessage,
    };
  }
};
