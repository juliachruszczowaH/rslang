import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { IMonthStatData, IStatOptions } from '../../models/StatisticsModel';
const currentDate = new Date();
const month: string = currentDate.toLocaleString('default', { month: 'short' });
const day: number = currentDate.getDate() - 1;

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const ChartBar = (chartData: IStatOptions) => {
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
    console.log(creationDate.getDate());
    console.log(creationDate.toLocaleString('default', { month: 'short' }));
    if (key !== 'creationDate' && key !== 'lastLoginDate') {
      if (chartData[key]) {
        const temp = chartData[key] as IMonthStatData;
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
  });

  const increasingValues: number[] = [];
  dataset1.forEach((item, index, array) => {
    if (index > 0) {
      increasingValues.push(increasingValues[increasingValues.length - 1] + item);
    } else {
      increasingValues.push(item);
    }
  });
  console.log(dataset1);
  console.log(increasingValues);

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: dataset1,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Dataset 2',
        data: increasingValues,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y',
      },
    ],
  };

  return <Line options={options} data={data} />;
};
