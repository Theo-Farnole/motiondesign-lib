import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const Layout: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <main className="app__content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
