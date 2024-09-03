'use client';
import { TesisMiniType } from "@/models/tesis";
import TesisMini from "./tesis";
import WidthType from "@/models/width";
import ListHeaders from "@/components/listHeaders";
import { useState, useEffect } from 'react';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController, ChartOptions } from 'chart.js';

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
  const [currentFilter, setCurrentFilter] = useState<number>(0); // 0 represents no filter

  const widths: [WidthType, WidthType, WidthType] = ['w-[10%]', 'w-[70%]', 'w-[20%]'];

  // Create a frequency array dynamically based on the hardcoded pronaceList
  const pronaceFrequency = Array(pronaceList.length).fill(0);

  tesisMini.forEach((tesis) => {
    const pronaceIndex = pronaceList.findIndex(pronace => pronace.id === tesis.id_pronace);
    if (pronaceIndex !== -1) {
      pronaceFrequency[pronaceIndex]++;
    }
  });

  // Update currentTesisMini based on the currentFilter value
  useEffect(() => {
    if (currentFilter === 0) {
      setCurrentTesisMini(tesisMini);
    } else {
      const filteredTesis = tesisMini.filter(tesis => tesis.id_pronace === currentFilter);
      setCurrentTesisMini(filteredTesis);
    }
  }, [currentFilter, tesisMini]);

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
        text: `Frecuencia de PRONACEs [${tesisMini.length}]`,
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
        setCurrentFilter(pronaceId);
      }
    },
  };

  return (
    <div className={className}>
      <Bar data={chartData} options={options} />

      {/* Buttons to filter by PRONACE and reset filter */}
      <div className="flex flex-wrap gap-2 my-4">
        <button
          onClick={() => setCurrentFilter(0)}
          className={`py-1 px-2 rounded ${currentFilter === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
          Todas
        </button>
        {pronaceList.map((pronace) => (
          <button
            key={pronace.id}
            onClick={() => setCurrentFilter(pronace.id)}
            className={`py-1 px-2 rounded ${currentFilter === pronace.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
            {pronace.pronace}
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
    </div>
  );
};

export default ListaTesis;
