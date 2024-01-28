import { BASE_URL } from '../config.js';

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      credentials: "include"
    }).then(this._getResponseData);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      credentials: "include",
    }).then(this._getResponseData);
  }

  editProfile(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      credentials: "include",
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(this._getResponseData);
  }

  addNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      credentials: "include",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(this._getResponseData);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      credentials: "include",
      method: 'DELETE',
    }).then(this._getResponseData);
  }

  updateAvatar(avatarUrl) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      credentials: "include",
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ avatar: avatarUrl })
    }).then(this._getResponseData);
  }

  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      credentials: "include",
      method: method,
    }).then(this._getResponseData);
  }
}

const api = new Api({
  baseUrl: BASE_URL,
});

export { Api, api };
