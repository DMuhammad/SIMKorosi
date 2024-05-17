import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import axios from "axios";
import App from "./App.jsx";
import "./index.css";
import { NavigationProvider } from "./context/NavigationContext.jsx";

axios.defaults.baseURL = import.meta.env.VITE_APP_HOST;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <NavigationProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NavigationProvider>
    </AuthProvider>
  </React.StrictMode>
);
