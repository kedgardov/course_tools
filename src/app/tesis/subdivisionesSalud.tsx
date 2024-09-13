'use client';
import { TesisMiniType } from "@/models/tesis";
import TesisMini from "./tesis";
import WidthType from "@/models/width";
import ListHeaders from "@/components/listHeaders";
import { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController, ChartOptions } from 'chart.js';

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController);

// Define health-related categories and their matching substrings
const healthCategories = [
  { id: 1, category: 'Diabetes', substring: 'diabetes' },
  { id: 2, category: 'Nutricion', substring: 'nutric' },
  { id: 3, category: 'Cancer', substring: 'ncer' },
  { id: 4, category: 'Comunidad Yaqui', substring: 'yaquis' },
  { id: 5, category: 'Mujeres', substring: 'mujeres' },
  { id: 6, category: 'Alimentacion', substring: 'aliment' },
  { id: 7, category: 'Leche', substring: 'leche' },
  { id: 8, category: 'Obesidad', substring: 'obesidad' },
  { id: 9, category: 'Actividad Fisica', substring: 'actividad f'},
];

// Define available years for filtering
const years = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];

const SubdivisionesSalud = ({
  className,
  tesisMini,
}: {
  className: string;
  tesisMini: TesisMiniType[];
}) => {
  const [currentTesisMini, setCurrentTesisMini] = useState<TesisMiniType[]>(tesisMini);
  const [currentCategoryFilter, setCurrentCategoryFilter] = useState<number | null>(null); // null for all categories
  const [currentYearFilter, setCurrentYearFilter] = useState<string>(''); // Empty string represents no year filter
  const [categoryFrequency, setCategoryFrequency] = useState<number[]>(Array(healthCategories.length).fill(0));

  // Create a ref to access the chart instance
  const chartRef = useRef(null);

  const widths: [WidthType, WidthType, WidthType] = ['w-[10%]', 'w-[70%]', 'w-[20%]'];

  // Update category frequency based on the current filtered list
  useEffect(() => {
    const updatedFrequency = Array(healthCategories.length).fill(0);
    currentTesisMini.forEach((tesis) => {
      healthCategories.forEach((category, index) => {
        if (tesis.titulo.toLowerCase().includes(category.substring)) {
          updatedFrequency[index]++;
        }
      });
    });
    setCategoryFrequency(updatedFrequency);
  }, [currentTesisMini]);

  // Update currentTesisMini based on the current filters
  useEffect(() => {
    let filteredTesis = tesisMini;

    // Apply category filter if specific category is selected
    if (currentCategoryFilter !== null) {
      if (currentCategoryFilter !== 0) {
        const category = healthCategories.find(cat => cat.id === currentCategoryFilter);
        if (category) {
          filteredTesis = filteredTesis.filter(tesis => tesis.titulo.toLowerCase().includes(category.substring));
        }
      } else {
        // Apply filter to include all tesis that match any category substring
        filteredTesis = filteredTesis.filter(tesis =>
          healthCategories.some(category => tesis.titulo.toLowerCase().includes(category.substring))
        );
      }
    }

    // Apply year filter if selected
    if (currentYearFilter) {
      filteredTesis = filteredTesis.filter(tesis => tesis.fecha.includes(currentYearFilter));
    }

    setCurrentTesisMini(filteredTesis);
  }, [currentCategoryFilter, currentYearFilter, tesisMini]);

  // Prepare data for the chart with category names as labels
  const chartData = {
    labels: healthCategories.map(category => category.category), // Use the category names
    datasets: [
      {
        label: 'Frequency of Categories',
        data: categoryFrequency,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(153, 102, 255, 0.8)', // Changes color on hover
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
        text: `Frecuencia de Subdivisiones de Salud: Total de [${currentTesisMini.length}] Tesis`,
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
          text: 'Subdivisiones de Salud',
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
        const categoryId = healthCategories[index].id;
        setCurrentCategoryFilter(categoryId);
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
      <Bar ref={chartRef} data={chartData} options={options} />

      {/* Download button */}
      <button onClick={downloadChart} className="py-2 px-4 bg-green-500 text-white rounded mt-4">
        Descargar Grafica
      </button>

      {/* Buttons to filter by category and reset filter */}
      <div className="flex flex-wrap gap-2 my-4">
        <button
          onClick={() => setCurrentCategoryFilter(0)}
          className={`py-1 px-2 rounded ${currentCategoryFilter === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
          Todas las Categorías
        </button>
        {healthCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setCurrentCategoryFilter(category.id)}
            className={`py-1 px-2 rounded ${currentCategoryFilter === category.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
            {category.category}
          </button>
        ))}
      </div>

      {/* Buttons to filter by year */}
      <div className="flex flex-wrap gap-2 my-4">
        <button
          onClick={() => setCurrentYearFilter('')}
          className={`py-1 px-2 rounded ${currentYearFilter === '' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
          Todos los Años
        </button>
        {years.map((year) => (
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
    </div>
  );
};

export default SubdivisionesSalud;
