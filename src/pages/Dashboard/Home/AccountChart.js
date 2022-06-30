import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        drawOnChartArea: false,
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        min: 0,
        max: 1500,
        stepSize: 500,
      },
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Augut",
  "September",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [65, 1200, 800, 381, 900, 1700, 400, 600, 81],
      borderColor: "#0BD98E",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      tension: 0.28,
    },
  ],
};

const AccountChart = () => {
  return <Line options={options} data={data} />;
};

export default AccountChart;
