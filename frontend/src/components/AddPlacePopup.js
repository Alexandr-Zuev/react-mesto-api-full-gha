import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [newCardData, setNewCardData] = useState({
    name: '',
    link: ''
  });

  const handleChange = e => {
    setNewCardData({
      ...newCardData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onAddPlace(newCardData);
  };

  useEffect(() => {
    if (isOpen) {
      setNewCardData({
        name: '',
        link: ''
      });
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-form"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      nameSubBtn="Создать"
    >
      <input
        type="text"
        id="name-input-card"
        className="popup__input"
        name="name"
        placeholder="Название"
        required
        value={newCardData.name}
        onChange={handleChange}
      />
      <span id="name-input-card-error" className="popup__error"></span>
      <input
        type="url"
        id="name-input-link"
        className="popup__input"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={newCardData.link}
        onChange={handleChange}
      />
      <span id="name-input-link-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
