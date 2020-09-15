export default class ResultHandler {
  constructor(mainApi, newsCardList, newsCard) {
    this._mainApi = mainApi;
    this._newsCardList = newsCardList;
    this._newsCard = newsCard;
  }

  getSavedArticles() {
    this._mainApi.getArticles()
      .then((res) => {
        this._newsCardList.setOriginArray(res.data);
        const sortedArr = this._newsCardList.sortOriginArray();
        this._newsCardList.init('cards', 'cards_enabled', 'articles');
        sortedArr.forEach((element) => {
          try {
            const cardNode = this._newsCard.create(element);
            this._newsCardList.addCard(cardNode);
          } catch (error) { console.log('Ошибка при создании карточки на articlesPage!'); }
        });
        this._newsCardList.renderResults({ cardsNumberToShow: undefined, pageType: 'articles' });
        this._newsCardList.renderResultsBlock('cards', 'cards_enabled', true);
        this._newsCardList.renderIntroArt();
      })
      .catch((err) => Promise.reject(Error(err.message)));
  }
}
