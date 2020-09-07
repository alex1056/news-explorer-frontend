export default class NewsCardList {
  constructor(cardsContainerClassName) {
    this._newsCard = null;
    this._cardsListNodes = [];
    this._cardsAmout = 0;
    this._cardsShown = 0; // сколько уже отрисовали
    this._cardsContainer = document.querySelector(`.${cardsContainerClassName}`);
    this._cardsNumberToShow = 0;
    this._pageType = null;
  }

  setOriginArray(originArray) {
    this._originArray = originArray;
  }

  setNewsCard(newsCard) {
    this._newsCard = newsCard;
  }

  renderResults({ cardsNumberToShow, pageType }) {
    this._cardsNumberToShow = cardsNumberToShow;
    this._pageType = pageType;
    // принимает массив экземпляров карточек и отрисовывает их;
    const currArr = this.currentArrElements({ cardsNumberToShow, pageType });
    let currCardsNumber = 0;
    currArr.forEach((element) => {
      this._cardsContainer.appendChild(element);
      currCardsNumber += 1;
    });
    this._cardsShown += currCardsNumber;
  }

  renderResultsBlock(className, classNameModificator, isActive = true) {
    try {
      if (this._pageType !== 'articles') {
        const showMoreBtn = document.querySelector('.result__btn');
        showMoreBtn.classList.remove('result__btn_disabled');
      }
    } catch (error) {
      console.log('Нет блока Кнопка показать ЕЩЕ');
    }

    const resultsBlock = document.querySelector(`.${className}`);
    if (resultsBlock) {
      if (isActive) {
        resultsBlock.classList.add(classNameModificator);
      } else resultsBlock.classList.remove(classNameModificator);
    }
  }

  renderLoader(isActive) {
    const preloader = document.querySelector('.preloader-block');
    if (isActive) {
      preloader.classList.add('preloader-block_enabled');
    } else preloader.classList.remove('preloader-block_enabled');
  }

  renderError(isActive, errObj = null) {
    // принимает объект ошибки и показывает ошибку в интерфейсе;
    const notFoundBlock = document.querySelector('.not-found');
    if (isActive) {
      notFoundBlock.classList.add('not-found_enabled');
    } else notFoundBlock.classList.remove('not-found_enabled');

    const titleNode = notFoundBlock.querySelector('.not-found__title');
    titleNode.textContent = 'Ничего не найдено';
    const textNode = notFoundBlock.querySelector('.not-found__text');
    textNode.textContent = 'К сожалению по вашему запросу ничего не найдено';
    if (errObj) {
      titleNode.textContent = 'При поиске произошла ошибка';
      textNode.textContent = errObj.message;
    }
  }

  showMore() {
    // отвечает за функциональность кнопки «Показать ещё»;
    const cardsNumberToShow = this._cardsNumberToShow;
    const pageType = this._pageType;
    this.renderResults({ cardsNumberToShow, pageType });
    this.renderShowMoreButton();
    // if (this._pageType !== 'articles') {
    //   if (this._cardsAmout === this._cardsShown) {
    //     const showMoreBtn = document.querySelector('.result__btn');
    //     showMoreBtn.classList.add('result__btn_disabled');
    //   }
    // }
  }

  renderShowMoreButton() {
    if (this._pageType !== 'articles') {
      if (this._cardsAmout === this._cardsShown) {
        const showMoreBtn = document.querySelector('.result__btn');
        showMoreBtn.classList.add('result__btn_disabled');
      }
    }
  }

  addCard(cardNode) {
    this._cardsAmout = this._cardsListNodes.push(cardNode); // возвр. размер массива
    // принимает экземпляр карточки и добавляет её в список.
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(() => {
      resolve();
    }, ms));
  }

  init(resultBlockName = 'result', resultBlockNameModif = 'result_enabled', pageType = 'index') {
    this._cardsListNodes = [];
    this._cardsAmout = 0;
    this._cardsShown = 0;
    this._pageType = pageType;
    this.removeCards();
    this.renderResultsBlock(resultBlockName, resultBlockNameModif, false);
    if (this._pageType !== 'articles') {
      try {
        this.renderError(false);
      } catch (err) {
        console.log('Блок вывода ошибки недоступен');
      }
    }
  }

  currentArrElements({ cardsNumberToShow, pageType }) {
    if (pageType === 'articles') return this._cardsListNodes;
    const newArr = this._cardsListNodes.filter((item, index) => {
      if (index >= this._cardsShown && index < this._cardsShown + cardsNumberToShow) {
        return item;
      }
    });
    return newArr;
  }

  removeCards() {
    const cards = document.querySelectorAll('#articlecontainer');
    const newsCardFunc = this._newsCard;
    cards.forEach((cardToRemove) => {
      newsCardFunc.removeCard(cardToRemove);
    });
  }

  keyWordsSummary() {
    try {
      return this._originArray.reduce((accum, item) => {
        if (!accum[item.keyword]) accum[item.keyword] = 1;
        else accum[item.keyword] += 1;
        return accum;
      }, {});
    } catch (error) {
      console.log('Не задан начальный массив для построения схемы по keyword');
      return null;
    }
  }

  itemValue(keyword, schemeObj) {
    return schemeObj[keyword];
  }

  sortOriginArray() {
    const schemeObj = this.keyWordsSummary();
    let arr = [];
    let result;
    arr = this._originArray.sort((a, b) => {
      result = this.itemValue(b.keyword, schemeObj) - this.itemValue(a.keyword, schemeObj);
      return result;
    });
    return arr;
  }

  renderIntroArt() {
    const schemeObj = this.keyWordsSummary();
    const arr = Object.entries(schemeObj);
    arr.sort((a, b) => b[1] - a[1]);
    let str1 = '<p class="text intro-art__text">По ключевым словам:&nbsp;</p>';
    let str2 = '';
    const arrLength = arr.length;
    if (arrLength > 0) {
      if (arrLength > 3) {
        str2 = ` <p class="text text_bold intro-art__text">${arr[0][0]}, ${arr[1][0]}</p>&nbsp;<p class="text intro-art__text">и</p>&nbsp; <p class="text text_bold intro-art__text">${arrLength - 2} другим</p>`;
      } else if (arrLength > 2) {
        str2 = ` <p class="text text_bold intro-art__text">${arr[0][0]}, ${arr[1][0]}</p>&nbsp;<p class="text intro-art__text">и</p>&nbsp;<p class="text text_bold intro-art__text">${arrLength - 2} другому</p>`;
      } else if (arrLength > 1) {
        str2 = ` <p class="text text_bold intro-art__text">${arr[0][0]}, ${arr[1][0]}</p>`;
      } else if (arrLength > 0) {
        str2 = ` <p class="text text_bold intro-art__text">${arr[0][0]}</p>`;
      }
      str1 += str2;
      str1 = `<div class="intro-art__tags">${str1}</div>`;

      const template = document.createElement('template');
      template.insertAdjacentHTML('afterbegin', str1);
      const tagNode = template.firstElementChild;
      const tagsNode = document.querySelector('.intro-art__container');
      tagsNode.appendChild(tagNode);
    }
    let str3 = '';
    let numberOfArticles = 0;
    numberOfArticles = arr.reduce((accum, item) => {
      accum += item[1];
      return accum;
    }, 0);

    const userName = sessionStorage.getItem('userName') || 'userName';
    if (arrLength > 0) {
      str3 = `${userName}, у вас ${numberOfArticles} сохраненных статей`;
    } else str3 = `${userName}, у вас нет сохраненных статей`;

    const subtitleNode = document.querySelector('.intro-art__subtitle');
    subtitleNode.textContent = str3;
  }
}
