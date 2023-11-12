import {MOVIES_SITE} from "./constants"

class MoviesApi {
  constructor({ mainUrl, headers }) {
    this._mainUrl = mainUrl;
    this._headers = headers;
  }

  //Получение фильмов с сервера
  getAllMoviesCards() {
    return fetch(`${this._mainUrl}`, {
      headers: this.headers,
    }).then((res) => this._checkStatus(res));
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
  mainUrl: MOVIES_SITE,
  headers: {
    "Content-Type": "application/json",
  },
});
