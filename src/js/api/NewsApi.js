/* eslint-disable class-methods-use-this */
export default class NewsApi {
  constructor({ url, apiKey, language, pageSize }) {
    this._Url = url;
    this._ApiKey = apiKey;
    this._language = language;
    this._pageSize = pageSize;
  }

  getNews(searchPhrase) {
    const dates = this.fromToDates();
    return fetch(`${this._Url}q=${searchPhrase}&from=${dates.from}&to=${dates.to}&language=${this._language}&pageSize=${this._pageSize}&apiKey=${this._ApiKey}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // if (res.ok) {
        //   // console.log(res);
        return Promise.resolve(data);

        // return Promise.reject(Error('Неправильные логин или пароль'));
      })
      .catch(() => Promise.reject(Error('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')));
  }

  fromToDates() {
    let result;
    let dateFrom = '';
    let dateTo = '';
    result = Date.now();
    result = new Date(result);

    dateTo += result.getFullYear();
    dateTo += result.getMonth() < 9 ? `-0${result.getMonth() + 1}` : `-${result.getMonth() + 1}`;
    dateTo += result.getDate() < 10 ? `-0${result.getDate()}` : `-${result.getDate()}`;

    result = Date.now() - (60 * 60 * 24 * 1000 * 7);
    result = new Date(result);
    dateFrom = '';
    dateFrom += result.getFullYear();
    dateFrom += result.getMonth() < 9 ? `-0${result.getMonth() + 1}` : `-${result.getMonth() + 1}`;
    dateFrom += result.getDate() < 10 ? `-0${result.getDate()}` : `-${result.getDate()}`;

    return { from: dateFrom, to: dateTo };
  }
}
