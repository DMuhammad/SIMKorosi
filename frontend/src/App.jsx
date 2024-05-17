import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import NotFound from "./pages/NotFound";
import { useAuth } from "./hooks/useAuth";
import Reports from "./pages/Reports";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user } = useAuth();
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate to={"/auth/login"} />}
        />
        <Route path="/reports" element={<Reports />} />
        <Route
          path="/auth/login"
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/auth/register"
          element={!user ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
