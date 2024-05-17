import moment from "moment";
import PropTypes from "prop-types";

export default function Tbody({ datas, pagination }) {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {datas.map((data, index) => (
        <tr key={index}>
          <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
            {pagination.limit * (pagination.page - 1) + index + 1}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
            {data.suhu}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
            {data.kelembapan}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
            {data.ph}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
            {data.lokasi.nama_lokasi}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
            {moment(data.createdAt).format("DD MMMM YYYY, HH:mm:ss")}
          </td>
        </tr>
      ))}
    </tbody>
  );
}

Tbody.propTypes = {
  datas: PropTypes.array.isRequired,
  pagination: PropTypes.object,
};
