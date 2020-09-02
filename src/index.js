import './css/style.css';

import MainApi from './js/api/MainApi.js';
import Popup from './js/components/Popup.js';
import Form from './js/components/Form.js';
import Header from './js/components/Header';
import SessionHandler from './js/utils/session-storage-handler';
import selectMenuItem from './js/utils/select-menu-item';
import LoginLogout from './js/utils/login-logout';
import NewsApi from './js/api/NewsApi.js';
import sleep from './js/utils/sleep';

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
  url: 'http://newsapi.org/v2/everything?', apiKey: 'a7267553079b4e5c8b89115addcec200', language: 'ru', pageSize: 100
});
const newsCard = new NewsCard('indexPage');
const newsCardList = new NewsCardList('grid-cards');

const openMobileMenuButton = document.querySelector('.header__mobile-icon');
const mobileMenu = document.querySelector('.header__mobile-menu');
const closeMobileMenuButton = mobileMenu.querySelector('.header__mobile-icon');

const authBtns = document.querySelectorAll('.auth-btn');

form.setSessionHandler(sessionHandler);
form.setHeaderClass(header);

sessionHandler.showAuthStatus(header);

openMobileMenuButton.addEventListener('click', header.openCloseMenu.bind(header));
closeMobileMenuButton.addEventListener('click', header.openCloseMenu.bind(header));

// const logout = function () {
//   mainApi.logout()
//     .then(() => {
//       sessionHandler.logoutSession();
//       const props = { isLoggedIn: false, userName: 'Авторизоваться' };
//       header.render(props);
//     })
//     .catch((err) => Promise.reject(Error(err.message)));
// };

// const loginLogout = function () {
//   if (sessionHandler.getName()) {
//     logout();
//   } else if (!sessionHandler.getName()) {
//     popup.setForm(form);
//     popup.setApi(mainApi);
//     popup.open();
//     popup.setContent('popupRegistrContent');
//   }
// };
// const loginLogoutHandler = loginLogout(popup, form, sessionHandler, mainApi, header);
loginLogout.setArgs({
  popup, form, sessionHandler, mainApi, header,
});

authBtns.forEach((item) => {
  item.addEventListener('click', loginLogout.execListener.bind(loginLogout));
});

function pressSearchBtn(event) {
  event.preventDefault();
  const searchInput = document.querySelector('#searchinput');
  // console.log(searchInput.value);

  if (searchInput.value) {
    // const preloader = document.querySelector('.preloader-block');
    // preloader.classList.add('preloader-block_enabled');

    newsApi.getNews(searchInput.value)
      .then((data) => {
        // пишем локал сторедж
        // console.log(data);
        console.log(data);
        console.log(data.articles);
        // let cardNode = null;
        newsCardList.init();
        data.articles.forEach((element) => {
          const cardNode = newsCard.create(element);
          newsCardList.addCard(cardNode);
        });
        newsCardList.renderResults();
        newsCardList.renderResultsBlock('result', 'result_enabled', true);
        // if (data.articles[0]) {
        //   console.log(data.articles[0]);
        //   cardNode = newsCard.create(data.articles[0]);

        //   newsCardList.addCard(cardNode);
        //   newsCardList.addCard(cardNode);
        //   newsCardList.addCard(cardNode);
        //   newsCardList.renderResults();

        //   newsCardList.renderResultsBlock('result', 'result_enabled', true);
        // }
        // const dataJSON = JSON.stringify(data.articles);
        // localStorage.setItem('newsData', dataJSON);
        // const newsData = JSON.parse(localStorage.getItem('newsData'));
        // console.log(newsData);

        // sleep(1000)
        // .then(() => preloader.classList.remove('preloader-block_enabled'))
      })
      .catch((err) => Promise.reject(Error(err.message)));
    // newsApi.fromToDates();
  }
}


const searchBtn = document.querySelector('.search__button');
searchBtn.addEventListener('click', pressSearchBtn);

// console.log(newsCard.dateParsToWords('2022-12-28'));
