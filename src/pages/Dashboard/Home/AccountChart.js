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
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AccountChart = ({ data = [] }) => {
  const { theme } = useSelector(state => state.config);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    parsing: {
      xAxisKey: "asset",
      yAxisKey: "amount",
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          borderColor: theme === "dark" ? "#333" : "#e0e0e0",
          drawOnChartArea: false,
          tickColor: "transparent",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          min: 0,
          max: 1500,
          stepSize: 500,
        },
        grid: {
          color: theme === "dark" ? "#333" : "#e0e0e0",
          borderColor: theme === "dark" ? "#333" : "#e0e0e0",
          tickColor: "transparent",
        },
      },
    },
  };

  // if (!data) return;

  const chartData = {
    // labels,
    // labels: data.map(i => i?.asset),
    datasets: [
      {
        data,
        tension: 0.28,
        label: "Amount",
        borderColor: "#0BD98E",
        backgroundColor: "#006174",
      },
    ],
  };

  return <Line options={options} data={chartData} />;
};

export default AccountChart;
