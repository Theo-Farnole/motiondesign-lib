import React from "react";
import { LinkItem } from "./components/LinkItem";
import { useSqlLinks } from "./database";

export const App: React.FC = () => {
  const links = useSqlLinks();

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Motion Design Library</h1>
        <p className="app__subtitle">
          React + TypeScript + SCSS starter.
        </p>
      </header>
      <main className="app__content">
        <section className="card">
          <h2 className="card__title">Getting started</h2>
          <ol className="card__list">
            <li>
              Run <code>npm install</code>
            </li>
            <li>
              Run <code>npm run dev</code>
            </li>
          </ol>
        </section>

        <section className="card" style={{ marginTop: "2rem" }}>
          <h2 className="card__title">Links (from SQL base)</h2>
          <div className="card__content">
            <table className="table">
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Timecode</th>
                  <th>Channel</th>
                  <th>Tags</th>
                </tr>
              </thead>
              <tbody>
                {links.map((link, index) => (
                  <LinkItem key={index} link={link} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

