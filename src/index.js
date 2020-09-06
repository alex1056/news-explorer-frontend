import './css/style.css';

import MainApi from './js/api/main-api.js';
import Popup from './js/components/popup.js';
import Form from './js/components/form.js';
import Header from './js/components/header';
import SessionHandler from './js/utils/session-storage-handler';
import selectMenuItem from './js/utils/select-menu-item';
import LoginLogout from './js/utils/login-logout';
import NewsApi from './js/api/news-api.js';

import { setArrLocalStorage } from './js/utils/local-storage-handler';

import NewsCard from './js/components/news-card';
import NewsCardList from './js/components/news-card-list';

const {
  URL_MAIN_API,
} = require('./config');

selectMenuItem('#indexpagelink');

const popup = new Popup('purePopup');
const form = new Form();
const mainApi = new MainApi(URL_MAIN_API);
const header = new Header({ color: 'white' });
const sessionHandler = new SessionHandler();
const loginLogout = new LoginLogout();
const newsApi = new NewsApi({
  url: 'http://newsapi.org/v2/everything?', apiKey: 'a7267553079b4e5c8b89115addcec200', language: 'ru', pageSize: 100,
});
const newsCard = new NewsCard('indexPage');
const newsCardList = new NewsCardList('grid-cards');

const openMobileMenuButton = document.querySelector('.header__mobile-icon');
const mobileMenu = document.querySelector('.header__mobile-menu');
const closeMobileMenuButton = mobileMenu.querySelector('.header__mobile-icon');

const authBtns = document.querySelectorAll('.auth-btn');

form.setSessionHandler(sessionHandler);
form.setHeaderClass(header);
newsCard.setMainApi(mainApi);
newsCard.setSessionHandler(sessionHandler);
sessionHandler.init();
sessionHandler.showAuthStatus(header);
sessionHandler.isLoggedInFunc();
newsCardList.setNewsCard(newsCard);

openMobileMenuButton.addEventListener('click', header.openCloseMenu.bind(header));
closeMobileMenuButton.addEventListener('click', header.openCloseMenu.bind(header));

loginLogout.setArgs({
  popup, form, sessionHandler, mainApi, header, newsCardList,
});

authBtns.forEach((item) => {
  item.addEventListener('click', loginLogout.execListener.bind(loginLogout));
});

function pressSearchBtn(event) {
  event.preventDefault();
  const searchInput = document.querySelector('#searchinput');

  if (searchInput.value) {
    newsApi.getNews(searchInput.value)
      .then((data) => {
        if (data.status === 'ok') {
          newsCardList.init();
          newsCard.setKeyWord(searchInput.value);
          setArrLocalStorage('newsData', data.articles);
          newsCard.setSavedArticles()
            .then(() => {
              data.articles.forEach((element) => {
                try {
                  const cardNode = newsCard.create(element);
                  newsCardList.addCard(cardNode);
                } catch (error) { console.log('Ошибка при создании карточки на indexPage!'); }
              });
              newsCardList.renderLoader(true);
              newsCardList.sleep(1000)
                .then(() => {
                  newsCardList.renderLoader(false);
                  if (data.articles.length > 0) {
                    newsCardList.renderResults({ cardsNumberToShow: 3, pageType: 'index' });
                    newsCardList.renderResultsBlock('result', 'result_enabled', true);
                  } else newsCardList.renderError(true);
                });
            })
            .catch((err) => Promise.reject(new Error(err.message)));
        } else throw new Error('Что-то пошло не так');
      })
      .catch((err) => {
        newsCardList.renderError(true, err);
      });
  }
}

const searchBtn = document.querySelector('.search__button');
searchBtn.addEventListener('click', pressSearchBtn);

const showMoreBtn = document.querySelector('.result__btn');
showMoreBtn.addEventListener('click', newsCardList.showMore.bind(newsCardList));
