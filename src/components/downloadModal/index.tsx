import React, { useState } from "react";

const DownloadModal = ({
  data,
  onDownload,
  onClose,
}: {
  data: any[];
  onDownload: (selectedData: any[]) => void;
  onClose: () => void;
}) => {
  const headers = Object.keys(data[0]); // Get headers from the first row of the data
  const [selectedHeaders, setSelectedHeaders] = useState<string[]>(headers);

  const handleCheckboxChange = (header: string) => {
    if (selectedHeaders.includes(header)) {
      setSelectedHeaders(selectedHeaders.filter((h) => h !== header));
    } else {
      setSelectedHeaders([...selectedHeaders, header]);
    }
  };

  const filterData = () => {
    // Filter data based on selected headers
    const filteredData = data.map((row) => {
      const filteredRow: any = {};
      selectedHeaders.forEach((header) => {
        filteredRow[header] = row[header];
      });
      return filteredRow;
    });
    return filteredData;
  };

  return (
    <div className="modal fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-bold mb-4">Seleccionar columnas</h3>
        <div className="mb-4">
          {headers.map((header) => (
            <div key={header}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedHeaders.includes(header)}
                  onChange={() => handleCheckboxChange(header)}
                />
                {header}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            className="mr-2 p-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="p-2 bg-blue-500 text-white rounded"
            onClick={() => onDownload(filterData())}
          >
            Descargar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
