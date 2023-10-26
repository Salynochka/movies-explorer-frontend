class MoviesApi {
    constructor({ mainUrl, headers }) {
      this._mainUrl = mainUrl;
      this._headers = headers;
    }
  
    //Получение карточек с сервера
    async getCards() {
      const res = await fetch(`${this._mainUrl}`, {
        headers: this._headers,
      });
      return this._checkStatus(res);
    }
  
    //Добавление в сохраненные фильмы
    async saveCard(cardId) {
      const res = await fetch(`${this._mainUrl}/cards/${cardId}`, {
        method: "PUT",
        headers: this._headers,
      });
      return this._checkStatus(res);
    }
  
    //Удаление из сохраненных фильмов
    async unsaveCard(cardId) {
      const res = await fetch(`${this._mainUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      });
      return this._checkStatus(res);
    }
  
    changeCardStatus(cardId, isSaved) {
      if (!isSaved) {
        return moviesApi.saveCard(cardId)
      } else { 
        return moviesApi.unsaveCard(cardId)
      }
    }
  
    //Проверка ответа от сервера
    _checkStatus(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
  
  export const moviesApi = new MoviesApi({
    mainUrl: "https://api.nomoreparties.co/beatfilm-movies",
    headers: {
      "Content-Type": "application/json",
    },
  });