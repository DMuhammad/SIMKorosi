import moment from "moment";
import PropTypes from "prop-types";
import { FolderArrowDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import Pagination from "./Pagination";
import Thead from "./Thead";
import { downloadData } from "../utils/fetch";

export default function RTable({
  data,
  titles,
  pagination,
  handlePagination,
  handleDelete,
}) {
  const { nama } = JSON.parse(localStorage.getItem("auth"));

  const handleDownload = (tanggal_mulai, tanggal_selesai) => {
    downloadData(
      `/api/korosi/download/excel?tanggal_mulai=${tanggal_mulai}&tanggal_selesai=${tanggal_selesai}&nama=${nama}`
    )
      .then((res) => {
        const timestamp = new Date()
          .toISOString()
          .replace(/[:\-T.]/g, "")
          .slice(0, -3);
        const fileName = `DataSensor_${timestamp}.xlsx`;
        const url = window.URL.createObjectURL(new Blob([res.data]));
        // Membuat link untuk download
        const link = document.createElement("a");
        link.href = url;
        // Menetapkan nama file yang akan didownload
        link.setAttribute("download", fileName);
        // Menambahkan link ke body dan memicu klik untuk mendownload
        document.body.appendChild(link);
        link.click();
        // Membersihkan dan menghapus link setelah download
        link.parentNode.removeChild(link);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-4 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <Thead title={titles} />
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((data, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                      {pagination.limit * (pagination.page - 1) + index + 1}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                      {moment(data.tanggal_mulai).format("DD MMMM YYYY")}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                      {moment(data.tanggal_selesai).format("DD MMMM YYYY")}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                      {moment(data.createdAt).format("DD MMMM YYYY, HH:mm:ss")}
                    </td>
                    <td className="whitespace-nowrap py-4 px-4 text-center text-sm text-gray-500 gap-4">
                      <button
                        type="button"
                        className="rounded-md bg-green-600 px-2.5 py-1.5 mx-1 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-green-600 hover:bg-green-500"
                        onClick={() =>
                          handleDownload(
                            data.tanggal_mulai,
                            data.tanggal_selesai
                          )
                        }
                      >
                        <FolderArrowDownIcon className="h-5 w-5 lg:hidden" />
                        <span className="hidden lg:block">Export to Excel</span>
                      </button>
                      <button
                        type="button"
                        className="rounded-md bg-red-600 px-2.5 py-1.5 mx-1 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-red-600  hover:bg-red-500"
                        onClick={() => handleDelete(data.id)}
                      >
                        <TrashIcon className="h-5 w-5 lg:hidden" />
                        <span className="hidden lg:block">Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {data.length === 0 && (
              <div className="text-center py-3">
                <h1>No Data</h1>
              </div>
            )}
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

RTable.propTypes = {
  data: PropTypes.array.isRequired,
  titles: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  handlePagination: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
