class MainApi {
  constructor({ mainUrl, headers }) {
    this._mainUrl = mainUrl;
    this._headers = headers;
  }

  //Проверка ответа от сервера
  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Получение токена
  _getToken() {
    return `Bearer ${localStorage.getItem("jwt")}`;
  }

  //Регистрация пользователя
  async register(password, email, name) {
    return await fetch(`${this._mainUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        password: password,
        email: email,
        name: name,
      }),
    }).then((res) => this._checkStatus(res));
  }

  //Вход пользователя
  async login(password, email) {
    return await fetch(`${this._mainUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => this._checkStatus(res));
  }

  //Получение данных о пользователе
  async getUserInfo() {
    return await fetch(`${this._mainUrl}/users/me`, {
      headers: {
        Authorization: this._getToken(),
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => this._checkStatus(res));
  }

  //Редактирование данных пользователя
  async editUserInfo(data) {
    return await fetch(`${this._mainUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: this._getToken(),
      },
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then((res) => this._checkStatus(res));
  }

  //Получение фильмов пользователя
  async getUserMovies() {
    return await fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this._getToken(),
      },
      credentials: "include",
    }).then((res) => this._checkStatus(res));
  }

  //Добавление фильма на сервер
  async saveMovie(data) {
    return await fetch(`${this._mainUrl}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this._getToken(),
      },
      credentials: "include",
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `https://api.nomoreparties.co/${data.image.url}`,
        trailerLink: data.trailerLink,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        thumbnail: `https://api.nomoreparties.co/${data.thumbnail.url}`,
        movieId: data.id,
      }),
    }).then((res) => this._checkStatus(res));
  }

  //Удаление из сохраненных фильмов
  async unsaveMovie(movieId) {
    return await fetch(`${this._mainUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._checkStatus(res));
  }

}

export const mainApi = new MainApi({
  mainUrl: "https://api.movies.weekend.nomoredomainsrocks.ru",
  headers: {
    "Content-Type": "application/json",
  },
});
