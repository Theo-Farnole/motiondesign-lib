import React from "react";
import "./Footer.scss";

export const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <p className="app-footer__line">
        Vibe codé par{" "}
        <a href="https://gweron.fr" target="_blank" rel="noreferrer">
          gweron
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
