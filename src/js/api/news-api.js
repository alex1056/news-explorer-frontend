/* eslint-disable class-methods-use-this */
export default class NewsApi {
  constructor({
    url, apiKey, language, pageSize,
  }) {
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
        const arrComputed = this.createArrayFromComputedData(data.articles, searchPhrase);
        const dataComputed = data;
        dataComputed.articles = arrComputed;
        return Promise.resolve(dataComputed);
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

  createArrayFromComputedData(arr, searchPhrase) {
    return arr.map((dataObjFromNewsApi) => this.createCardObject(dataObjFromNewsApi, searchPhrase));
  }

  createCardObject(dataObjFromNewsApi, searchPhrase) {
    try {
      const {
        description,
        publishedAt,
        source,
        title,
        url,
        urlToImage,
      } = dataObjFromNewsApi;

      const dataObj = {
        keyword: searchPhrase,
        title,
        link: url,
        text: description,
        image: urlToImage,
        date: publishedAt,
        source: source.name,
      };
      return dataObj;
    } catch (error) {
      throw new Error('Пришли невалидные данные от NewsApi');
    }
  }
}
