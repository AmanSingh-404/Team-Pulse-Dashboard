import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusChart = ({ members }) => {
  // Calculate counts dynamically
  const working = members.filter(m => m.status === 'Working').length;
  const meeting = members.filter(m => m.status === 'Meeting').length;
  const onBreak = members.filter(m => m.status === 'Break').length;
  const offline = members.filter(m => m.status === 'Offline').length;

  const data = {
    labels: ['Working', 'Meeting', 'Break', 'Offline'],
    datasets: [
      {
        data: [working, meeting, onBreak, offline],
        backgroundColor: [
          '#22c55e', // Green for Working
          '#a855f7', // Purple for Meeting
          '#eab308', // Yellow for Break
          '#9ca3af', // Gray for Offline
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
           boxWidth: 15,
           font: { size: 10 }
        }
      }
    }
  };

  return (
    <div className="h-40 w-full">
        <h4 className="text-sm font-bold text-gray-500 mb-2 text-center">Live Status Distribution</h4>
        <Pie data={data} options={options} />
    </div>
  );
};

export default StatusChart;