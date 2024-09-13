'use client';
import { TesisMiniMaestroType } from "@/models/tesis";
import TesisMini from "./tesis";
import WidthType from "@/models/width";
import ListHeaders from "@/components/listHeaders";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Next.js router to manage URL parameters

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController, ChartOptions } from 'chart.js';
import { PronaceType } from "@/models/pronace";
import { RolTesisType } from "@/models/rolTesis";


// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController);

// Hardcoded PRONACE list based on your database table
// Year options for filtering
const yearList = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];


const ListaTesis = ({
  className,
  token,
  tesisMini,
  pronaceList,
  catalogoRolesTesis,
}: {
  className: string,
  token: string,
  tesisMini: TesisMiniMaestroType[],
  pronaceList: PronaceType[],
  catalogoRolesTesis: RolTesisType[],
}) => {
  const [currentTesisMini, setCurrentTesisMini] = useState<TesisMiniMaestroType[]>(tesisMini);
  const [currentPronaceFilter, setCurrentPronaceFilter] = useState<number>(0); // 0 represents no PRONACE filter
  const [currentYearFilter, setCurrentYearFilter] = useState<string>(''); // Empty string represents no year filter
  const [pronaceFrequency, setPronaceFrequency] = useState<number[]>(Array(pronaceList.length).fill(0));
  const [showGraph, setShowGraph] = useState<boolean>(false);
  const [existantPronaces, setExistantPronaces] = useState<PronaceType[]>([]); // State for pronaces with frequency > 0

  const chartRef = useRef(null);
  const router = useRouter();

  const widths: [WidthType, WidthType, WidthType] = ['w-[10%]', 'w-[70%]', 'w-[20%]'];

  const updateUrlParams = () => {
    const params = new URLSearchParams();
    if (currentPronaceFilter !== 0) params.set('pronace', currentPronaceFilter.toString());
    if (currentYearFilter) params.set('year', currentYearFilter);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const updatedFrequency = Array(pronaceList.length).fill(0);
    tesisMini.forEach((tesis) => {
      const pronaceIndex = pronaceList.findIndex(pronace => pronace.id === tesis.id_pronace);
      if (pronaceIndex !== -1) {
        updatedFrequency[pronaceIndex]++;
      }
    });
    setPronaceFrequency(updatedFrequency);

    const existing = pronaceList.filter((_, index) => updatedFrequency[index] > 0);
    setExistantPronaces(existing);
  }, [currentTesisMini, pronaceList,tesisMini]);

  useEffect(() => {
    let filteredTesis = tesisMini;

    if (currentPronaceFilter !== 0) {
      filteredTesis = filteredTesis.filter(tesis => tesis.id_pronace === currentPronaceFilter);
    }
    if (currentYearFilter) {
      filteredTesis = filteredTesis.filter(tesis => tesis.fecha.includes(currentYearFilter));
    }

    setCurrentTesisMini(filteredTesis);
    updateUrlParams();
  }, [currentPronaceFilter, currentYearFilter, tesisMini]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pronace = parseInt(params.get('pronace') || '0', 10);
    const year = params.get('year') || '';

    setCurrentPronaceFilter(pronace);
    setCurrentYearFilter(year);
  }, []);

  const chartData = {
    labels: existantPronaces.map(pronace => pronace.pronace),
    datasets: [
      {
        label: 'Frequency of PRONACE',
        data: existantPronaces.map(pronace => pronaceFrequency[pronaceList.findIndex(p => p.id === pronace.id)]),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
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
        const pronaceId = existantPronaces[index].id;
        setCurrentPronaceFilter(pronaceId);
      }
    },
  };

  return (
    <div className={className}>
      <button
        onClick={() => setShowGraph(prev => !prev)}
        className={`py-1 px-2 rounded ${!showGraph ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
        {showGraph ? 'Ocultar Grafica' : 'Mostrar Grafica'}
      </button>
      {showGraph && (
        <div className="w-1/2 h-[50vh] mx-auto">
          <Bar ref={chartRef} data={chartData} options={options} />
        </div>
      )}
      <div className="flex flex-wrap gap-2 my-4">
        <button
          onClick={() => setCurrentPronaceFilter(0)}
          className={`py-1 px-2 rounded ${currentPronaceFilter === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
          Todas
        </button>
        {existantPronaces.map((pronace) => (
          <button
            key={pronace.id}
            onClick={() => setCurrentPronaceFilter(pronace.id)}
            className={`py-1 px-2 rounded ${currentPronaceFilter === pronace.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
            {pronace.pronace}
          </button>
        ))}
      </div>

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

      <h2 className='text-xl'>{`Parte del Comite de ${currentTesisMini.length} tesis`}</h2>
      <ul>
        <ListHeaders className='' headersList={['Rol', 'Titulo', 'Acciones']} widthList={widths} />
        {currentTesisMini.map((tesis) => (
          <li key={tesis.id_directivo} className='flex divider-dark p-1'>
            <TesisMini tesisMini={tesis} widthList={widths} catalogoRolesTesis={catalogoRolesTesis}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaTesis;
