/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = ({  series, labels }) => {
  const [options, setOptions] = useState({
    chart: {
      type: 'donut',
    },
    labels: labels,
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




































// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// import { useEffect, useState } from 'react';
// import ReactApexChart from 'react-apexcharts';

// const ApexChart = ({  series, labels }) => {
//   const [options, setOptions] = useState({
//     chart: {
//       type: 'donut',
//     },
//     labels: labels,
//     responsive: [
//       {
//         breakpoint: 480,
//         options: {
//           chart: {
//             width: 100,
//           },
//           legend: {
//             position: 'bottom',
//           },
//         },
//       },
//     ],
//   });

//   return (
//     <div>
//       <div id="chart">
//         <ReactApexChart options={options} series={series} type="donut" />
//       </div>
//       <div id="html-dist"></div>
//     </div>
//   );
// };

// export default ApexChart;
