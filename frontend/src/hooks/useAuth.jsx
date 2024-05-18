import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getData, postData } from "../utils/fetch";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuth must be used inside an AuthProvider");
  }

  return context;
};

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const login = async (form) => {
    setIsLoading(true);

    const res = await postData("/api/auth/login", form);

    if (res.response?.data.status === "error") {
      setIsLoading(false);
      toast.warn(res.response.data.message);
    }

    if (res.data?.status === "success") {
      setIsLoading(false);
      localStorage.setItem("auth", JSON.stringify(res.data.data));
      dispatch({ type: "LOGIN", payload: res.data.data });
      navigate("/");
      toast.success(`Selamat Datang ${res.data.data.nama.split(" ")[0]}`);
    }
  };

  return { login, isLoading };
};

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (form) => {
    setIsLoading(true);

    const res = await postData("/api/auth/register", form);

    if (res.response?.data.status === "error") {
      setIsLoading(false);
      toast.warn(res.response.data.message);
    }

    if (res.data?.status === "success") {
      setIsLoading(false);
      navigate("/auth/login");
      toast.success(res.data.message);
    }
  };

  return { register, isLoading };
};

export const useLogout = () => {
  const { dispatch } = useAuth();
  const logout = async () => {
    const res = await getData("/api/auth/logout");

    if (res.data.status === "success") {
      localStorage.removeItem("auth");

      dispatch({ type: "LOGOUT" });

      toast.success("Logout success");
    }
  };

  return { logout };
};
