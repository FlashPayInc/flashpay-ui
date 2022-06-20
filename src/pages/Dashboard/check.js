const config = {
  type: "line",
  data: data,
  options: {
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
          max: 100,
          stepSize: 5,
        },
      },
    },
  },
};

const labels = Utils.months({ count: 9 });
const data = {
  labels: labels,
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 1200, 800, 381, 900, 1400, 400, 600, 81],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.28,
    },
  ],
};
