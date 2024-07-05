import { useEffect, useState } from "react";
import { getData } from "../utils/fetch";
import moment from "moment";

export const useLocation = () => {
  const [locations, setLocations] = useState(["1: Area A"]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const results = await getData("/api/lokasi");
        setLocations(
          results.data.data.map(
            (result) => `${result.id}: ${result.nama_lokasi}`
          )
        );
      } catch (err) {
        console.error(err);
      }
    };
    fetchLocations();
  }, []);
  return locations;
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
