import './css/style.css';

import MainApi from './js/api/MainApi.js';
import Popup from './js/components/Popup.js';
import Form from './js/components/Form.js';
import Header from './js/components/Header';
import SessionHandler from './js/utils/session-storage-handler';
import selectMenuItem from './js/utils/select-menu-item';
import LoginLogout from './js/utils/login-logout';
import NewsApi from './js/api/NewsApi.js';

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
const newsApi = new NewsApi({ url: 'http://newsapi.org/v2/everything?', apiKey: 'a7267553079b4e5c8b89115addcec200', language: 'ru', pageSize: 100 });

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

newsApi.getNews('погода');
