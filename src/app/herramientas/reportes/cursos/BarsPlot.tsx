import { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController, ChartOptions } from 'chart.js';


// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController);


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

    const chartRef = useRef(null);

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
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
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

    return (
        <Bar ref={chartRef} data={chartData} options={chartOptions} />
    );
};
export default BarsPlot;
