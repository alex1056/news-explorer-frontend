/* eslint-disable class-methods-use-this */
export default class NewsCardList {
  constructor(cardsContainerClassName) {
    this._cardsListNodes = [];
    this._cardsAmout = 0;
    this._cardsShown = 0; // сколько уже отрисовали
    this._cardsContainer = document.querySelector(`.${cardsContainerClassName}`);
  }

  renderResults() {
    // принимает массив экземпляров карточек и отрисовывает их;
    // const cardsContainer = document.querySelector('.grid-cards');
    if (this._cardsListNodes.length > 0) {
      this.renderLoader(true);
    }
    this._cardsListNodes.forEach((element, index) => {
      if (index >= this._cardsShown) {
        // console.log(element);
        this._cardsContainer.appendChild(element);
      }
    });
    this._cardsShown = this._cardsAmout;
    this.sleep(1000)
      .then(() => this.renderLoader(false));

    // console.log(this._cardsShown, this._cardsAmout);
  }

  renderResultsBlock(className, classNameModificator, isActive = true) {
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

  renderError() {
    // принимает объект ошибки и показывает ошибку в интерфейсе;
  }

  showMore() {
    // отвечает за функциональность кнопки «Показать ещё»;
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

  init() {
    this._cardsListNodes = [];
    this._cardsAmout = 0;
    this._cardsShown = 0;
    this._cardsContainer.innerHTML = '';
    console.log(this._cardsContainer);
  }
}