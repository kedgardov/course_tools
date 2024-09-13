'use client';
import { TesisMiniType } from "@/models/tesis";
import TesisMini from "./tesis";
import WidthType from "@/models/width";
import ListHeaders from "@/components/listHeaders";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Next.js router to manage URL parameters

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController, ChartOptions } from 'chart.js';
import SubdivisionesSalud from "./subdivisionesSalud";
import Link from "next/link";

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController);

// Hardcoded PRONACE list based on your database table
const pronaceList = [
  { id: 1, pronace: 'Agentes Tóxicos y Procesos Contaminantes' },
  { id: 2, pronace: 'Agua' },
  { id: 3, pronace: 'Cultura' },
  { id: 4, pronace: 'Educación' },
  { id: 5, pronace: 'Energía y Cambio Climático' },
  { id: 6, pronace: 'Salud' },
  { id: 7, pronace: 'Seguridad Humana' },
  { id: 8, pronace: 'Sistemas Socio-Ecológicos' },
  { id: 9, pronace: 'Soberanía Alimentaria' },
  { id: 10, pronace: 'Vivienda' },
  { id: 11, pronace: 'Otro' },
  { id: 12, pronace: 'Economía' },
  { id: 13, pronace: 'Materiales' },
];

// Hardcoded Coordinacion list based on your table
const coordinacionList = [
  { id: 1, coordinacion: 'Hermosillo, Sonora' },
  { id: 2, coordinacion: 'Guaymas, Sonora' },
  { id: 3, coordinacion: 'Culiacán, Sinaloa' },
  { id: 4, coordinacion: 'Mazatlán, Sinaloa' },
  { id: 5, coordinacion: 'Cuauhtémoc, Chihuahua' },
  { id: 6, coordinacion: 'Delicias, Chihuahua' },
  { id: 7, coordinacion: 'Tepic, Nayarit' },
  { id: 8, coordinacion: 'Pachuca, Hidalgo' },
  { id: 9, coordinacion: 'N/A' },
];

// Year options for filtering
const yearList = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];


