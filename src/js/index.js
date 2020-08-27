import '../css/style.css';

import Popup from './popup.js';
// const Popup = require('./popup');

const popupLogin = new Popup('popupLogin');
// console.log(popupLogin);
// const popupRegister = new Popup('popupRegister');
// const popupSuccessRegistr = new Popup('popupSuccessRegistr');

const openMobileMenuButton = document.querySelector('.header__mobile-icon');
const mobileMenu = document.querySelector('.header__mobile-menu');
const closeMobileMenuButton = mobileMenu.querySelector('.header__mobile-icon');
const hiResMenu = document.querySelector('.header__hi-res-menu');
const authBtn = hiResMenu.querySelector('.auth-btn');

// console.log(openMobileMenuButton);
// console.log(closeMobileMenuButton);
// console.log(authBtn);

const openCloseMenu = function () {
  const mobileMenu1 = document.querySelector('.header__mobile-menu');
  mobileMenu1.classList.toggle('header__mobile-menu_enabled');
  // console.log('Листенер сработал');
};

openMobileMenuButton.addEventListener('click', openCloseMenu);
closeMobileMenuButton.addEventListener('click', openCloseMenu);

const openPopupLogin = function () {
  popupLogin.open();
};

authBtn.addEventListener('click', openPopupLogin);

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
