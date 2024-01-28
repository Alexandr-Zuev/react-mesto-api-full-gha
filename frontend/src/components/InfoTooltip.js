import React from 'react';
import successImage from '../images/success.svg';
import failImage from '../images/fail.svg';

function InfoTooltip({ onClose, isOpen, state }) {
  return (
    <div className={`popup ${isOpen ? 'popup_is-opened' : ''}`}>
      <div className="popup__content">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <div className="infotooltip">
          <img
            className="infotooltip__img"
            src={state === 'success' ? successImage : failImage}
            alt={state === 'success' ? 'Успешная регистрация' : 'Что-то пошло не так'}
          />
          <p className="infotooltip__text">
            {state === 'success'
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
