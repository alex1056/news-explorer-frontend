export default class MainApi {
  constructor(urlMainApi = 'https://api.diploma-2020.ru') {
    this._obj = null;
    this._userId = null;
    this._urlMainApi = urlMainApi;
  }

  logout() {
    return fetch(`${this._urlMainApi}/logout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return Promise.resolve(res.status);
        }
        return Promise.reject(Error('Произошла ошибка'));
      })
      .catch((err) => Promise.reject(Error(err.message)));
  }

  login(credentials = { email: 'dlsk@dskf10.yu', password: '123' }) {
    return fetch(`${this._urlMainApi}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return Promise.resolve(res.status);
        }
        return Promise.reject(Error('Неправильные логин или пароль'));
      })
      .catch((err) => Promise.reject(Error(err.message)));
  }

  signup(credentials = { email: 'dlsk@dskf15.yu', password: '123', name: 'qweqwe10' }) {
    return fetch(`${this._urlMainApi}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        name: credentials.name,
      }),
    })
      .then((res) => {
        if (res.status === 201) {
          return Promise.resolve(res.status);
        }
        if (res.status === 409) {
          return Promise.reject(Error('Такой пользователь уже есть'));
        }
        return Promise.reject(Error('Произошла ошибка'));
      })
      .catch((err) => Promise.reject(Error(err.message)));
  }

  getUserData() {
    return fetch(`${this._urlMainApi}/users/me`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => Promise.resolve(data))
      .catch((err) => Promise.reject(Error(err.message)));
  }

  createArticle(articleObj) {
    return fetch(`${this._urlMainApi}/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: articleObj.keyword,
        title: articleObj.title,
        link: articleObj.link,
        text: articleObj.text,
        image: articleObj.image,
        date: articleObj.date,
        source: articleObj.source,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(res.status);
      })
      .then((data) => Promise.resolve(data))
      .catch((err) => Promise.reject(new Error(err.message)));
  }

  getArticles() {
    return fetch(`${this._urlMainApi}/articles`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => Promise.resolve(data))
      .catch((err) => Promise.reject(Error(err.message)));
  }

  deleteArticle(_id) {
    return fetch(`${this._urlMainApi}/articles/${_id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => Promise.resolve(data))
      .catch((err) => Promise.reject(Error(err.message)));
  }
}
