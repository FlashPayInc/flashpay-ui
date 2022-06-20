const config = {
  type: 'line',
  data: data,
  options:{
     scales: {
      x: {
        grid: {
          drawOnChartArea: false,
        }
      },
      y: {
                beginAtZero: true,
                ticks:{
                 min: 0,
      max: 100,
      stepSize: 5
            }
      }
  }
};