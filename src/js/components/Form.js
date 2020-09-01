function _showErrorMessage(message) {
  const errorElement = document.querySelector('#formerrmessage');
  errorElement.textContent = message;
}

const validatorModule = require('validator');

function _sleep(ms) {
  return new Promise((resolve) => setTimeout(() => {
    resolve();
  }, ms));
}

export default class Form {
  constructor() {
    this._handlerFormOpen = null;
    this._sessionHandler = null;
    this._header = null;
    // TODO убрать в константы
    this._validationHelpWords = {
      validationLenght: 'Должно быть от 2 до 30 символов',
      validationEmailPresent: 'Некорректный формат email',
    };
    // end TODO
  }

  setPopup(popupElem, popupObj) {
    this.popupObj = popupObj;
    this._popup = popupElem;
    this.form = popupElem.querySelector('.form');
    this._submit = popupElem.querySelector('#submit');
  }

  setApi(apiObj) {
    this._api = apiObj;
  }

  setSessionHandler(sessionHandler) {
    this._sessionHandler = sessionHandler;
    // console.log(this._sessionHandler);
  }

  setHeaderClass(headerObj) {
    this._header = headerObj;
  }

  _validateInputElement(element) {
    const errorElement = document.querySelector(`#error${element.id}`);
    if (!element.value.length) {
      errorElement.textContent = this._validationHelpWords.validationLenght;
      return false;
    } if (element.type === 'email') {
      if (!validatorModule.isEmail(element.value)) {
        errorElement.textContent = this._validationHelpWords.validationEmailPresent;
        return false;
      }
    } else if (element.value.length < 2 || element.value.length > 30) {
      errorElement.textContent = this._validationHelpWords.validationLenght;
      return false;
    }
    errorElement.textContent = '';
    return true;
  }

  // _setSubmitButtonState(event) {
  _validateForm(event) {
    event.preventDefault();
    const form = this._popup.querySelector('.form');
    const submit = form.querySelector('#submit');
    const inputs = Array.from(form.elements);
    let isValidForm = true;
    // console.log(inputs);
    inputs.forEach((elem) => {
      if (elem.id && elem.id !== submit.id) {
        if (!this._validateInputElement(elem)) {
          isValidForm = false;
        }
      }
    });
    return isValidForm;
  }

  setEventListeners() {
    this._handlerFormOpen = this._formHandler.bind(this);
    let currentForm = this._popup.querySelector('#formLogin');
    // console.log(currentForm);
    if (currentForm) {
      const inputEmail = this._popup.querySelector('#email');
      inputEmail.addEventListener('input', this._handlerFormOpen);
      const inputPassword = this._popup.querySelector('#password');
      inputPassword.addEventListener('input', this._handlerFormOpen);
      const form = this._popup.querySelector('.form');
      form.addEventListener('submit', this._handlerFormOpen);
      return;
    }
    currentForm = this._popup.querySelector('#formRegister');
    if (currentForm) {
      const inputEmail = this._popup.querySelector('#email');
      inputEmail.addEventListener('input', this._handlerFormOpen);
      const inputPassword = this._popup.querySelector('#password');
      inputPassword.addEventListener('input', this._handlerFormOpen);
      const inputName = this._popup.querySelector('#name');
      inputName.addEventListener('input', this._handlerFormOpen);
      const form = this._popup.querySelector('.form');
      form.addEventListener('submit', this._handlerFormOpen);
    }
  }

  removeEventListeners() {
    let currentForm = this._popup.querySelector('#formLogin');
    if (currentForm) {
      const inputEmail = this._popup.querySelector('#email');
      inputEmail.removeEventListener('input', this._handlerFormOpen);
      const inputPassword = this._popup.querySelector('#password');
      inputPassword.removeEventListener('input', this._handlerFormOpen);
      const form = this._popup.querySelector('.form');
      form.removeEventListener('submit', this._handlerFormOpen);
      return;
    }

    currentForm = this._popup.querySelector('#formRegister');
    if (currentForm) {
      const inputEmail = this._popup.querySelector('#email');
      inputEmail.removeEventListener('input', this._handlerFormOpen);
      const inputPassword = this._popup.querySelector('#password');
      inputPassword.removeEventListener('input', this._handlerFormOpen);
      const inputName = this._popup.querySelector('#name');
      inputName.removeEventListener('input', this._handlerFormOpen);
      const form = this._popup.querySelector('.form');
      form.removeEventListener('submit', this._handlerFormOpen);
    }
  }

