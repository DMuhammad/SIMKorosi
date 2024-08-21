import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import "./index.css";
import { NavigationProvider } from "./context/NavigationContext.jsx";
import "moment/dist/locale/id";

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
