import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PriorApprovalsChart = () => {
  const layeredData = {
    labels: ["Pending", "Approved", "Rejected"],
    datasets: [
      {
        label: "Approved",
        data: [75, 25],
        backgroundColor: ["#007AFF", "#f3f3f3"],
        radius: "100%",
        borderRadius: 20,
        cutout: "50%",
        circumference: 360,
      },
      {
        label: "Pending",
        data: [55, 45],
        backgroundColor: ["#FFA500", "#f3f3f3"],
        radius: "85%",
        cutout: "45%",
        borderRadius: 20,
      },
      {
        label: "Rejected",
        data: [73, 27],
        backgroundColor: ["#FF3333", "#f3f3f3"],
        radius: "70%",
        cutout: "40%",
        borderRadius: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    boxWidth: 20,
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          generateLabels: (chart) => {
            return chart?.data?.datasets?.map((item, index) => {
              const percentage = (
                (item?.data[0] / item?.data?.reduce((a, b) => a + b, 0)) *
                100
              ).toFixed(1);
              return {
                text: `${item?.label} ${`${percentage}%`}`,
                fillStyle: item?.backgroundColor[0], // Use the segment color for the legend
                // strokeStyle: item?.borderColor, // Border color for the legend
                hidden: !chart.getDataVisibility(index),
                datasetIndex: 0,
                index,
              };
            });
          },
          font: {
            weight: "bold",
            size: "14px",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed}%`,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "215px" }}>
      <Doughnut data={layeredData} options={options} />
    </div>
  );
};

export default PriorApprovalsChart;
