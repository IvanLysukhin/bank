import React, {useRef} from 'react';
import {func} from 'prop-types';
import {useModal} from '../../custom-hooks/useModal';

function GratitudeModal({setGratitudeModalStatus}) {
  const modal= useRef();

  const closeBtnClickHandler = () => {
    setGratitudeModalStatus(false);
  };

  const escKeydownHandler = (evt) => {
    if (evt.keyCode === 27) {
      setGratitudeModalStatus(false);
    }
  };

  const overlayClickHandler = ({target}) => {
    if (target === modal.current) {
      setGratitudeModalStatus(false);
    }
  };

  useModal(escKeydownHandler);

  return (
    <div
      className="gratitude-modal"
      onClick={overlayClickHandler}
      ref={modal}
    >
      <div className="gratitude-modal__container">
        <p className="gratitude-modal__big-text">Спасибо за обращение в наш банк.</p>
        <p className="gratitude-modal__small-text">Наш менеджер скоро свяжется с вами по указанному номеру телефона</p>
        <button
          className="gratitude-modal__close-button"
          aria-label="закрыть"
          onClick={closeBtnClickHandler}
          tabIndex="1"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L17 17M17 1L1 17" stroke="#1F1E25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

GratitudeModal.propTypes = {
  setGratitudeModalStatus: func.isRequired,
};

export default GratitudeModal;
