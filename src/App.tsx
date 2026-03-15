import React from "react";
import { ReferenceThumbnail } from "./components/ReferenceThumbnail";
import { references } from "./data/references";

export const App: React.FC = () => {
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
                {references.map((reference, index) => (
                  <ReferenceThumbnail key={index} reference={reference} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

