import React from 'react';

function PopupWithForm({ title, name, isOpen, onClose, children, onSubmit, nameSubBtn }) {
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className={`popup ${isOpen ? 'popup_is-opened' : ''}`}>
      <div className="popup__content">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <form id={name} className="popup__form" name={name} onSubmit={handleSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" className="popup__button">
            {nameSubBtn}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
