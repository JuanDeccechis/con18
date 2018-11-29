
var presets = window.chartColors;
var utils = Samples.utils;

new Chart(document.getElementById("chart"), {
    type: 'line',
    data: {
      labels: [
    'A2',
    'A1'
  ],
      datasets: [{
        /*TRANSPARENTE, para marcar los valores de los ejes Y*/
        backgroundColor: 'rgba(235, 75, 37, 0)',
        borderWidth: 0.01,
        yAxisID: 'y-axis-1',
        data: [0, 10],
        label: '',
        hidden: false,
        fill: false,
        radius: 0
    }, {
        /*TRANSPARENTE, para marcar los valores de los ejes Y*/
        backgroundColor: 'rgba(235, 75, 37, 0)',
        borderWidth: 0.01,
        yAxisID: 'y-axis-2',
        data: [0, 10],
        label: '',
        hidden: false,
        fill: false,
        radius: 0
    }, {
      /*FONDO*/
        backgroundColor: 'rgba(145, 210, 2, 0.5)',
        borderWidth: 0.01,
        data: [10, 10],
        hidden: false,
        label: '',
        fill: 1,
        radius: 0
    }, {
        backgroundColor: utils.transparentize(presets.blue),
        borderColor: presets.blue,
        data: [5, 6],
        label: 'B1',
        hidden: false,
        fill: false,
        radius: 6
    }, {
        backgroundColor: utils.transparentize(presets.red),
        borderColor: presets.red,
        data: [8, 4],
        label: 'B2',
        hidden: false,
        fill: false,
        radius: 6
    }]
    },
    options: {
          responsive: true,
          hoverMode: 'index',
          stacked: false,
          title: {
            display: true,
            text: 'Chart.js',
            fontColor: 'black',
          },
          scales: {
            yAxes: [{
              type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
              display: true,
              position: 'left',
              id: 'y-axis-2',
              min: 0,
              max: 10,
            }, {
              type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
              display: true,
              position: 'right',
              id: 'y-axis-1',
              min: 0,
              max: 10,
              // grid line settings
              gridLines: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
            }],
          }
        },
        defaults: [Chart.defaults.global.defaultFontColor = 'black',
                  Chart.defaults.global.defaultFontSize = 16]
      });
