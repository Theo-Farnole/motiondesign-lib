import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { App } from "./App";
import { PlayerPage } from "./pages/PlayerPage";
import { SearchPage } from "./pages/SearchPage";
import "./styles.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<App />} />
          <Route path="search/:term" element={<SearchPage />} />
          <Route path="ref/:id" element={<PlayerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
