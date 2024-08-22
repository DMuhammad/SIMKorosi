import moment from "moment";
import PropTypes from "prop-types";
import Pagination from "./Pagination";
import Thead from "./Thead";

export default function Table({ datas, titles, pagination, handlePagination }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-4 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <Thead title={titles} />
              <tbody className="divide-y divide-gray-200 bg-white">
                {datas.map((data, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-3 py-2 text-center text-sm text-gray-500">
                      {pagination.limit * (pagination.page - 1) + index + 1}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-center text-sm text-gray-500">
                      {data.suhu}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-center text-sm text-gray-500">
                      {data.kelembapan}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-center text-sm text-gray-500">
                      {data.ph}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-center text-sm text-gray-500">
                      {data.sensor.lokasi.nama_lokasi}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-center text-sm text-gray-500">
                      {moment(data.createdAt).format("DD MMMM YYYY, HH:mm:ss")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              pagination={pagination}
              handlePagination={handlePagination}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

Table.propTypes = {
  datas: PropTypes.array,
  titles: PropTypes.array.isRequired,
  pagination: PropTypes.object,
  handlePagination: PropTypes.func,
};
