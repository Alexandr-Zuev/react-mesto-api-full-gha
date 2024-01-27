import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();
  const handleSubmit = e => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  };
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="new-avatar-form"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      nameSubBtn="Сохранить"
    >
      <input
        id="new-avatar-link"
        type="url"
        className="popup__input"
        name="new-avatar-link"
        placeholder="Ссылка на аватар"
        ref={avatarRef}
        required
      />
      <span id="new-avatar-link-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
