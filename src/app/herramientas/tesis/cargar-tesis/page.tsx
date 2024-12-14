'use client';
import React, { useState, DragEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import DeleteButton from '@/components/deleteButton';
import requestHandler from '@/requestHandler';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isPdf, setIsPdf] = useState<boolean>(true);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setIsPdf(true);
      } else {
        setFile(null);
        setIsPdf(false);
      }
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setIsPdf(true);
    } else {
      setFile(null);
      setIsPdf(false);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };



const handleSubmit = async () => {
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await requestHandler.post('repositorio_tesis/tesis/cargar_tesis.php', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.success) {
      console.log('File uploaded successfully:', response.data);
      // You can access response.data.id if needed
    } else {
      console.error('Upload failed:', response.data.message);
      // Display error message to the user if necessary
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    // Handle network or server errors
  }
};


  const handleDelete = () => {
    setFile(null);
    setIsPdf(true);
  };

  return (
    <div className="items-center gap-4 flex flex-col">
      <div
        className={`border border-black rounded-xl border-2 border-dashed flex flex-col items-center p-2 min-w-72 max-w-80 ${
          isDragging ? 'bg-light/50' : ''
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <ArrowDownTrayIcon className="w-24 h-24 text-primary-light" />
        <p>Arrastre un archivo PDF aquí</p>
        <p>o</p>
        <label
          htmlFor="file-input"
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 mt-2"
        >
          Cargar Archivo
        </label>
        <input
          id="file-input"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {file ? (
        <div className="flex items-center mt-2">
          {isPdf ? (
            <span className="text-green-500 mr-2">✔️</span>
          ) : (
            <span className="text-red-500 mr-2">❌</span>
          )}
          <p className="text-xl">{file.name}</p>
          <DeleteButton className="mx-1" handleDelete={handleDelete} title="Eliminar Archivo" />
        </div>
      ) : (
        <p>Aún no se ha subido un archivo</p>
      )}

      {file && isPdf && (
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
        >
          Subir Archivo
        </button>
      )}
      {!isPdf && (
        <p className="text-red-500 mt-2">El archivo debe ser un PDF.</p>
      )}
    </div>
  );
}
