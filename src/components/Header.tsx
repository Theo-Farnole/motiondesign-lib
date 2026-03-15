import React from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import "./Header.scss";

export const Header: React.FC = () => {
  return (
    <header className="global-header">
      <Link to="/" className="global-header__home" aria-label="Accueil">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </Link>
      <div className="global-header__search">
        <SearchBar />
      </div>
    </header>
  );
};
