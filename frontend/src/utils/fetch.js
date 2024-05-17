import axios from "axios";

async function getData(url, params) {
  try {
    const { accessToken } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    return await axios.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    return error;
  }
}

async function downloadData(url) {
  try {
    const { accessToken } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    return await axios.get(url, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    return error;
  }
}

async function postData(url, payload) {
  try {
    const { accessToken } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    const headers = {
      "Content-Type": "application/json",
    };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    return await axios.post(url, payload, { headers });
  } catch (error) {
    return error;
  }
}

async function deleteData(url) {
  try {
    const { accessToken } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    return await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    return error;
  }
}

export { getData, postData, deleteData, downloadData };
