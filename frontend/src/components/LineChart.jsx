import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

export default function LineChart({ title, xData, yData, yAxis }) {
  const options = {
    chart: {
      animations: {
        enabled: true,
      },
      type: "line",
      fontFamily: "Inter, sans-serif",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 5,
      curve: "smooth",
    },
    xaxis: {
      categories: xData,
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
      },
    },
    yaxis: {
      show: true,
    },
    annotations: {
      yaxis: [
        {
          y: yAxis,
          borderColor: "#D51B21",
          strokeDashArray: 0,
          label: {
            borderColor: "#D51B21",
            style: {
              color: "#fff",
              background: "#D51B21",
            },
            text: `Batas nilai ${title}`,
            textAnchor: "center",
            position: "left",
          },
        },
      ],
    },
  };

  const series = [
    {
      name: title,
      data: yData,
    },
  ];

  return (
    <div className="max-w-full lg:max-w-sm w-full shadow-slate-400 p-4 md:p-6 overflow-hidden bg-white rounded-lg">
      <div className="flex justify-between">
        <h1 className="self-center ms-4">{title}</h1>
      </div>
      <div id="line-chart" className="overflow-x-scroll overflow-y-hidden">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
          width={xData.length * 40}
        />
      </div>
    </div>
  );
}

LineChart.propTypes = {
  title: PropTypes.string.isRequired,
  xData: PropTypes.array.isRequired,
  yData: PropTypes.array.isRequired,
  yAxis: PropTypes.number.isRequired,
};
