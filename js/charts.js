/* ========================================
   RBT – Charts & Analytics Dashboard
   Powered by Chart.js
   ======================================== */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Wait for AOS / page to settle before rendering
  setTimeout(initCharts, 400);
});

function initCharts() {
  if (typeof Chart === 'undefined') return;

  // ── Global defaults ──
  Chart.defaults.font.family = "'Inter', 'Cairo', sans-serif";
  Chart.defaults.color = 'rgba(255,255,255,0.55)';

  const gridColor  = 'rgba(255,255,255,0.06)';
  const tickColor  = 'rgba(255,255,255,0.45)';
  const blue       = '#1E9BD7';
  const cyan       = '#16A5E3';
  const gold       = '#F5A623';
  const green      = '#22c55e';
  const blueDark   = '#1259B5';

  // ─────────────────────────────────────
  // Chart 1 · Monthly On-Time Performance
  // ─────────────────────────────────────
  const ctxOnTime = document.getElementById('chartOnTime');
  if (ctxOnTime) {
    new Chart(ctxOnTime, {
      type: 'line',
      data: {
        labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'On-Time Rate (%)',
            data: [94, 96, 97, 95, 98, 97, 99, 97, 96, 97],
            borderColor: cyan,
            backgroundColor: (ctx) => {
              const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 280);
              g.addColorStop(0, 'rgba(22,165,227,0.25)');
              g.addColorStop(1, 'rgba(22,165,227,0)');
              return g;
            },
            fill: true,
            tension: 0.45,
            pointBackgroundColor: cyan,
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            borderWidth: 2.5,
          },
          {
            label: 'Target (%)',
            data: [95, 95, 95, 95, 95, 95, 95, 95, 95, 95],
            borderColor: 'rgba(245,166,35,0.55)',
            borderDash: [6, 4],
            borderWidth: 1.5,
            fill: false,
            pointRadius: 0,
            tension: 0,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: { boxWidth: 12, padding: 16, color: tickColor, font: { size: 11 } }
          },
          tooltip: {
            backgroundColor: 'rgba(10,46,110,0.95)',
            titleColor: '#fff',
            bodyColor: 'rgba(255,255,255,0.75)',
            borderColor: 'rgba(22,165,227,0.3)',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}%`
            }
          }
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: tickColor, font: { size: 11 } }
          },
          y: {
            min: 90,
            max: 100,
            grid: { color: gridColor },
            ticks: {
              color: tickColor,
              font: { size: 11 },
              callback: (v) => v + '%'
            }
          }
        }
      }
    });
  }

  // ─────────────────────────────────────
  // Chart 2 · Safety Record (Doughnut)
  // ─────────────────────────────────────
  const ctxSafety = document.getElementById('chartSafety');
  if (ctxSafety) {
    new Chart(ctxSafety, {
      type: 'doughnut',
      data: {
        labels: ['Trips Completed Safely', 'Minor Delays', 'No Incidents'],
        datasets: [{
          data: [91.5, 8.5, 0],
          backgroundColor: [blue, gold, 'rgba(226,232,240,0.15)'],
          borderColor: ['#0A2E6E', '#0A2E6E', '#0A2E6E'],
          borderWidth: 3,
          hoverOffset: 8,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(10,46,110,0.95)',
            titleColor: '#fff',
            bodyColor: 'rgba(255,255,255,0.75)',
            borderColor: 'rgba(22,165,227,0.3)',
            borderWidth: 1,
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`
            }
          }
        }
      },
      plugins: [{
        id: 'centerText',
        beforeDraw(chart) {
          const { ctx, chartArea: { left, right, top, bottom } } = chart;
          const cx = (left + right) / 2;
          const cy = (top + bottom) / 2;
          ctx.save();
          ctx.font = 'bold 28px Inter, sans-serif';
          ctx.fillStyle = '#fff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('100%', cx, cy - 10);
          ctx.font = '11px Inter, sans-serif';
          ctx.fillStyle = 'rgba(255,255,255,0.5)';
          ctx.fillText('Safe', cx, cy + 14);
          ctx.restore();
        }
      }]
    });
  }

  // ─────────────────────────────────────
  // Chart 3 · Fleet Compliance (Radar)
  // ─────────────────────────────────────
  const ctxRadar = document.getElementById('chartRadar');
  if (ctxRadar) {
    new Chart(ctxRadar, {
      type: 'radar',
      data: {
        labels: [
          'Vehicle Safety', 'Driver Training', 'GPS Compliance',
          'CCTV Coverage', 'Maintenance', 'Route Adherence'
        ],
        datasets: [
          {
            label: 'RBT Score',
            data: [98, 97, 100, 99, 96, 98],
            backgroundColor: 'rgba(22,165,227,0.15)',
            borderColor: cyan,
            pointBackgroundColor: cyan,
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            borderWidth: 2,
          },
          {
            label: 'RTA Minimum',
            data: [80, 80, 80, 80, 80, 80],
            backgroundColor: 'rgba(245,166,35,0.05)',
            borderColor: 'rgba(245,166,35,0.4)',
            borderDash: [5, 5],
            pointRadius: 0,
            borderWidth: 1.5,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 10, padding: 14, color: tickColor, font: { size: 10 } }
          },
          tooltip: {
            backgroundColor: 'rgba(10,46,110,0.95)',
            titleColor: '#fff',
            bodyColor: 'rgba(255,255,255,0.75)',
            borderColor: 'rgba(22,165,227,0.3)',
            borderWidth: 1,
          }
        },
        scales: {
          r: {
            min: 70,
            max: 100,
            grid: { color: gridColor },
            angleLines: { color: gridColor },
            ticks: {
              color: tickColor,
              font: { size: 9 },
              backdropColor: 'transparent',
              stepSize: 10
            },
            pointLabels: {
              color: 'rgba(255,255,255,0.65)',
              font: { size: 10 }
            }
          }
        }
      }
    });
  }

  // ─────────────────────────────────────
  // Chart 4 · Student Growth (Bar)
  // ─────────────────────────────────────
  const ctxGrowth = document.getElementById('chartGrowth');
  if (ctxGrowth) {
    new Chart(ctxGrowth, {
      type: 'bar',
      data: {
        labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
        datasets: [
          {
            label: 'Students Transported',
            data: [720, 850, 980, 1120, 1300, 1050, 1200, 1500, 1750, 1900, 2100],
            backgroundColor: (ctx) => {
              const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 260);
              g.addColorStop(0, cyan);
              g.addColorStop(1, blueDark);
              return g;
            },
            borderRadius: 6,
            borderSkipped: false,
            barPercentage: 0.65,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index' },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(10,46,110,0.95)',
            titleColor: '#fff',
            bodyColor: 'rgba(255,255,255,0.75)',
            borderColor: 'rgba(22,165,227,0.3)',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: (ctx) => ` Students: ${ctx.parsed.y.toLocaleString()}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: tickColor, font: { size: 11 } }
          },
          y: {
            grid: { color: gridColor },
            ticks: {
              color: tickColor,
              font: { size: 11 },
              callback: (v) => v >= 1000 ? (v / 1000).toFixed(1) + 'k' : v
            }
          }
        }
      }
    });
  }
}
