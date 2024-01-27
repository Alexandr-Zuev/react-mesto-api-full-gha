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
      headers: {
        authorization: this.headers.authorization
      }
    }).then(this._getResponseData);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.headers.authorization
      }
    }).then(this._getResponseData);
  }

  editProfile(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(this._getResponseData);
  }

  addNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(this._getResponseData);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.headers.authorization
      }
    }).then(this._getResponseData);
  }

  updateAvatar(avatarUrl) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ avatar: avatarUrl })
    }).then(this._getResponseData);
  }

  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';

    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: method,
      headers: {
        authorization: this.headers.authorization
      }
    }).then(this._getResponseData);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72',
  headers: {
    authorization: '04403901-3989-4ba9-8f9f-578d2bb85149',
    'Content-Type': 'application/json'
  }
});

export { Api, api };
