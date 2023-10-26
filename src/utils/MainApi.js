class MainApi {
    constructor({ mainUrl, headers }) {
      this._mainUrl = mainUrl;
      this._headers = headers;
    }
  
    //Получение данных о пользователе
    async getUserInfo() {
      const res = await fetch(`${this._mainUrl}`, {
        headers: this._headers,
      });
      return this._checkStatus(res);
    }
  
    //Редактирование данных пользователя
    async editProfile(data) {
      const res = await fetch(`${this._mainUrl}/profile`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          email: data.email,
        }),
      });
      return this._checkStatus(res);
    }
  
    //Проверка ответа от сервера
    _checkStatus(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
  
  export const mainApi = new MainApi({
    mainUrl: "https://api.movies.weekend.nomoredomainsrocks.ru",
    headers: {
      "Content-Type": "application/json",
    },
  });