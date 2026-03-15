import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { PlayerPage } from "./pages/PlayerPage";
import "./styles.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ref/:id" element={<PlayerPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
