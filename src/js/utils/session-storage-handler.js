export default class sessionHandler {
  constructor() {
    this.isLoggedIn = false;
    this.userName = null;
  }

  setUserName(userName) {
    sessionStorage.setItem('userName', userName);
    sessionStorage.setItem('isLoggedIn', true);
    this.isLoggedIn = true;
    this.userName = userName;
  }

  getName() {
    this.userName = sessionStorage.getItem('userName');
    return this.userName;
  }

  isLoggedInFunc() {
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn');
    return this.isLoggedIn === 'true'; // т.к. текст возвращает
  }

  init() {
    this.userName = sessionStorage.getItem('userName');
    this.isLoggedIn = this.isLoggedInFunc();
    return { userName: this.userName, isLoggedIn: this.isLoggedIn };
  }

  logoutSession() {
    sessionStorage.setItem('userName', '');
    sessionStorage.setItem('isLoggedIn', false);
    this.isLoggedIn = false;
    this.userName = null;
    this.checkForRedirect();
  }

  showAuthStatus(headerObj) {
    if (this.init().isLoggedIn) {
      const props = { isLoggedIn: true, userName: this.userName };
      headerObj.render(props);
    } else {
      const props = { isLoggedIn: false, userName: 'Авторизоваться' };
      headerObj.render(props);
    }
  }

  checkForRedirect() {
    if (!this.getName()) {
      window.location.href = '../';
    }
  }
}