  renderButton(isValidForm) {
    if (!isValidForm) {
      this._submit.classList.add('button_disabled');
      this._submit.setAttribute('disable', true);
    } else {
      this._submit.classList.remove('button_disabled');
      this._submit.removeAttribute('disable');
    }
  }

  _formHandler(event) {
    const isValidForm = this._validateForm(event);
    this.renderButton(isValidForm);

    if (event.type === 'submit' && event.target.closest('#formLogin')) {
      if (isValidForm) {
        const inputEmail = this._popup.querySelector('#email');
        const inputPassword = this._popup.querySelector('#password');
        const credentials = { email: inputEmail.value, password: inputPassword.value };
        this._api.login(credentials)
          .then((result) => {
            if (result === 200) {
              this._api.getUserInfo()
                .then((data) => {
                  // console.log(data);
                  const { name } = data;
                  // console.log(name);
                  this._sessionHandler.setUserName(name);
                  const props = { isLoggedIn: true, userName: name };
                  this._header.render(props);
                })
                .catch((err) => {
                  console.log(err);
                  _showErrorMessage(err.message);
                });
            }

            this.removeEventListeners();
            this.popupObj.close();
            return result;
          })
          .catch((err) => {
            _showErrorMessage(err.message);
          });
      }
    }
    if (event.type === 'submit' && event.target.closest('#formRegister')) {
      if (isValidForm) {
        const inputEmail = this._popup.querySelector('#email');
        const inputPassword = this._popup.querySelector('#password');
        const inputName = this._popup.querySelector('#name');
        const credentials = { email: inputEmail.value, password: inputPassword.value, name: inputName.value };
        this._api.signup(credentials)
          .then((result) => {
            this.removeEventListeners();
            _sleep(1500);
            this.popupObj.clearContent();
            this.popupObj.setContent('popupSuccessRegistrContent');
            return result;
          })
          .catch((err) => {
            _showErrorMessage(err.message);
          });
      }
    }
  }
  // else if (
  //   event.type === 'submit'
  //   && event.target.closest('#editprofile')
  // ) {
  //   if (isValidForm) {
  //     this._sendForm()
  //       .then((result) => {
  //         this.removeEventListeners();
  //         this.popupObj.close();
  //         return result;
  //       })
  //       .catch((err) => {
  //         console.log(`Ошибка при сохранении UserInfo: ${err}`);
  //       });
  //   }
  // } else if (event.type === 'submit' && event.target.closest('#newavatar')) {
  //   if (isValidForm) {
  //     this._sendForm()
  //       .then((result) => { this.removeEventListeners(); this.popupObj.close(); return result; })
  //       .catch((err) => {
  //         console.log(`Ошибка при сохранении Avatar: ${err}`);
  //       });
  //   }
  // }
  // }

  _sendForm() {
    // console.log(this.form.id);
    if (this.form.id === 'formLogin') {
      // const obj = {
      //   name: this.form.elements.name.value,
      //   link: this.form.elements.link.value,
      // };
      // this._cardList.saveCard(obj);
      console.log('Отработала ф. отправки формы');
      // return Promise.resolve(true);
      return this._api.login();
    }

    /*
     else if (this.form.id === 'profileform') {
       const obj = {
         name: this.form.elements.name.value,
         about: this.form.elements.about.value,
       };
       this._userInfo.updateUserInfo(obj);
     } else {
       this._userInfo._saveAvatar(this.form.elements.link.value);
     }
     */
    return _sleep(1000);
  }
}
