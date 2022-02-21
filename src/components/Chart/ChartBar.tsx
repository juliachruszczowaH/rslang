import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { IMonthStatData, IStatOptions } from '../../models/StatisticsModel';
const currentDate = new Date();
const month: string = currentDate.toLocaleString('en-US', { month: 'short' });
const day: number = currentDate.getDate() - 1;

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const ChartBar = (chartData: IStatOptions, totalLearned = false) => {
  const increasingValues: number[] = [];
  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Long Term Statistic',
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        beginAtZero: true,
      },
    },
  };

  const labels: string[] = [];
  const dataset1: number[] = [];
  Object.keys(chartData).forEach((key) => {
    const creationDate = new Date(chartData.creationDate);
    if (key !== 'creationDate' && key !== 'lastLoginDate') {
      if (chartData[key]) {
        const temp = chartData[key] as IMonthStatData;
        if (totalLearned) {
          temp.knownTotal.forEach((item, index) => {
            if (key === 'Feb' && index > 28) {
              console.log('not exists');
            } else {
              labels.push(`${key}.${index + 1}`);
              dataset1.push(item);
            }
          });
        } else {
          temp.newTotal.forEach((item, index) => {
            if (key === 'Feb' && index > 28) {
              console.log('not exists');
            } else {
              labels.push(`${key}.${index + 1}`);
              dataset1.push(item);
            }
          });
        }
      }
    }
  });

  if (totalLearned) {
    dataset1.forEach((item, index) => {
      if (index > 0) {
        increasingValues.push(increasingValues[increasingValues.length - 1] + item);
      } else {
        increasingValues.push(item);
      }
    });
  }

  const data = {
    labels,
    datasets: [
      {
        label: totalLearned ? 'Total learned words' : 'New words per date',
        data: dataset1,
        borderColor: totalLearned ? 'rgb(255, 99, 132)' : 'rgb(53, 162, 235)',
        backgroundColor: totalLearned ? 'rgba(255, 99, 132, 0.5)' : 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y',
      },
    ],
  };

  return <Line options={options} data={data} />;
};
