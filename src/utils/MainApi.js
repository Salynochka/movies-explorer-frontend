import {mainSite} from "./constants"

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

  getToken = (token) => {
    return fetch(`${this._mainUrl}/users/me`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((res) => this._checkStatus(res))
  }

  //Регистрация пользователя
  register = (name, email, password) =>{
    return fetch(`${this._mainUrl}/signup`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then((res) => this._checkStatus(res));
  }

  //Вход пользователя
  login = (email, password) => {
    return fetch(`${this._mainUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => this._checkStatus(res))
  }

  // Выход с сайта
  logout() {
    return fetch(`${this._mainUrl}/signout`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
    });
  }

  // Получение данных о пользователе
  getUserInfo() {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._mainUrl}/users/me`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${jwt}`,
      },
      credentials: "include",
    }).then((res) => this._checkStatus(res));
  }

  //Редактирование данных пользователя
  editUserInfo(data) {
    return fetch(`${this._mainUrl}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        email: data.email
      }),
    }).then((res) => this._checkStatus(res));
  }

  //Получение сохраненных фильмов пользователя
  getUserSavedMovies() {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._mainUrl}/movies`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${jwt}`,
      },
      credentials: "include",
    }).then((res) => this._checkStatus(res));
  }

  //Добавление фильма на сервер
  saveMovie(movie) {
    return fetch(`${this._mainUrl}/movies`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      credentials: "include",
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${this._mainUrl}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `${this._mainUrl}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
      }),
    }).then((res) => this._checkStatus(res));
  }

  //Удаление из сохраненных фильмов
  unsaveMovie(movieId) {
    return fetch(`${this._mainUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      credentials: "include",
    }).then((res) => this._checkStatus(res));
  }
}

export const mainApi = new MainApi({
  mainUrl: mainSite,
  headers: {
    'Content-Type': 'application/json',
  },
});
