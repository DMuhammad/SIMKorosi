import PropTypes from "prop-types";
import LineChart from "../../components/LineChart";

export default function Chart({ chartData }) {
  return (
    <div className="my-10 w-11/12 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-9">
        <LineChart
          title="Suhu"
          xData={chartData.xlabel}
          yData={chartData.suhu}
          yAxis={50}
        />
        <LineChart
          title="Kelembapan"
          xData={chartData.xlabel}
          yData={chartData.kelembapan}
          yAxis={80}
        />
        <LineChart
          title="pH"
          xData={chartData.xlabel}
          yData={chartData.ph}
          yAxis={7}
        />
      </div>
    </div>
  );
}

Chart.propTypes = {
  chartData: PropTypes.object.isRequired,
};
