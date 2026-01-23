import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the plugin

// Register everything including the DataLabels plugin
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PriorApprovalsChart = () => {
  const pieData = {
    labels: ["PDF", "Docs", "PPT", "jpg"],
    datasets: [
      {
        data: [48, 23, 12, 17],
        backgroundColor: [
          "#08627d", // PDF - Dark Blue
          "#ffad42", // Docs - Orange
          "#0a8d81", // PPT - Dark Teal
          "#14b8a6", // jpg - Light Teal
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        color: "#fff",
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${value}%\n${label}`;
        },
        font: {
        
          size: 12,
        },
        textAlign: "center",
      },
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
        },
      },
    },
  };

  return (
    <div className="PieChart">
      <Pie data={pieData} options={options} />
    </div>
  );
};

export default PriorApprovalsChart;