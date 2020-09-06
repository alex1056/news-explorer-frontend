export default class NewsCard {
  constructor(template) {
    this._template = template;
    this._date = '1 января 1900';
    this._isLoggedIn = false;
    this._keyWord = 'фраза не задана';
    this._mainApi = null;
    this._savedArticlesArr = null;
    this._sessionHandler = null;
    this._pageType = null;
  }

  setPageType(pageType) {
    this._pageType = pageType;
  }

  setSessionHandler(sessionHandler) {
    this._sessionHandler = sessionHandler;
  }

  isLoggedIn() {
    this._isLoggedIn = this._sessionHandler.isLoggedInFunc();
    return this._sessionHandler.isLoggedInFunc();
  }

  setSavedArticles() {
    this.isLoggedIn();
    this._savedArticlesArr = [];
    if (!this.isLoggedIn()) {
      return Promise.resolve(this._savedArticlesArr);
    }
    return this._mainApi.getArticles()
      .then((res) => {
        this._savedArticlesArr = res.data;
        return Promise.resolve(res.data);
      })
      .catch((err) => Promise.reject(new Error(err.message)));
  }

  renderIcon(iconBtn, iconState) {
    if (iconState === 'remove') {
      iconBtn.classList.add('card__article-btn_type_remove');
      return;
    }
    if (iconState === 'saved' || iconState === 'removed') {
      iconBtn.classList.toggle('card__article-btn_type_saved');
    }
  }

  showNotification(event) {
    const cardNotificationContainer = event.target.closest('.card__save-article-container');
    const cardNotification = cardNotificationContainer.querySelector('.card__notification');
    cardNotification.classList.toggle('card__notification_enabled');
    if (this._pageType === 'articles') {
      cardNotification.querySelector('.card__notification-text').textContent = 'Убрать из сохраненных';
    }
  }

  _iconBtnHandlerClick(event) {
    event.preventDefault();
  }

  _iconBtnHandlerRemove(event) {
    event.preventDefault();
    if (this._pageType === 'articles') {
      const cardNode = event.target.closest('#articlecontainer');
      const data = cardNode.dataset;
      console.log(data.id);
      this._mainApi.deleteArticle(data.id)
        .then(() => {
          this.removeCard(cardNode);
        })
        .catch((err) => Promise.reject(Error(err.message)));
    }
  }

  _iconBtnHandler(event) {
    event.preventDefault();
    if (this._pageType === 'articles') {
      this.showNotification(event);
      return;
    }

    if (!this.isLoggedIn()) {
      this.showNotification(event);
    } else {
      const arrCards = this.getArrLocalStorage('newsData');
      const cardUrl = event.target.closest('.card__link');
      const newArr = arrCards.filter((item) => item.link === cardUrl.href);
      const artToSave = newArr[0];
      this.checkArticle(artToSave)
        .then((articleSaved) => {
          if (!articleSaved) { // если он НЕ сохранен - сохраняем
            return this._mainApi.createArticle(artToSave)
              .then((res) => {
                const iconBtn = event.target;
                this.renderIcon(iconBtn, 'saved'); // вызываем тоггл модификатора
                return res;
              })
              .catch((err) => new Error(err.message));
          }
          // удаляем
          this._mainApi.deleteArticle(articleSaved._id)
            .then((res) => res)
            .catch((err) => Promise.reject(Error(err.message)));
          const iconBtn = event.target;
          this.renderIcon(iconBtn, 'removed');
        })
        .catch((err) => Promise.reject(new Error(err.message)));
    }
  }

  checkArticle(artToSave) {
    let isArticleSaved = -1;
    return this._mainApi.getArticles()
      .then((res) => {
        if (res.data.length > 0) {
          isArticleSaved = res.data.findIndex((item) => item.link === artToSave.link);
        }
        if (!(isArticleSaved < 0)) {
          return Promise.resolve(res.data[isArticleSaved]);
        }
        return Promise.resolve(null);
      })
      .catch((err) => Promise.reject(new Error(err.message)));
  }

  checkArticleOnLoad(artToSave) {
    let isArticleSaved = -1;
    if (this._savedArticlesArr.length > 0) {
      isArticleSaved = this._savedArticlesArr.findIndex((item) => item.link === artToSave.link);
    }
    return !(isArticleSaved < 0);
  }

  _setEventListeners(iconBtn) {
    if (!this.isLoggedIn() && this._pageType !== 'articles') {
      iconBtn.addEventListener('mouseover', this._iconBtnHandler.bind(this));
      iconBtn.addEventListener('mouseout', this._iconBtnHandler.bind(this));
      iconBtn.addEventListener('click', this._iconBtnHandlerClick.bind(this));
    } else if (this.isLoggedIn() && this._pageType !== 'articles') {
      iconBtn.addEventListener('click', this._iconBtnHandler.bind(this));
    } else if (this.isLoggedIn() && this._pageType === 'articles') {
      iconBtn.addEventListener('mouseover', this._iconBtnHandler.bind(this));
      iconBtn.addEventListener('mouseout', this._iconBtnHandler.bind(this));
      iconBtn.addEventListener('click', this._iconBtnHandlerRemove.bind(this));
    }
  }

  _removeEventListeners(iconBtn) {
    iconBtn.removeEventListener('mouseover', this._iconBtnHandler.bind(this));
    iconBtn.removeEventListener('mouseout', this._iconBtnHandler.bind(this));
    iconBtn.removeEventListener('click', this._iconBtnHandler.bind(this));
    iconBtn.removeEventListener('click', this._iconBtnHandlerClick.bind(this));
    iconBtn.addEventListener('click', this._iconBtnHandlerRemove.bind(this));
  }

  removeCard(cardToRemove) {
    const iconBtn = cardToRemove.querySelector('.card__article-btn');
    this._removeEventListeners(iconBtn);
    cardToRemove.parentNode.removeChild(cardToRemove);
  }

  _getTemplate(data) {
    const newsCardTemplates = {
      indexPage: `<article id="articlecontainer" data-id="${data._id || 'no-id'}">
      <a href="${data.link}" target="_blank" class="card card__link" >
      <div class="card__tag">
        <p class="card__notification-text card__notification-text_tag">
        ${data.keyword}
        </p>
      </div>
      <div class="card__save-article-container">
      <div class="card__notification">
          <p class="card__notification-text">
            Войдите, чтобы сохранять статьи
          </p>
        </div>
        <div class="card__article-btn"></div>
      </div>
      <div class="card__img-container">
      <img
        src=${data.image}
        alt="Природа 1"
        class="card__img"
      />
      </div>
      <div class="card__text-container">
        <p class="card__date">${this.dateParsToWords(data.date)}</p>
        <h3 class="content-subtitle card__content-subtitle">
        ${this.removeTags(data.title)}
        </h3>
        <p class="text card__text">
        ${this.removeTags(data.text)}
        </p>
        <p class="card__source">${data.source}</p>
      </div>
      </a>
    </article>`,
    };
    return newsCardTemplates[this._template];
  }

  create(obj = null) {
    const template = document.createElement('template');
    template.insertAdjacentHTML('afterbegin', this._getTemplate(obj));
    const iconBtn = template.querySelector('.card__article-btn');
    const cardTag = template.querySelector('.card__tag');

    this._setEventListeners(iconBtn);
    // потом проверяем сохранен ли он уже у пользователя'

    let articleSaved = false;
    if (this.isLoggedIn()) {
      if (this._pageType !== 'articles') { articleSaved = this.checkArticleOnLoad(obj); }
    }
    if (articleSaved) {
      this.renderIcon(iconBtn, 'saved'); // вызываем тоггл модификатора
    }
    if (this._pageType === 'articles') {
      this.renderIcon(iconBtn, 'remove');
      cardTag.classList.add('card__tag_enabled');
    }

    return template.firstElementChild;
  }

  createCardObject(dataObjFromNewsApi) {
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
        keyword: this._keyWord,
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

  setKeyWord(keyWord = 'поисковая фраза не задана') {
    this._keyWord = keyWord;
  }

  removeTags(str) {
    let str1 = str;
    if ((str1 === null) || (str1 === '')) {
      return false;
    }
    str1 = str1.toString();
    return str1.replace(/(<([^>]+)>)/ig, '');
  }

  dateParsToWords(dateString) {
    const ms = Date.parse(dateString);
    this._date = this.dateToWords(ms);
    return this._date;
  }

  getArrLocalStorage(itemName = 'newsData') {
    const newsData = JSON.parse(localStorage.getItem(itemName));
    return newsData;
  }

  setMainApi(mainApiObj) {
    this._mainApi = mainApiObj;
  }

  dateToWords(dateMs) {
    let dateStr = '';
    const dateObj = new Date(dateMs);

    if (dateObj !== 'Invalid Date') {
      const monthA = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');
      const month = monthA[dateObj.getMonth()];
      dateStr = `${dateObj.getDate()} ${month}, ${dateObj.getFullYear()}`;
    }
    return dateStr || '1 января 1900';
  }
}
