import React, {useState, useRef} from 'react';
import {func} from 'prop-types';
import {useModal} from '../../custom-hooks/useModal';

function LoginModal({setLoginModalStatus}) {
  const [showPassword, setShowPassword] = useState(false);
  const modal = useRef();

  const closeBtnRef = useRef();
  const loginRef = useRef();
  const passwordRef = useRef();
  const hideRef = useRef();
  const btnRef = useRef();


  const showPasswordBtnClickHandler = (evt) => {
    evt.preventDefault();
    setShowPassword((prevState) => !prevState);
  };

  const closeBtnClickHandler = () => {
    setLoginModalStatus(false);
  };

  const escKeydownHandler = (evt) => {
    if (evt.keyCode === 27) {
      setLoginModalStatus(false);
    }
  };

  const overlayClickHandler = ({target}) => {
    if (target === modal.current) {
      setLoginModalStatus(false);
    }
  };

  const submitFormHandler = (evt) => {
    evt.preventDefault();
    const data = new FormData(evt.target);

    const login = data.get('login');
    const password = data.get('password');

    const loginData = {
      login,
      password,
    };

    if (login &&
      password &&
      password.length !== 0 &&
      password.length !== 0
    ) {
      const prevUser = JSON.parse(localStorage.getItem('login'));
      setLoginModalStatus(false);

      if (!prevUser) {
        localStorage.setItem('login', JSON.stringify(loginData));
        return;
      }
      localStorage.setItem('login', JSON.stringify(loginData));
    }
  };

  useModal(escKeydownHandler,
    [
      loginRef,
      passwordRef,
      hideRef,
      btnRef,
      closeBtnRef,
    ]);

  return (
    <div
      className="login-modal"
      ref={modal}
      onClick={overlayClickHandler}
    >
      <div className="login-modal__container">
        <div className="login-modal__wrapper">
          <div className="login-modal__header">
            <div className="login-modal__logo">
              <svg className="login-modal__logo-icon" width="32" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.875 1H14.75L1 24.0488H5.0625L6.9375 20.7561L17.875 1Z" fill="#2C36F2"/>
                <path d="M2.875 28H29.125L17.875 7.58537L16 10.878L21.625 20.7561L23.5 24.0488H5.0625H1L2.875 28Z" fill="#2C36F2"/>
                <path d="M23.5 24.0488L21.625 20.7561H10.375H6.9375L5.0625 24.0488H23.5Z" fill="#2C36F2"/>
                <path d="M29.125 28L31 24.0488L17.875 1L6.9375 20.7561H10.375L16 10.878L17.875 7.58537L29.125 28Z" fill="#2C36F2"/>
                <path d="M16 10.878L10.375 20.7561H21.625L16 10.878Z" fill="#2C36F2"/>
                <path d="M29.125 28H2.875L1 24.0488M29.125 28L31 24.0488L17.875 1M29.125 28L17.875 7.58537L16 10.878M17.875 1H14.75L1 24.0488M17.875 1L6.9375 20.7561M1 24.0488H5.0625M16 10.878L10.375 20.7561M16 10.878L21.625 20.7561M10.375 20.7561H21.625M10.375 20.7561H6.9375M21.625 20.7561L23.5 24.0488H5.0625M6.9375 20.7561L5.0625 24.0488" stroke="#F6F7FF"/>
              </svg>
              <p className="login-modal__logo-text">
                ЛИГА Банк
                <span className="login-modal__logo-small-text">интернет-банк</span>
              </p>
            </div>
            <button
              className="login-modal__close-button"
              onClick={closeBtnClickHandler}
              tabIndex="5"
              ref={closeBtnRef}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L17 17M17 1L1 17" stroke="#1F1E25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <form
            className="login-modal__form"
            action="/"
            method="POST"
            onSubmit={submitFormHandler}
          >
            <ul className="login-modal__list">
              <li className="login-modal__item">
                <label className="login-modal__label" htmlFor="login">Логин</label>
                <input
                  className="login-modal__input"
                  type="text"
                  name="login"
                  id="login"
                  autoFocus
                  ref={loginRef}
                />
              </li>
              <li className="login-modal__item login-modal__item--password">
                <label className="login-modal__label" htmlFor="password">Пароль</label>
                <input
                  className="login-modal__input"
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  id='password'
                  tabIndex="2"
                  ref={passwordRef}
                />
                <button
                  className="login-modal__show"
                  type="button"
                  onClick={showPasswordBtnClickHandler}
                  tabIndex="3"
                  ref={hideRef}
                >
                  <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.29878 12L6.33638 11.4893L7.13618 8.59185C5.93899 8.16352 4.82634 7.5393 3.84654 6.7463L1.65854 8.86987L0.220528 7.47486L2.40955 5.35228C1.17386 3.91662 0.343585 2.19431 0 0.353927L2 0C2.77134 4.14262 6.50711 7.28557 11 7.28557C15.4919 7.28557 19.2287 4.14262 20 0L22 0.352941C21.6569 2.19358 20.827 3.91624 19.5915 5.35228L21.7795 7.47486L20.3415 8.86987L18.1535 6.7463C17.1737 7.5393 16.061 8.16352 14.8638 8.59185L15.6636 11.4903L13.7012 12L12.9004 9.10155C11.6426 9.31063 10.3574 9.31063 9.0996 9.10155L8.29878 12Z" fill="#1F1E25"/>
                  </svg>
                </button>
              </li>
            </ul>
            <a className="login-modal__link" href="/">Забыли пароль?</a>
            <button
              className="login-modal__btn"
              tabIndex="4"
              ref={btnRef}
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

LoginModal.propTypes = {
  setLoginModalStatus: func.isRequired,
};

export default LoginModal;
