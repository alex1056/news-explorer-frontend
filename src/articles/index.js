import '../css/articles.css';

import Header from '../js/components/Header';
import MainApi from '../js/api/MainApi.js';
import SessionHandler from '../js/utils/session-storage-handler';
import selectMenuItem from '../js/utils/select-menu-item';
import LoginLogout from '../js/utils/login-logout';

const {
  URL_MAIN_API,
} = require('../config');

// const Popup = require('./popup');
selectMenuItem('#articlespagelink');
const mainApi = new MainApi(URL_MAIN_API);
const header = new Header({ color: 'dark' });
const sessionHandler = new SessionHandler();
const loginLogout = new LoginLogout();

const openMobileMenuButton = document.querySelector('.header__mobile-icon');
const mobileMenu = document.querySelector('.header__mobile-menu');
const closeMobileMenuButton = mobileMenu.querySelector('.header__mobile-icon');

const authBtns = document.querySelectorAll('.auth-btn');

sessionHandler.showAuthStatus(header);
sessionHandler.checkForRedirect();

openMobileMenuButton.addEventListener('click', header.openCloseMenu.bind(header));
closeMobileMenuButton.addEventListener('click', header.openCloseMenu.bind(header));

loginLogout.setArgs({
  sessionHandler, mainApi, header, pageName: 'articles',
});

authBtns.forEach((item) => {
  item.addEventListener('click', loginLogout.execListener.bind(loginLogout));
});

// window.location.href = '../';

// (function () {
//   const cropElement = document.querySelectorAll('.card__text');
//   const size = 60;
//   const endCharacter = '...';
//   if (window.screen.width <= 768) {
//     cropElement.forEach((el) => {
//       const elem = el;
//       let text = el.innerHTML;

//       if (el.innerHTML.length > size) {
//         text = text.substr(0, size);
//         elem.innerHTML = text + endCharacter;
//       }
//     });
//   }
// }());
