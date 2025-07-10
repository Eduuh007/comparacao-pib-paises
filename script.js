const pibData = {
  brasil: {
    name: 'Brasil',
    data: [1.8, 2.1, 2.3, 2.5, 2.6], // em trilhões USD (exemplo)
    years: ['2017', '2018', '2019', '2020', '2021'],
  },
  eua: {
    name: 'Estados Unidos',
    data: [19.5, 20.5, 21.4, 20.9, 22.7],
    years: ['2017', '2018', '2019', '2020', '2021'],
  },
  china: {
    name: 'China',
    data: [12.0, 13.4, 14.3, 14.7, 16.9],
    years: ['2017', '2018', '2019', '2020', '2021'],
  },
  india: {
    name: 'Índia',
    data: [2.6, 2.7, 2.9, 2.7, 3.1],
    years: ['2017', '2018', '2019', '2020', '2021'],
  },
};

const ctx = document.getElementById('pibChart').getContext('2d');
let currentChart;

function gerarGrafico(pais) {
  const dados = pibData[pais];
  if (currentChart) currentChart.destroy();

  currentChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dados.years,
      datasets: [{
        label: `${dados.name} - PIB (Trilhões USD)`,
        data: dados.data,
        borderColor: 'rgba(33, 150, 243, 0.8)',
        backgroundColor: 'rgba(33, 150, 243, 0.3)',
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            color: '#333',              // cor do texto do eixo Y (valores)
            font: {
              size: 14                 // tamanho da fonte
            },
            callback: function(value) {
              return value + 'T';      // mostra T para trilhões
            }
          },
          grid: {
            color: '#ddd'             // cor das linhas horizontais do grid
          }
        },
        x: {
          ticks: {
            color: '#333',            // cor do texto do eixo X (anos)
            font: {
              size: 14
            }
          },
          grid: {
            color: '#eee'             // cor das linhas verticais do grid
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#111',           // cor da legenda
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(0,0,0,0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          cornerRadius: 4,
          displayColors: false,
          callbacks: {
            label: ctx => ctx.parsed.y + ' trilhões USD'
          }
        }
      }
    }
  });
}

document.getElementById('country-select').addEventListener('change', (e) => {
  gerarGrafico(e.target.value);
});

// Gera gráfico inicial com Brasil
gerarGrafico('brasil');

