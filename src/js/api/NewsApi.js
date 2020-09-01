export default class NewsApi {
  constructor({ url, apiKey, language, pageSize }) {
    this._Url = url;
    this._ApiKey = apiKey;
    this._language = language;
    this._pageSize = pageSize;
  }

  getNews(searchPhrase) {
    return fetch(`${this._Url}q=${searchPhrase}&from=2020-08-25&to=2020-09-01&language=${this._language}&pageSize=${this._pageSize}&apiKey=${this._ApiKey}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // if (res.ok) {
        //   // console.log(res);
        //   return Promise.resolve(res.status);
        // }
        // return Promise.reject(Error('Неправильные логин или пароль'));
      })
      .catch((err) => Promise.reject(Error(err.message)));
  }
}
