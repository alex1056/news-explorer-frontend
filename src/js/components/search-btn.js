export default class SearchBtn {
  constructor(newsApi, newsCardList, newsCard) {
    this._newsApi = newsApi;
    this._newsCardList = newsCardList;
    this._newsCard = newsCard;
  }

  pressSearchBtn(event) {
    event.preventDefault();
    const searchInput = document.querySelector('#searchinput');

    if (searchInput.value) {
      this._newsApi.getNews(searchInput.value)
        .then((data) => {
          if (data.status === 'ok') {
            this._newsCardList.init();
            this._newsCard.setKeyWord(searchInput.value);
            this.setArrLocalStorage('newsData', data.articles);
            this._newsCard.setSavedArticles()
              .then(() => {
                data.articles.forEach((element) => {
                  try {
                    const cardNode = this._newsCard.create(element);
                    this._newsCardList.addCard(cardNode);
                  } catch (error) { console.log('Ошибка при создании карточки на indexPage!'); }
                });
                this._newsCardList.renderLoader(true);
                this._newsCardList.sleep(1000)
                  .then(() => {
                    this._newsCardList.renderLoader(false);
                    if (data.articles.length > 0) {
                      this._newsCardList.renderResults({ cardsNumberToShow: 3, pageType: 'index' });
                      this._newsCardList.renderResultsBlock('result', 'result_enabled', true);
                      this._newsCardList.renderShowMoreButton();
                    } else this._newsCardList.renderError(true);
                  });
              })
              .catch((err) => Promise.reject(new Error(err.message)));
          } else throw new Error('Что-то пошло не так');
        })
        .catch((err) => {
          this._newsCardList.renderError(true, err);
        });
    }
  }

  setArrLocalStorage(itemName = 'newsData', arrJSON) {
    const arr = JSON.stringify(arrJSON);
    localStorage.setItem(itemName, arr);
  }
}
