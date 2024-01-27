import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen, currentUser]);

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-form"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      nameSubBtn="Сохранить"
    >
      <input
        id="name-input-title"
        type="text"
        className="popup__input"
        name="name-input-title"
        value={name || ''}
        onChange={handleNameChange}
        required
      />
      <span id="name-input-title-error" className="popup__error"></span>
      <input
        id="name-input-subtitle"
        type="text"
        className="popup__input"
        name="name-input-subtitle"
        value={description || ''}
        onChange={handleDescriptionChange}
        required
      />
      <span id="name-input-subtitle-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
