import AppNav from '../app-nav/app-nav';
import PromoBlock from '../promo-block/promo-block';
import AppFooter from '../app-footer/app-footer';
import React, {useState, useRef, useEffect, useCallback} from 'react';
import Services from '../services/services';
import CreditCalc from '../credit-calc/credit-calc';
import MapComponent from '../map/map';
import GratitudeModal from '../gratitude-modal/gratitude-modal';
import LoginModal from '../login-modal/login-modal';
import {useFocus} from '../../custom-hooks/useFocus';

function App() {
  const [gratitudeModalStatus, setGratitudeModalStatus] = useState(false);
  const [loginModalStatus, setLoginModalStatus] = useState(false);
  const [mapY, setMapY] = useState(0);
  const [creditCalcY, setCreditCalcY] = useState(0);

  const map = useRef();
  const creditCalc = useRef();

  const scrollToCreditCalc = useCallback((evt) => {
    evt.preventDefault();
    window.scrollBy(0, +creditCalcY);
  }, [creditCalcY]);

  useEffect(() => {
    setMapY(map.current.getBoundingClientRect().y);
    setCreditCalcY(creditCalc.current.getBoundingClientRect().y);
  }, []);

  useFocus([]);

  return (
    <div className="app">
      <header className="app__header">
        <AppNav setLoginModalStatus={setLoginModalStatus} loginModalStatus={loginModalStatus} scrollToCreditCalc={scrollToCreditCalc}/>
      </header>
      <main>
        <h1 className="app__title visually-hidden">Интернет-банк ЛИГА банк</h1>
        <PromoBlock mapY={mapY} scrollToCreditCalc={scrollToCreditCalc}/>
        <Services  modalStatus={
          {
            gratitudeModalStatus,
            loginModalStatus,
          }
        }
        />
        <CreditCalc sendApplicationHandler={setGratitudeModalStatus} link={creditCalc}/>
        <MapComponent link={map}/>
      </main>
      <footer className="app__footer">
        <AppFooter scrollToCreditCalc={scrollToCreditCalc}/>
      </footer>
      {loginModalStatus && <LoginModal setLoginModalStatus={setLoginModalStatus}/>}
      {gratitudeModalStatus && <GratitudeModal setGratitudeModalStatus={setGratitudeModalStatus}/>}
    </div>
  );
}

export default App;
