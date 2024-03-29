export default class LoginLogout {
  constructor() {
    this._popup = null;
    this._form = null;
    this._sessionHandler = null;
    this._mainApi = null;
    this._header = null;
    this._newsCardList = null;
  }

  setArgs({
    popup, form, sessionHandler, mainApi, header, pageName, newsCardList,
  }) {
    this._popup = popup;
    this._form = form;
    this._sessionHandler = sessionHandler;
    this._mainApi = mainApi;
    this._header = header;
    this._pageName = pageName;
    this._newsCardList = newsCardList;
  }

  logout() {
    this._mainApi.logout()
      .then(() => {
        this._sessionHandler.logoutSession();
        const props = { isLoggedIn: false, userName: 'Авторизоваться' };
        this._header.render(props);
        this._newsCardList.init();
      })
      .catch((err) => Promise.reject(Error(err.message)));
  }

  execListener() {
    if (this._pageName === 'articles') {
      this.logout();
      window.location.href = '../';
      return;
    }
    if (this._sessionHandler.isLoggedInFunc()) {
      this.logout();
    } else {
      this._popup.setForm(this._form);
      this._popup.setApi(this._mainApi);
      this._popup.open();
      this._popup.setContent('popupRegistrContent');
      this._newsCardList.init();
    }
  }
}
