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
        headers: this._headers,
        credentials: 'include',
      })
        .then(res => this.getResponseData(res))
    }
  
    getInfoAboutMeApi() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
        credentials: 'include',
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
        }),
        credentials: 'include',
      })
        .then(res => this.getResponseData(res))
    }
  
    getAllInitialData() {
      return Promise.all([this.getInfoAboutMeApi(), this.getInitialCardsFromApi()])
    }
  
    editProfileApi({ name, about }) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name,
          about
        }),
        credentials: 'include',
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
        }),
        credentials: 'include',
      })
        .then(res => this.getResponseData(res))
    }
  
    removeCardApi(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
        credentials: 'include',
      })
        .then(res => this.getResponseData(res))
    }
  
    changeLikeCardStatus(cardId, isLiked) {
      const requestMethod = isLiked ? 'PUT' : 'DELETE';
      return fetch(`${this._baseUrl}/cards/${cardId}/likes/`, {
        method: requestMethod,
        headers: this._headers,
        credentials: 'include',
      })
        .then(res => this.getResponseData(res))
      }
  
    addAvatarToApi(avatarLink) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatarLink,
        }),
        credentials: 'include',
      })
        .then(res => this.getResponseData(res))
    }
  }

const api = new Api({
    baseUrl: 'https://api.yellex.nomoredomains.club',
    headers: {
      'Content-Type': 'application/json'
    }
  });

export default api;