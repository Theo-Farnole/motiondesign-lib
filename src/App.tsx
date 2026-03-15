import React from "react";

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
            <li>Run <code>npm install</code></li>
            <li>Run <code>npm run dev</code></li>
          </ol>
        </section>
      </main>
    </div>
  );
};

