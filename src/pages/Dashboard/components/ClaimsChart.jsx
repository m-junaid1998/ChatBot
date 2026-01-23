import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ClaimsChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Other",
        data: [23000, 18000, 15000, 21000, 18000, 20000, 22000, 15000],
        backgroundColor: "#08627d",
        borderRadius: 6,
      },
      {
        label: "Media",
        data: [0, 0, 12000, 0, 0, 9000, 0, 0],
        backgroundColor: "#14b8a6",
        borderRadius: 6,
      },
      {
        label: "Documents",
        data: [0, 0, 12000, 0, 0, 13000, 0, 0],
        backgroundColor: "#ffad42",
        borderRadius: 6,
      },
      {
        label: "Images",
        data: [13000, 24000, 10000, 18000, 25000, 10000, 18000, 18000],
        backgroundColor: "#0a8d81",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      // 1. FIX THE OVERLAPPING NUMBERS
      datalabels: {
        display: false, // This stops the numbers from showing inside the bars
      },
      // 2. FIX THE LEGEND (Force Single Row)
      legend: {
        display: true,
        position: "top",
        align: "end", // Moves it to the right
        labels: {
          usePointStyle: true,
          pointStyle: "rectRounded",
          padding: 15, // Space between legend items
          boxWidth: 8,
          font: {
            size: 11,
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        border: { display: false },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        border: { display: false },
        grid: {
          color: "#f0f0f0",
          drawTicks: false,
        },
        ticks: {
          stepSize: 10000,
          callback: (value) => (value === 0 ? "00" : value / 1000 + "k"),
        },
      },
    },

    barPercentage: 0.45,
    categoryPercentage: 0.8,
  };

  return (
    <div className="BarChart">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ClaimsChart;