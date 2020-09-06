export default class Popup {
  constructor(template) {
    this._template = template;
    this._popup = this._createNode(this._getTemplate());
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
    this._popup.classList.toggle('popup_is-opened');
    const rootNode = document.querySelector('.page');
    this._setEventListeners();
    return rootNode.appendChild(this._popup);
  }

  setContent(contentTemplateName) {
    this._template = contentTemplateName;
    const template = this._popup.querySelector('.popup__place-content');
    template.appendChild(this._createNode(this._getTemplate()));
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
    this._removeInternalContent(template);
  }

  _removeInternalContent(nodeTemplate) {
    try {
      const nodesToRemove = nodeTemplate.querySelectorAll('*');
      nodesToRemove.forEach((nodeToRemove) => {
        nodeToRemove.parentNode.removeChild(nodeToRemove);
      });
    } catch (err) {
      console.log('Удаление контента popup ', err.message);
    }
  }

  close() {
    this._popup.classList.remove('popup_is-opened');
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

      loginPopupContent: `
      <div>
      <h3 class="popup__title">Вход</h3>
    <form id="formLogin" class="form" name="formLogin">
      <fieldset class="form__fieldset">
        <label for="emailField" class="form__label">Email</label>
        <input type="email" name="emailField" id="email" class="form__input" placeholder="Введите почту"
          required autocomplete="on"/>
        <span class="form__err-message" id="erroremail"></span>
      </fieldset>
      <fieldset class="form__fieldset form__fieldset_small-margin">
        <label for="passwordField" class="form__label">Пароль</label>
        <input type="password" name="passwordField" id="password" class="form__input" placeholder="Введите пароль"
          required minlength="2" autocomplete="current-password"/>
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
    </div>
    </div>`,

      popupRegistrContent: `
      <div>
      <h3 class="popup__title">Регистрация</h3>
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
          required autocomplete="off"/>
        <span class="form__err-message" id="errorpassword"> </span>
      </fieldset>

      <fieldset class="form__fieldset form__fieldset_small-margin">
        <label for="nameField" class="form__label">Имя</label>
        <input type="text" name="nameField" id="name" class="form__input" placeholder="Введите своё имя"
          required minlength="2" autocomplete="off"/>
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
    </div>
    </div>`,
      popupSuccessRegistrContent: `
      <div>
      <h3 class="popup__title popup__title_success">Пользователь успешно зарегистрирован</h3>
    <div class="popup__reg-enter">
      <a href="#" class="link popup__link popup__link_success" id="actionlink">Выполнить вход</a>
    </div>
    </div>`,
    };
    return popupTemplates[this._template];
  }

  _createNode(_template) {
    const template = document.createElement('template');
    template.insertAdjacentHTML('afterbegin', _template);
    return template.firstElementChild;
  }
}
