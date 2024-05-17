import PropTypes from "prop-types";
import Table from "../../components/Table";

export default function DashboardTable({ data, pagination, handlePagination }) {
  return (
    <div className="overflow-hidden bg-white shadow rounded-lg w-11/12 mx-auto">
      <Table
        datas={data}
        titles={["No", "Suhu", "Kelembapan", "pH", "Lokasi", "Waktu"]}
        pagination={pagination}
        handlePagination={handlePagination}
      />
    </div>
  );
}

DashboardTable.propTypes = {
  data: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  handlePagination: PropTypes.func.isRequired,
};
