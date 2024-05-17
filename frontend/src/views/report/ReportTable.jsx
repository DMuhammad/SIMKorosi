import PropTypes from "prop-types";
import RTable from "../../components/RTable";

export default function ReportTable({
  data,
  pagination,
  handlePagination,
  handleDelete,
}) {
  return (
    <div className="overflow-hidden bg-white shadow rounded-lg w-11/12 mx-auto">
      <RTable
        data={data}
        titles={[
          "No",
          "Tanggal Mulai",
          "Tanggal Selesai",
          "Tanggal Pembuatan",
          "Aksi",
        ]}
        pagination={pagination}
        handlePagination={handlePagination}
        handleDelete={handleDelete}
      />
    </div>
  );
}

ReportTable.propTypes = {
  data: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  handlePagination: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
