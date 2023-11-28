import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "material-symbols";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme.ts";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import { Login } from "./Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />
  },
  {
    path: "/app",
    element: <App />
  },
  {
    path: "/login",
    element: <Login />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// Remove Preload scripts loading
postMessage({ payload: "removeLoading" }, "*");