const ListaTesis = ({
  className,
  token,
  tesisMini,
}: {
  className: string;
  token: string;
  tesisMini: TesisMiniType[];
}) => {
  const [currentTesisMini, setCurrentTesisMini] = useState<TesisMiniType[]>(tesisMini);
  const [currentPronaceFilter, setCurrentPronaceFilter] = useState<number>(0); // 0 represents no PRONACE filter
  const [currentCoordinacionFilter, setCurrentCoordinacionFilter] = useState<number>(0); // 0 represents no Coordinacion filter
  const [currentYearFilter, setCurrentYearFilter] = useState<string>(''); // Empty string represents no year filter
  const [pronaceFrequency, setPronaceFrequency] = useState<number[]>(Array(pronaceList.length).fill(0));

  // Create a ref to access the chart instance
  const chartRef = useRef(null);
  const router = useRouter(); // Next.js router for managing URL parameters

  const widths: [WidthType, WidthType, WidthType] = ['w-[10%]', 'w-[70%]', 'w-[20%]'];

  // Function to update URL parameters based on the current filter state
  const updateUrlParams = () => {
    const params = new URLSearchParams();
    if (currentPronaceFilter !== 0) params.set('pronace', currentPronaceFilter.toString());
    if (currentCoordinacionFilter !== 0) params.set('coordinacion', currentCoordinacionFilter.toString());
    if (currentYearFilter) params.set('year', currentYearFilter);

    router.push(`?${params.toString()}`, { scroll: false }); // Update the URL without reloading the page
  };

  // Update pronace frequency based on the current filtered list
  useEffect(() => {
    const updatedFrequency = Array(pronaceList.length).fill(0);
    currentTesisMini.forEach((tesis) => {
      const pronaceIndex = pronaceList.findIndex(pronace => pronace.id === tesis.id_pronace);
      if (pronaceIndex !== -1) {
        updatedFrequency[pronaceIndex]++;
      }
    });
    setPronaceFrequency(updatedFrequency);
  }, [currentTesisMini]);

  // Update currentTesisMini based on the current filters
  useEffect(() => {
    let filteredTesis = tesisMini;

    // Apply PRONACE filter if selected
    if (currentPronaceFilter !== 0) {
      filteredTesis = filteredTesis.filter(tesis => tesis.id_pronace === currentPronaceFilter);
    }

    // Apply Coordinacion filter if selected
    if (currentCoordinacionFilter !== 0) {
      filteredTesis = filteredTesis.filter(tesis => tesis.id_coordinacion === currentCoordinacionFilter);
    }

    // Apply Year filter if selected
    if (currentYearFilter) {
      filteredTesis = filteredTesis.filter(tesis => tesis.fecha.includes(currentYearFilter));
    }

    setCurrentTesisMini(filteredTesis);
    updateUrlParams(); // Update URL parameters whenever filters change
  }, [currentPronaceFilter, currentCoordinacionFilter, currentYearFilter, tesisMini]);

  // Initialize filter states based on URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pronace = parseInt(params.get('pronace') || '0', 10);
    const coordinacion = parseInt(params.get('coordinacion') || '0', 10);
    const year = params.get('year') || '';

    setCurrentPronaceFilter(pronace);
    setCurrentCoordinacionFilter(coordinacion);
    setCurrentYearFilter(year);
  }, []);

  // Prepare data for the chart with pronace names as labels
  const chartData = {
    labels: pronaceList.map(pronace => pronace.pronace), // Use the pronace names
    datasets: [
      {
        label: 'Frequency of PRONACE',
        data: pronaceFrequency,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)', // Changes color on hover
      },
    ],
  };

  // Define the options type explicitly
  const options: ChartOptions<'bar'> = {
    indexAxis: 'y', // Explicitly set as 'y' to indicate horizontal bars
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Frecuencia de PRONACEs: Total de [${currentTesisMini.length}] Tesis`,
        font: {
          size: 20,
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            // Customize tooltip label
            return `${context.label}: ${context.raw} Tesis`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Frecuencia',
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Categorias PRONACE',
          font: {
            size: 14,
          },
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          font: {
            size: 20,
          },
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const pronaceId = pronaceList[index].id;
        setCurrentPronaceFilter(pronaceId);
      }
    },
  };

  // Function to handle chart download
  const downloadChart = () => {
    if (chartRef.current) {
      const chartInstance = chartRef.current;
      const url = chartInstance.toBase64Image(); // Convert chart to Base64 image
      const link = document.createElement('a');
      link.href = url;
      link.download = 'chart.png'; // File name for the download
      link.click(); // Trigger the download
    }
  };

  return (
    <div className={className}>
      <Link className='p-2 m-1 border border-0 rounded bg-blue-400 text-white' href={`/tesis/maestros`}>Ver Por Docente</Link>
      <Bar ref={chartRef} data={chartData} options={options} />
      <button onClick={downloadChart} className="py-2 px-4 bg-green-500 text-white rounded mt-4">
        Descargar Grafica
      </button>

      {/* Buttons to filter by PRONACE and reset filter */}
      <div className="flex flex-wrap gap-2 my-4">
        <button
          onClick={() => setCurrentPronaceFilter(0)}
          className={`py-1 px-2 rounded ${currentPronaceFilter === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
          Todas
        </button>
        {pronaceList.map((pronace) => (
          <button
            key={pronace.id}
            onClick={() => setCurrentPronaceFilter(pronace.id)}
            className={`py-1 px-2 rounded ${currentPronaceFilter === pronace.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
            {pronace.pronace}
          </button>
        ))}
      </div>

      {/* Buttons to filter by Coordinacion */}
      <div className="flex flex-wrap gap-2 my-4">
        <button
          onClick={() => setCurrentCoordinacionFilter(0)}
          className={`py-1 px-2 rounded ${currentCoordinacionFilter === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
          Todas las Coordinaciones
        </button>
        {coordinacionList.map((coordinacion) => (
          <button
            key={coordinacion.id}
            onClick={() => setCurrentCoordinacionFilter(coordinacion.id)}
            className={`py-1 px-2 rounded ${currentCoordinacionFilter === coordinacion.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
            {coordinacion.coordinacion}
          </button>
        ))}
      </div>

      {/* Buttons to filter by Year */}
      <div className="flex flex-wrap gap-2 my-4">
        <button
          onClick={() => setCurrentYearFilter('')}
          className={`py-1 px-2 rounded ${currentYearFilter === '' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
          Todos los Años
        </button>
        {yearList.map((year) => (
          <button
            key={year}
            onClick={() => setCurrentYearFilter(year)}
            className={`py-1 px-2 rounded ${currentYearFilter === year ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
            {year}
          </button>
        ))}
      </div>

      <ul>
        <ListHeaders className='' headersList={['Status', 'Titulo', 'Acciones']} widthList={widths} />
        {currentTesisMini.map((tesis) => (
          <li key={tesis.id} className='flex divider-dark p-1'>
            <TesisMini tesisMini={tesis} widthList={widths} />
          </li>
        ))}
      </ul>
      {currentPronaceFilter === 6 && (
          <SubdivisionesSalud
              className=''
              tesisMini={currentTesisMini}
          />
      )}
    </div>
  );
};

export default ListaTesis;
