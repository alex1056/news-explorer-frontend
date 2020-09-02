/* eslint-disable class-methods-use-this */
function _createNode(_template) {
  const template = document.createElement('template');
  // template.innerHTML = _template;
  template.insertAdjacentHTML('afterbegin', _template);
  // return template.content.firstElementChild;
  return template.firstElementChild;
}

function dateToWords(dateMs) {
  let dateStr = '';
  const dateObj = new Date(dateMs);

  if (dateObj !== 'Invalid Date') {
    const monthA = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');
    const month = monthA[dateObj.getMonth()];
    dateStr = `${dateObj.getDate()} ${month}, ${dateObj.getFullYear()}`;
  }
  return dateStr || '1 января 1900';
}

export default class NewsCard {
  constructor(template) {
    this._template = template;
    this._date = '1 января 1900';
    // this._card = _createNode(this._getTemplate());
  }
  renderIcon() {

  }

  dateParsToWords(dateString) {
    const ms = Date.parse(dateString);
    this._date = dateToWords(ms);
    return this._date;
  }

  _getTemplate(data) {
    const newsCardTemplates = {
      indexPage: `<article>
      <a href="${data.url}" target="_blank" class="card card__link" >
      <div class="card__save-article-container">
        <div class="card__notification card__notification_enabled">
          <p class="card__notification-text">
            Войдите, чтобы сохранять статьи
          </p>
        </div>
        <div class="card__save-article-btn"></div>
      </div>
      <div class="card__img-container">
      <img
        src=${data.urlToImage}
        alt="Природа 1"
        class="card__img"
      />
      </div>
      <div class="card__text-container">
        <p class="card__date">${this.dateParsToWords(data.publishedAt)}</p>
        <h3 class="content-subtitle card__content-subtitle">
        ${this.removeTags(data.title)}
        </h3>
        <p class="text card__text">
        ${this.removeTags(data.description)}
        </p>
        <p class="card__source">${data.source.name}</p>
      </div>
      </a>
    </article>`,
    };
    return newsCardTemplates[this._template];
  }

  create(obj = null) {
    const template = document.createElement('template');
    template.insertAdjacentHTML('afterbegin', this._getTemplate(obj));
    // const deleteButton = template.querySelector('.place-card__delete-icon');
    // console.log(template);
    // if (obj.owner._id === this._api.getUserId()) {
    //   deleteButton.classList.add('place-card__delete-icon_visible');
    // }
    // const likeButton = template.querySelector('.place-card__like-icon');
    // const placeCardImage = template.querySelector('.place-card__image');
    // if (this._isLiked(this._api.getUserId(), obj)) {
    //   likeButton.classList.add('place-card__like-icon_liked');
    //   //console.log('Добавили класс place-card__like-icon_liked');
    // }
    // this._setEventListeners(deleteButton, likeButton, placeCardImage);
    return template.firstElementChild;
  }

  removeTags(str) {
    if ((str === null) || (str === '')) {
      return false;
    }
    str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, '');
  }
}