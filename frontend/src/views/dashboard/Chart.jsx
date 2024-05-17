import PropTypes from "prop-types";
import LineChart from "../../components/LineChart";

export default function Chart({ chartData }) {
  return (
    <div className="my-10 w-11/12 mx-auto">
      <div className="flex justify-between">
        <LineChart
          title="Suhu"
          xData={chartData.xlabel}
          yData={chartData.suhu}
        />
        <LineChart
          title="Kelembapan"
          xData={chartData.xlabel}
          yData={chartData.kelembapan}
        />
        <LineChart title="pH" xData={chartData.xlabel} yData={chartData.ph} />
      </div>
    </div>
  );
}

Chart.propTypes = {
  chartData: PropTypes.object.isRequired,
};
