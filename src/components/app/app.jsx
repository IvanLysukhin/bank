import AppNav from '../app-nav/app-nav';
import PromoBlock from '../promo-block/promo-block';
import AppFooter from '../app-footer/app-footer';
import React from 'react';
import Services from '../services/services';

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <AppNav/>
      </header>
      <main>
        <h1 className="app__title visually-hidden">Интернет-банк ЛИГА банк</h1>
        <PromoBlock/>
        <Services/>
      </main>
      <footer className="app__footer">
        <AppFooter/>
      </footer>
    </div>
  );
}

export default App;
