import '../css/articles.css';

import MainApi from '../js/api/main-api.js';
import Header from '../js/components/header';
import SessionHandler from '../js/utils/session-storage-handler';
import selectMenuItem from '../js/utils/select-menu-item';
import LoginLogout from '../js/utils/login-logout';

import NewsCard from '../js/components/news-card';
import NewsCardList from '../js/components/news-card-list';
import ResultHandler from '../js/components/result-handler';

const {
  URL_MAIN_API,
} = require('../config');

selectMenuItem('#articlespagelink');
const mainApi = new MainApi(URL_MAIN_API);
const header = new Header({ color: 'dark' });
const sessionHandler = new SessionHandler();
const loginLogout = new LoginLogout();

const newsCard = new NewsCard('indexPage');
const newsCardList = new NewsCardList('grid-cards');
const resultHandler = new ResultHandler(mainApi, newsCardList, newsCard);

const openMobileMenuButton = document.querySelector('.header__mobile-icon');
const mobileMenu = document.querySelector('.header__mobile-menu');
const closeMobileMenuButton = mobileMenu.querySelector('.header__mobile-icon');

const authBtns = document.querySelectorAll('.auth-btn');

sessionHandler.showAuthStatus(header);
sessionHandler.isLoggedInFunc();
sessionHandler.checkForRedirect();
newsCard.setMainApi(mainApi);
newsCard.setPageType('articles');
newsCard.setSessionHandler(sessionHandler);
sessionHandler.init();
sessionHandler.showAuthStatus(header);
newsCardList.setNewsCard(newsCard);

openMobileMenuButton.addEventListener('click', header.openCloseMenu.bind(header));
closeMobileMenuButton.addEventListener('click', header.openCloseMenu.bind(header));

loginLogout.setArgs({
  sessionHandler, mainApi, header, newsCardList,
});

authBtns.forEach((item) => {
  item.addEventListener('click', loginLogout.execListener.bind(loginLogout));
});

resultHandler.getSavedArticles();
