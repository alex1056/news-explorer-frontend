function _createNode(_template) {
  const template = document.createElement('template');
  template.innerHTML = _template;
  return template.content.firstElementChild;
}

export default class Popup {
  constructor(template) {
    this._template = template;
    this._popup = document.createElement('div');
    this._popup.classList.add('popup');
  }

  // _createNode(_template) {
  // static _createNode(_template) {
  //   const template = document.createElement('template');
  //   template.innerHTML = _template;
  //   return template.content.firstElementChild;
  // }

  open() {
    // this._popup = this._createNode(this._getTemplate());
    this._popup = _createNode(this._getTemplate());
    this._popup.classList.toggle('popup_is-opened');
    const rootNode = document.querySelector('.page');
    this._setEventListeners();
    return rootNode.appendChild(this._popup);
  }

  close() {
    this._popup.classList.toggle('popup_is-opened');
    this._popup.parentNode.removeChild(this._popup);
  }

  _setEventListeners() {
    if (this._popup.querySelector('.popup__close')) {
      const closeButton = this._popup.querySelector('.popup__close');
      closeButton.addEventListener('click', this.close.bind(this));
    } else if (this._popup.querySelector('.popup-pic__close')) {
      const closeButton = this._popup.querySelector('.popup-pic__close');
      closeButton.addEventListener('click', this.close.bind(this));
    }
  }

  _getTemplate() {
    const popupTemplates = {
      popupLogin: `<div id="popupLogin" class="popup">
      <div class="popup__content">
      <img src="${require('../images/close.svg').default}" alt="Закрыть попап" class="popup__close" />
        <h3 class="popup__title">Вход</h3>
        <form id="formLogin" class="form" name="formLogin">
          <fieldset class="form__fieldset">
            <label for="emailField" class="form__label">Email</label>
            <input type="email" name="emailField" id="email" class="form__input" placeholder="Введите почту"
              required />
            <span class="form__err-message">Неправильный формат email</span>
          </fieldset>
          <fieldset class="form__fieldset form__fieldset_small-margin">
            <label for="passwordField" class="form__label">Пароль</label>
            <input type="password" name="passwordField" id="password" class="form__input" placeholder="Введите пароль"
              required minlength="8"/>
            <span class="form__err-message"> </span>
          </fieldset>
          <button disabled type="submit" id="submit" class="button form__button button__disabled">
            Зарегистрироваться
          </button>
        </form>
        <div class="popup__reg-enter">
          <p class="text popup__text">или&nbsp;</p>
          <a href="#" class="link popup__link">Зарегистрироваться</a>
        </div>
      </div>
    </div>`,

      popupRegistr: `<div id="popupRegistr" class="popup">
      <div class="popup__content">
        <img src="../images/close.svg" alt="" class="popup__close" />
        <h3 class="popup__title">Регистрация</h3>
        <form id="formRegister" class="form" name="formRegister">
          <fieldset class="form__fieldset">
            <label for="emailField" class="form__label">Email</label>
            <input type="email" name="emailField" id="email" class="form__input" placeholder="Введите почту"
              required />
            <span class="form__err-message">Неправильный формат email</span>
          </fieldset>
          <fieldset class="form__fieldset">
            <label for="passwordField" class="form__label">Пароль</label>
            <input type="password" name="passwordField" id="password" class="form__input" placeholder="Введите пароль"
              required />
            <span class="form__err-message"> </span>
          </fieldset>

          <fieldset class="form__fieldset form__fieldset_small-margin">
            <label for="nameField" class="form__label">Имя</label>
            <input type="text" name="nameField" id="name" class="form__input" placeholder="Введите своё имя"
              required minlength="2"/>
            <span class="form__err-message"> </span>
          </fieldset>

          <p class="form__err-message">Такой пользователь уже есть</p>
          <button type="submit" id="submit" class="button form__button">
            Зарегистрироваться
          </button>
        </form>
        <div class="popup__reg-enter">
          <p class="text popup__text">или&nbsp;</p>
          <a href="#" class="link popup__link">Войти</a>
        </div>
      </div>
    </div>`,
      popupSuccessRegistr: `<div id="popupSuccessRegistr" class="popup">
      <div class="popup__content popup__content_success">
        <img src="../images/close.svg" alt="" class="popup__close" />
        <h3 class="popup__title popup__title_success">Пользователь успешно зарегистрирован</h3>
        <div class="popup__reg-enter">
          <a href="#" class="link popup__link popup__link_success">Выполнить вход</a>
        </div>
      </div>
    </div>`,
    };
    return popupTemplates[this._template];
  }
}
