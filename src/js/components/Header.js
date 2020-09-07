export default class Header {
  constructor({ color }) {
    this._headerColor = color;
    this._isLoggedIn = false;
    this._userName = null;
    this._mobileMenuOpen = false;

    if (this._headerColor === 'dark') {
      const header = document.querySelector('.header');
      header.classList.add('header_dark');
      const headerLogo = document.querySelector('.header__logo');
      headerLogo.classList.add('header__link_dark');
      const headerSandwich = document.querySelector('.header__sandwich');
      headerSandwich.classList.add('header__sandwich_black');
      const headerAuthBtn = document.querySelector('.auth-btn');
      headerAuthBtn.classList.add('auth-btn_theme_dark');
    } else {
      const header = document.querySelector('.header');
      header.classList.remove('header_dark');
      const headerLogo = document.querySelector('.header__logo');
      headerLogo.classList.remove('header__link_dark');
      const headerSandwich = document.querySelector('.header__sandwich');
      headerSandwich.classList.remove('header__sandwich_black');
      const headerAuthBtn = document.querySelector('.auth-btn');
      headerAuthBtn.classList.remove('auth-btn_theme_dark');
    }
  }

  render({ isLoggedIn, userName }) {
    this._isLoggedIn = isLoggedIn;
    this._userName = userName;
    if (isLoggedIn) {
      const headerArticlesLinks = document.querySelectorAll('#articlespage');

      headerArticlesLinks.forEach((item) => {
        item.classList.remove('header__menu-item_disabled');
      });

      const headerAuthBtnNames = document.querySelectorAll('.auth-btn__name-text');
      headerAuthBtnNames.forEach((item) => {
        const currItem = item;
        currItem.textContent = userName || 'Авторизоваться';
      });
      const headerAuthBtnLogOutIcons = document.querySelectorAll('.auth-btn__logout-icon');
      headerAuthBtnLogOutIcons.forEach((item) => {
        const currItem = item;
        currItem.classList.add('auth-btn__logout-icon_enabled');
      });

      const headerMobileMenuBack = document.querySelector('.header__mobile-menu-back');
      headerMobileMenuBack.classList.remove('header__mobile-menu-back_no-authorized');
    } else {
      const headerArticlesLinks = document.querySelectorAll('#articlespage');
      headerArticlesLinks.forEach((item) => {
        const currItem = item;
        currItem.classList.add('header__menu-item_disabled');
      });

      const headerAuthBtnNames = document.querySelectorAll('.auth-btn__name-text');
      headerAuthBtnNames.forEach((item) => {
        const currItem = item;
        currItem.textContent = userName || 'Авторизоваться';
      });
      const headerAuthBtnLogOutIcons = document.querySelectorAll('.auth-btn__logout-icon');
      headerAuthBtnLogOutIcons.forEach((item) => {
        const currItem = item;
        currItem.classList.remove('auth-btn__logout-icon_enabled');
      });
      const headerMobileMenuBack = document.querySelector('.header__mobile-menu-back');
      headerMobileMenuBack.classList.add('header__mobile-menu-back_no-authorized');
    }
  }

  openCloseMenu() {
    this._mobileMenuOpen = true;
    const mobileMenu = document.querySelector('.header__mobile-menu');
    mobileMenu.classList.toggle('header__mobile-menu_enabled');
  }
}
