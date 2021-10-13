import AppNav from '../app-nav/app-nav';
import PromoBlock from '../promo-block/promo-block';
import AppFooter from '../app-footer/app-footer';
import React, {useState} from 'react';
import Services from '../services/services';
import CreditCalc from '../credit-calc/credit-calc';
import MapComponent from '../map/map';
import GratitudeModal from '../../gratitude-modal/gratitude-modal';

function App() {
  const [gratitudeModalStatus, setGratitudeModalStatus] = useState(false);
  return (
    <div className="app">
      <header className="app__header">
        <AppNav/>
      </header>
      <main>
        <h1 className="app__title visually-hidden">Интернет-банк ЛИГА банк</h1>
        <PromoBlock/>
        <Services/>
        <CreditCalc sendApplicationHandler={setGratitudeModalStatus}/>
        <MapComponent/>
      </main>
      <footer className="app__footer">
        <AppFooter/>
      </footer>
      {gratitudeModalStatus && <GratitudeModal setGratitudeModalStatus={setGratitudeModalStatus}/>}
    </div>
  );
}

export default App;
