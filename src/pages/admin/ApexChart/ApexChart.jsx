/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = ({ setChartData, chartJsonData }) => {
  const [options, setOptions] = useState({
    chart: {
      type: 'donut',
    },
    labels: [
      "Started",
      "Default",
      "On Going",
      "In Review"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 100,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  });

  const [series, setSeries] = useState([44, 55, 41, 17]);
  useEffect(() => {
    if (setChartData) {
      setChartData(series);
    }
  }, [series, setChartData]);


  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="donut" />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
