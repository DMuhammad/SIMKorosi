import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";
import ReportForm from "../views/report/ReportForm";
import ReportTable from "../views/report/ReportTable";
import { deleteData, getData, postData } from "../utils/fetch";

export default function Reports() {
  const { id: id_pengguna } = JSON.parse(localStorage.getItem("auth"));

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [valueInput, setValueInput] = useState({
    min_date: new Date().toISOString().split("T")[0],
    max_date: new Date().toISOString().split("T")[0],
  });
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 1,
    total: 1,
    totalPages: 1,
  });

  const handleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePagination = (page) => {
    setPagination({
      ...pagination,
      page,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValueInput({
      ...valueInput,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    postData("/api/laporan/create", {
      id_pengguna,
      tanggal_mulai: valueInput.min_date,
      tanggal_selesai: valueInput.max_date,
    })
      .then((data) => {
        if (data?.data?.status === "success") {
          fetchData(id_pengguna, pagination.page);
          toast.success("Laporan berhasil dibuat");
        }

        if (data?.response?.data?.status === "error") {
          console.log(data?.response?.data);
          toast.error(data?.response?.data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Gagal menambahkan laporan");
      });
  };

  const handleDelete = (id) => {
    deleteData(`/api/laporan/delete/${id}`)
      .then(() => {
        fetchData(id_pengguna, pagination.page);
        toast.success("Laporan berhasil dihapus");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function fetchData(id, page) {
    getData(`/api/laporan?id_pengguna=${id}&page=${page}`)
      .then((result) => {
        setData(result.data.data);
        setPagination(result.data.pagination);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchData(id_pengguna, pagination.page);
  }, [id_pengguna, pagination.page]);

  return (
    <div className="bg-gray-200 pb-10 min-h-screen">
      <Navbar handleSidebar={handleSidebar} title="Reports" />
      <Sidebar handleSidebar={handleSidebar} sidebar={sidebarOpen} />

      <ReportForm
        value={valueInput}
        onChange={handleChange}
        onClick={handleSubmit}
      />

      <ReportTable
        data={data}
        pagination={pagination}
        handlePagination={handlePagination}
        handleDelete={handleDelete}
      />
    </div>
  );
}
