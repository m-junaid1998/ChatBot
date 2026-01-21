import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  LineController,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  LineController,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

const ClaimsChart = () => {
  const data = {
    labels: [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ],
    datasets: [
      {
        type: "bar",
        label: "Registerd",
        data: [
          30000, 35000, 42000, 50000, 48000, 70000, 60000, 50000, 55000, 45000,
          60000, 68000,
        ],
        backgroundColor: "#E5E5EF",
        borderRadius: 10,
        barPercentage: 0.5,
      },
      {
        type: "bar",
        label: "Approved",
        data: [
          10000, 8000, 6000, 9000, 7500, 11000, 9500, 7000, 8000, 6000, 9000,
          10000,
        ],
        backgroundColor: "#007AFF",
        borderRadius: 10,
        barPercentage: 0.5,
      },
      {
        type: "bar",
        label: "Rejected",
        data: [
          30000, 35000, 42000, 50000, 48000, 70000, 60000, 50000, 55000, 45000,
          60000, 68000,
        ],
        backgroundColor: "#FF3333",
        borderRadius: 10,
        barPercentage: 0.5,
      },
      {
        type: "line",
        label: "Total Claims",
        data: [
          20000, 30000, 35000, 40000, 45000, 68000, 57000, 53000, 50000, 47000,
          64000, 67000,
        ],
        borderColor: "#F31657",
        backgroundColor: "transparent",
        tension: 0.4,
        pointRadius: 0,
        pointBackgroundColor: "#F31657",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10000,
          callback: function (value) {
            return value / 1000 + "K";
          },
        },
        grid: {
          color: "#E6E6E6",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "215px" }}>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
};

export default ClaimsChart;
