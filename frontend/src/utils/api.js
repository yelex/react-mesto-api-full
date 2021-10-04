class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    getResponseData(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  
    getInitialCardsFromApi() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
        .then(res => this.getResponseData(res))
    }
  
    getInfoAboutMeApi() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      })
        .then(res => this.getResponseData(res))
    }
  
    setInfoAboutMe({ name, about }) {
  
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
        .then(res => this.getResponseData(res))
    }
  
    getAllInitialData() {
      return Promise.all([this.getInitialCardsFromApi(), this.getInfoAboutMeApi()])
    }
  
    editProfileApi({ name, about }) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name,
          about
        })
      })
      .then(res => this.getResponseData(res))
    }
  
    addNewCardApi({ title, link }) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: title,
          link: link
        })
      })
        .then(res => this.getResponseData(res))
    }
  
    removeCardApi(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(res => this.getResponseData(res))
    }
  
    changeLikeCardStatus(cardId, isLiked) {
      const requestMethod = isLiked ? 'PUT' : 'DELETE';
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: requestMethod,
        headers: this._headers
      })
        .then(res => this.getResponseData(res))
      }
  
    addAvatarToApi(avatarLink) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatarLink
        })
      })
        .then(res => this.getResponseData(res))
    }
  }

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
    headers: {
      authorization: '58d9bd2a-6b34-4d93-8ca3-98d968550c4e',
      'Content-Type': 'application/json'
    }
  });

export default api;