import React from "react";
import "./Footer.scss";

export const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <p className="app-footer__line app-footer__brand">Motiq</p>
      <p className="app-footer__line">
        Vibe codé par{" "}
        <a href="https://theofarnole.fr" target="_blank" rel="noreferrer">
          Théo Farnole
        </a>
      </p>
      <p className="app-footer__line">
        <a href="https://github.com/Theo-Farnole/motiondesign-lib" target="_blank" rel="noreferrer">
          Contribuer ici
        </a>
      </p>
    </footer>
  );
};
