import { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController, ChartOptions, Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import html2canvas from 'html2canvas';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

// Register necessary Chart.js components and plugins
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController, ChartDataLabels);

const BarsPlot = ({
    labels,
    data,
    title,
    xLabel,
    yLabel,
}:{
    labels: string[],
    data: number[],
    title: string,
    xLabel: string,
    yLabel: string,
}) => {

    // Define the ref type as a Chart.js instance
    const chartRef = useRef<Chart<'bar'>>(null);
    const divRef = useRef<HTMLDivElement>(null);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: title,
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
            }
        ]
    };

    // Chart options
    const chartOptions: ChartOptions<'bar'> = {
        indexAxis: 'y', // Horizontal bars
        responsive: true,
        layout: {
            padding: {
                right: 40,  // Add padding to the right to accommodate labels
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
                text: title,
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
            datalabels: {
                anchor: 'end',  // Position the label at the end of the bar
                align: 'end',   // Align it to the right for horizontal bars
                color: '#000',  // Set the color for better visibility
                formatter: (value) => value, // Show the exact value
                font: {
                    size: 12,   // Size of the label font
                },
                clip: false,  // Ensure the labels are not clipped
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: xLabel,
                    font: {
                        size: 14,
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: yLabel,
                    font: {
                        size: 14,
                    },
                },
                ticks: {
                    autoSkip: false,
                    maxRotation: 0,
                    minRotation: 0,
                    font: {
                        size: 14,
                    },
                },
            },
        },
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
    };

    // Function to download the plot
    const downloadPlot = async () => {
        const chart = divRef.current;
        if (chart) {
            const canvas = await html2canvas(chart);
            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = 'grafica.png'; // Set file name for download
            link.click(); // Trigger the download
        }
    };

    return (
        <div ref={divRef} className='flex justify-center'>
            <div className='w-[80%]'>
                <div className='flex justify-center space-x-2'>
                    <h2 className='title-2'>{title}</h2>
                    <button title='Descargar Grafica' onClick={() => downloadPlot()}><ArrowDownTrayIcon className='size-6'/></button>
                </div>
                <Bar ref={chartRef} data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default BarsPlot;
