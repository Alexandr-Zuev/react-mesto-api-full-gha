import React, { useState, useEffect } from 'react';
import { api } from '../utils/api.js';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);

  const onEditProfile = () => {
    setIsEditProfilePopupOpen(true);
  };

  const onEditAvatar = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const onAddPlace = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = card => {
    setSelectedCard(card);
    setImagePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  useEffect(() => {
    api
      .getInitialCards()
      .then(cards => {
        setCards(cards);
      })
      .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
      });
  }, []);

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api
      .getUserInfo()
      .then(userInfo => {
        setCurrentUser(userInfo);
      })
      .catch(error => {
        console.error('Ошибка при получении информации о пользователе:', error);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(error => {
        console.error('Произошла ошибка при обновлении состояния карточек:', error);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(currentCards => currentCards.filter(c => c._id !== card._id));
      })
      .catch(error => {
        console.error('Ошибка при удалении карточки:', error);
      });
  }

  const handleUpdateUser = userInfo => {
    api
      .editProfile(userInfo)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(error => {
        console.error('Ошибка при обновлении профиля:', error);
      });
  };

  const handleUpdateAvatar = data => {
    api
      .updateAvatar(data.avatar)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(error => {
        console.error('Ошибка при обновлении аватара:', error);
      });
  };

  const handleAddPlaceSubmit = newCardData => {
    api
      .addNewCard(newCardData)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(error => {
        console.error('Ошибка при добавлении новой карточки:', error);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          handleEditProfileClick={onEditProfile}
          handleAddPlaceClick={onAddPlace}
          handleEditAvatarClick={onEditAvatar}
          cards={cards}
          handleCardClick={handleCardClick}
          handleLikeClick={handleCardLike}
          handleDeleteClick={handleCardDelete}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups} />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
