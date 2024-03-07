import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Pagination from "./Pagination";

export default function Table() {
  const [datas, setDatas] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 1,
    total: 1,
    totalPages: 1,
  });

  const handlePagination = (page) => {
    setPagination({
      ...pagination,
      page,
    });
  };

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        `http://localhost:8000/api/korosi?page=${pagination.page}`
      );
      setDatas(result.data.data);
      setPagination(result.data.pagination);
    }
    fetchData();
  }, [pagination.page]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    No.
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    Suhu
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Kelembapan
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    pH
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Lokasi
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Waktu
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {datas.map((data, index) => (
                  <tr key={data.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {pagination.limit * (pagination.page - 1) + index + 1}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {data.suhu}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {data.kelembapan}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {data.ph}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {data.lokasi}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {moment(data.createdAt).format("DD MMMM YYYY, hh:mm:ss")}
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
