import Logo from '../logo/logo';
import React, {useEffect, useState} from 'react';
import {func, bool} from 'prop-types';

function AppNav({setLoginModalStatus, loginModalStatus}) {
  const [loginData, setLoginData] = useState(null);
  const [menu, setMenu] = useState(false);

  const menuBtnClickHandler = () => {
    setMenu((prevState) => !prevState);
  };

  const loginClickHandler = (evt) => {
    evt.preventDefault();
    setLoginModalStatus(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('login');
    setLoginData(null);
  };

  useEffect(()=>{
    setLoginData(JSON.parse(localStorage.getItem('login')));
  }, [loginModalStatus]);

  useEffect(() => {
    if (menu) {
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.documentElement.style.overflow = 'scroll';
      };
    }
  }, [menu]);
  return (
    <nav className="app-header__nav app-nav">
      <button
        className="app-nav__burger-btn"
        area-label="Открыть меню"
        onClick={menuBtnClickHandler}
      >
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 1H16M0 6H16M0 11H16" stroke="#1F1E25" strokeLinejoin="round"/>
        </svg>
      </button>
      <Logo/>
      <ul className={`app__list app-nav__list ${menu && 'app-nav__list--open'}`}>
        <li className="app-nav__item">
          <a className="app__link app-nav__link" href="#">
            Услуги
          </a>
        </li>
        <li className="app-nav__item">
          <a className="app__link app-nav__link app-nav__link--current" href="#">
            Рассчитать кредит
          </a>
        </li>
        <li className="app-nav__item">
          <a className="app__link app-nav__link" href="#">
            Конвертер валют
          </a>
        </li>
        <li className="app-nav__item">
          <a className="app__link app-nav__link" href="#">
            Контакты
          </a>
        </li>
        <li className="app-nav__item">
          <a
            className="app__link app-nav__log-in app-nav__log-in--in-list"
            href="#"
            onClick={loginClickHandler}
          >
            <svg className="app-nav__pic" width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.22222 14.3H4.44444V19.8H17.7778V2.2H4.44444V7.7H2.22222V1.1C2.22222 0.808262 2.33929 0.528472 2.54766 0.322183C2.75603 0.115892 3.03865 0 3.33333 0H18.8889C19.1836 0 19.4662 0.115892 19.6746 0.322183C19.8829 0.528472 20 0.808262 20 1.1V20.9C20 21.1917 19.8829 21.4715 19.6746 21.6778C19.4662 21.8841 19.1836 22 18.8889 22H3.33333C3.03865 22 2.75603 21.8841 2.54766 21.6778C2.33929 21.4715 2.22222 21.1917 2.22222 20.9V14.3ZM8.88889 9.9V6.6L14.4444 11L8.88889 15.4V12.1H0V9.9H8.88889Z"
                fill="#1F1E25"
              />
            </svg>
            Войти в Интернет-банк
          </a>
        </li>
      </ul>
      {loginData ?
        <a
          className="app__link app-nav__log-in"
          href="#"
          onClick={logoutHandler}
        >
          {loginData && loginData.login}
        </a>
        :
        <a
          className="app__link app-nav__log-in"
          href="#"
          onClick={menu ? menuBtnClickHandler : loginClickHandler}
        >
          {menu ?
            <svg className="app-nav__close" width="13" height="13" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L17 17M17 1L1 17" stroke="#1F1E25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg> :
            <svg className="app-nav__pic" width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.22222 14.3H4.44444V19.8H17.7778V2.2H4.44444V7.7H2.22222V1.1C2.22222 0.808262 2.33929 0.528472 2.54766 0.322183C2.75603 0.115892 3.03865 0 3.33333 0H18.8889C19.1836 0 19.4662 0.115892 19.6746 0.322183C19.8829 0.528472 20 0.808262 20 1.1V20.9C20 21.1917 19.8829 21.4715 19.6746 21.6778C19.4662 21.8841 19.1836 22 18.8889 22H3.33333C3.03865 22 2.75603 21.8841 2.54766 21.6778C2.33929 21.4715 2.22222 21.1917 2.22222 20.9V14.3ZM8.88889 9.9V6.6L14.4444 11L8.88889 15.4V12.1H0V9.9H8.88889Z"
                fill="#1F1E25"
              />
            </svg>}
        Войти в Интернет-банк
        </a>}
    </nav>
  );
}

AppNav.propTypes = {
  setLoginModalStatus: func.isRequired,
  loginModalStatus: bool.isRequired,
};

export default AppNav;
