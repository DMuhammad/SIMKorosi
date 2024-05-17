import { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { SocketContext } from "../context/SocketContext";
import { getData } from "../utils/fetch";
import moment from "moment";
import { useLocation } from "../hooks/useFetchData";
import Filter from "../views/dashboard/Filter";
import Chart from "../views/dashboard/Chart";
import DashboardTable from "../views/dashboard/DashboardTable";

export default function Dashboard() {
  const socket = useContext(SocketContext);

  const locations = useLocation();
  const times = ["Harian", "Mingguan", "Bulanan"];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 1,
    total: 1,
    totalPages: 1,
  });

  const [chartData, setChartData] = useState({
    suhu: [],
    kelembapan: [],
    ph: [],
    xlabel: [],
  });

  const [filter, setFilter] = useState({
    period: "Bulanan",
    location: locations[0],
  });

  const handleFilter = ({ name, value }) => {
    setFilter((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePagination = (page) => {
    setPagination((prevValue) => {
      return {
        ...prevValue,
        page,
      };
    });
  };

  useEffect(() => {
    async function fetchData() {
      const result = await getData(`/api/korosi?page=${pagination.page}`);
      setData(result.data.data);
      setPagination(result.data.pagination);
    }

    async function fetchDataChart() {
      const results = await getData(
        `/api/korosi/charts?period=${filter.period}&location=${filter.location}`
      );
      const newXLabels = [];
      const newSuhu = [];
      const newKelembapan = [];
      const newPh = [];

      results.data.data.forEach((result) => {
        newXLabels.push(moment(result.createdAt).format("HH:mm:ss"));
        newSuhu.push(result.suhu);
        newKelembapan.push(result.kelembapan);
        newPh.push(result.ph);
      });

      setChartData({
        suhu: newSuhu,
        kelembapan: newKelembapan,
        ph: newPh,
        xlabel: newXLabels,
      });
    }

    fetchData();
    fetchDataChart();

    const handleNewData = () => {
      fetchData();
      fetchDataChart();
    };

    socket.on("data-baru", handleNewData);

    // Bersihkan listener saat komponen di-unmount
    return () => {
      socket.off("data-baru", handleNewData);
    };
  }, [pagination.page, socket, filter]);

  return (
    <div className="bg-gray-200 pb-10">
      <Navbar title={"Dashboard"} handleSidebar={handleSidebar} />

      <Sidebar sidebar={sidebarOpen} handleSidebar={handleSidebar} />

      <Filter
        filter={filter}
        times={times}
        locations={locations}
        handleFilter={handleFilter}
      />

      <Chart chartData={chartData} />

      <DashboardTable
        data={data}
        pagination={pagination}
        handlePagination={handlePagination}
      />
    </div>
  );
}
