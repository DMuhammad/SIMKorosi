import AxiosInstance from "../axios/axiosInstance";

const axiosInstance = AxiosInstance();

async function getData(url, params) {
  try {
    return await axiosInstance.get(url, {
      params,
    });
  } catch (error) {
    return error;
  }
}

async function downloadData(url) {
  try {
    return await axiosInstance.get(url, {
      responseType: "blob",
    });
  } catch (error) {
    return error;
  }
}

async function postData(url, payload) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    return await axiosInstance.post(url, payload, { headers });
  } catch (error) {
    return error;
  }
}

async function deleteData(url) {
  try {
    return await axiosInstance.delete(url);
  } catch (error) {
    return error;
  }
}

export { getData, postData, deleteData, downloadData };
