function _createNode(_template) {
  const template = document.createElement('template');
  // template.innerHTML = _template;
  template.insertAdjacentHTML('afterbegin', _template);
  // return template.content.firstElementChild;
  return template.firstElementChild;
}

export default class Popup {
  constructor(template) {
    this._template = template;
    this._popup = _createNode(this._getTemplate());
    this._form = null;
    this._api = null;
  }

  setForm(formObj) {
    this._form = formObj;
  }

  setApi(apiObj) {
    this._api = apiObj;
  }


  open() {
    // this._template = 'purePopup';

    // console.log(this._popup);
    // console.log(this._getTemplate());
    this._popup.classList.toggle('popup_is-opened');
    const rootNode = document.querySelector('.page');
    this._setEventListeners();
    return rootNode.appendChild(this._popup);
  }

  setContent(contentTemplateName) {
    this._template = contentTemplateName;
    const template = this._popup.querySelector('.popup__place-content');
    template.innerHTML = this._getTemplate();
    this._form.setPopup(this._popup, this);
    this._form.setEventListeners();
    this._form.setApi(this._api);
    this._setEventListenersForActionLink();
  }

  clearContent() {
    const actionLink = this._popup.querySelector('#actionlink');
    if (actionLink) {
      actionLink.removeEventListener('click', this._openPopupFromPopup.bind(this));
    }
    const template = this._popup.querySelector('.popup__place-content');
    template.innerHTML = '';
  }

  close() {
    this._popup.classList.remove('popup_is-opened');
    // console.log(this._popup);
    this.clearContent();
  }

  _callBackPopupContent(event) {
    event.stopImmediatePropagation();
  }

  _setEventListeners() {
    if (this._popup.querySelector('.popup__close')) {
      const closeButton = this._popup.querySelector('.popup__close');
      closeButton.addEventListener('click', this.close.bind(this));
      const popupContent = this._popup.querySelector('.popup__content');
      popupContent.addEventListener('click', this._callBackPopupContent.bind(this));
      this._popup.addEventListener('click', this.close.bind(this));
    }
  }

  _openPopupFromPopup() {
    // console.log(this._template);
    this.clearContent();
    if (this._template === 'popupRegistrContent') {
      this.setContent('loginPopupContent');
      return;
    }
    if (this._template === 'loginPopupContent') {
      this.setContent('popupRegistrContent');
      return;
    }
    if (this._template === 'popupSuccessRegistrContent') {
      this.setContent('loginPopupContent');
      return;
    }
  }

  _setEventListenersForActionLink() {
    const actionLink = this._popup.querySelector('#actionlink');
    actionLink.addEventListener('click', this._openPopupFromPopup.bind(this));
  }

  _getTemplate() {
    const popupTemplates = {
      purePopup: `<div id="popup" class="popup">
      <div class="popup__content">
      <img src="${require('../../images/close.svg').default}" alt="Закрыть попап" class="popup__close" />
      <div class="popup__place-content">
      </div>

      </div>
    </div>`,

      loginPopupContent: `<h3 class="popup__title">Вход</h3>
    <form id="formLogin" class="form" name="formLogin">
      <fieldset class="form__fieldset">
        <label for="emailField" class="form__label">Email</label>
        <input type="email" name="emailField" id="email" class="form__input" placeholder="Введите почту"
          required />
        <span class="form__err-message" id="erroremail"></span>
      </fieldset>
      <fieldset class="form__fieldset form__fieldset_small-margin">
        <label for="passwordField" class="form__label">Пароль</label>
        <input type="password" name="passwordField" id="password" class="form__input" placeholder="Введите пароль"
          required minlength="2"/>
        <span class="form__err-message" id="errorpassword"> </span>
      </fieldset>

      <p class="form__err-message" id="formerrmessage"> </p>
      <button disable="true" type="submit" id="submit" class="button form__button button_disabled">
        Войти
      </button>

    </form>
    <div class="popup__reg-enter">
      <p class="text popup__text">или&nbsp;</p>
      <a href="#" class="link popup__link" id="actionlink">Зарегистрироваться</a>
    </div>`,

      popupRegistrContent: `<h3 class="popup__title">Регистрация</h3>
    <form id="formRegister" class="form" name="formRegister">
      <fieldset class="form__fieldset">
        <label for="emailField" class="form__label">Email</label>
        <input type="email" name="emailField" id="email" class="form__input" placeholder="Введите почту"
          required />
        <span class="form__err-message" id="erroremail"></span>
      </fieldset>
      <fieldset class="form__fieldset">
        <label for="passwordField" class="form__label">Пароль</label>
        <input type="password" name="passwordField" id="password" class="form__input" placeholder="Введите пароль"
          required />
        <span class="form__err-message" id="errorpassword"> </span>
      </fieldset>

      <fieldset class="form__fieldset form__fieldset_small-margin">
        <label for="nameField" class="form__label">Имя</label>
        <input type="text" name="nameField" id="name" class="form__input" placeholder="Введите своё имя"
          required minlength="2"/>
        <span class="form__err-message" id="errorname"> </span>
      </fieldset>

      <p class="form__err-message" id="formerrmessage"></p>
      <button type="submit" id="submit" class="button form__button">
        Зарегистрироваться
      </button>
    </form>
    <div class="popup__reg-enter">
      <p class="text popup__text">или&nbsp;</p>
      <a href="#" class="link popup__link" id="actionlink">Войти</a>
    </div>`,
      popupSuccessRegistrContent: `<h3 class="popup__title popup__title_success">Пользователь успешно зарегистрирован</h3>
    <div class="popup__reg-enter">
      <a href="#" class="link popup__link popup__link_success" id="actionlink">Выполнить вход</a>
    </div>`,
    };
    return popupTemplates[this._template];
  }
}
