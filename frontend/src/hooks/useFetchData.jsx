import { useCallback, useState } from "react";
import { getData } from "../utils/fetch";
import moment from "moment";

export const useLocation = () => {
  const [locations, setLocations] = useState(null);

  const fetchLocations = useCallback(async () => {
    if (!locations) {
      // Cek apakah locations sudah di-load atau tidak
      try {
        const results = await getData("/api/lokasi");
        setLocations(results.data.data.map((result) => result.nama_lokasi));
      } catch (err) {
        console.error(err);
      }
    }
  }, [locations]);

  // Panggil fetchLocations segera untuk mengisi locations
  fetchLocations();

  // Jika locations belum di-load, kembalikan nilai default yang aman
  return locations || ["Area A"];
};
export const useChartData = () => {
  const [xlabel, setXLabel] = useState([]);
  const [suhu, setSuhu] = useState([]);
  const [kelembapan, setKelembapan] = useState([]);
  const [ph, setPh] = useState([]);

  const fetchChartData = async (period, location) => {
    const results = await getData(
      `/api/korosi/charts?period=${period}&location=${location}`
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

    setXLabel(newXLabels);
    setSuhu(newSuhu);
    setKelembapan(newKelembapan);
    setPh(newPh);
  };

  return [xlabel, suhu, kelembapan, ph, fetchChartData];
};
