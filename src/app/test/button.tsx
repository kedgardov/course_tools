'use client'; // Mark this component as a client component
import { useState } from 'react';

export default function DownloadTesis({ idTesis }: { idTesis: number }) {
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      // Construct the download URL
      const downloadUrl = `/test/api/?id=${idTesis}`;

      // Perform a HEAD request to check if the file is available before redirecting
      const response = await fetch(downloadUrl, {
        method: 'HEAD',
        headers: {
          'Content-Type': 'application/pdf',
        },
      });

      // Check if the response is OK
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error from API:', errorMessage);
        setError('Error fetching PDF: ' + errorMessage);
        return;
      }

      // Check the content type
      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.includes('application/pdf')) {
        const errorText = await response.text();
        console.error('Unexpected content type:', contentType, errorText);
        setError('Unexpected content type: ' + contentType);
        return;
      }

      // Redirect to the download URL
      window.location.href = downloadUrl;
    } catch (error: any) {
      console.error('Error downloading PDF:', error);
      setError('Error fetching PDF: ' + error.message);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleDownload} className="border rounded p-2">
        Descargar PDF Boton
      </button>
    </div>
  );
}
