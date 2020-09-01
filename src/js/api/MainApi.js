
export default class MainApi {
  constructor(urlMainApi = 'https://api.diploma-2020.ru') {
    this._obj = null;
    this._userId = null;
    this._urlMainApi = urlMainApi
  }

  logout() {
    return fetch(`${this._urlMainApi}/logout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          // console.log(res);
          return Promise.resolve(res.status);
        }
        return Promise.reject(Error('Произошла ошибка'));
      })
      .catch((err) => Promise.reject(Error(err.message)));
  }

  login(credentials = { email: 'dlsk@dskf10.yu', password: '123' }) {
    return fetch(`${this._urlMainApi}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          // console.log(res);
          return Promise.resolve(res.status);
        }
        return Promise.reject(Error('Неправильные логин или пароль'));
      })
      .catch((err) => Promise.reject(Error(err.message)));
  }


  signup(credentials = { email: 'dlsk@dskf15.yu', password: '123', name: 'qweqwe10' }) {
    return fetch(`${this._urlMainApi}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        name: credentials.name
      }),
    })
      // .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        if (res.status === 201) {
          return Promise.resolve(res.status);
        }
        if (res.status === 409) {
          return Promise.reject(Error('Такой пользователь уже есть'));
        }
        return Promise.reject(Error('Произошла ошибка'));
      })
      .catch((err) => Promise.reject(Error(err.message)));
  }



  getUserInfo() {
    return fetch(`${this._urlMainApi}/users/me`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        return Promise.resolve(data);
      })
      .catch((err) => Promise.reject(Error(err.message)));
  }



  // _getUserIdfromServer() {
  //   this.doGetRequest('info')
  //     .then((result) => {
  //       this.setUserId(result._id);
  //     })
  //     .catch((err) => {
  //       console.log(`Ошибка: ${err}`);
  //     });
  // }

  // setUserId(userId) {
  //   this._userId = userId;
  // }

  // getUserId() {
  //   return this._userId;
  // }

  // doGetRequest(cardsOrInfo) {
  //   cardsOrInfo === 'cards'
  //     ? (cardsOrInfo = this.userInfoUrl)
  //     : (cardsOrInfo = this.primaryCardsUrl);

  //   return (
  //     fetch(cardsOrInfo, {
  //       headers: {
  //         authorization: this.authKey,
  //       },
  //     })
  //       .then((res) => {
  //         if (res.ok) {
  //           return res.json();
  //         }
  //         return Promise.reject(res.status);
  //       })
  //       //.catch((res) => console.log('New Err message', new Error(res.message)));
  //       .catch((res) => Promise.reject(new Error(res.message)))
  //   );
  // }

  // setData(obj) {
  //   this._obj = obj;
  // }

  // doPatchRequest(cardsOrInfo) {
  //   cardsOrInfo === 'cards'
  //     ? (cardsOrInfo = this.userInfoUrl)
  //     : (cardsOrInfo = this.primaryCardsUrl);

  //   return fetch(cardsOrInfo, {
  //     method: 'PATCH',
  //     headers: {
  //       authorization: this.authKey,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       name: this._obj.name,
  //       about: this._obj.about,
  //     }),
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       return Promise.reject(res.status);
  //     })
  //     .catch((res) => Promise.reject(new Error(res.message)));
  // }

  // doPostRequest(cardsOrInfo) {
  //   cardsOrInfo === 'cards'
  //     ? (cardsOrInfo = this.userInfoUrl)
  //     : (cardsOrInfo = this.primaryCardsUrl);
  //   return fetch(cardsOrInfo, {
  //     method: 'POST',
  //     headers: {
  //       authorization: this.authKey,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       name: this._obj.name,
  //       link: this._obj.link,
  //     }),
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       return Promise.reject(res.status);
  //     })
  //     .catch((res) => Promise.reject(new Error(res.message)));
  // }

  // DELETE https://praktikum.tk/cohortId/cards/cardId
  // doDeleteRequest(cardId) {
  //   const requestUrl = `${this.domainUrl}${this.groupId}/cards/${cardId}`;
  //   return fetch(requestUrl, {
  //     method: 'DELETE',
  //     headers: {
  //       authorization: this.authKey,
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       return Promise.reject(res.status);
  //     })
  //     .catch((res) => Promise.reject(new Error(res.message)));
  // }

  // PUT https://praktikum.tk/cohortId/cards/like/cardId
  // doSetLikeRequest(cardId) {
  //   const requestUrl = `${this.domainUrl}${this.groupId}/cards/like/${cardId}`;
  //   return fetch(requestUrl, {
  //     method: 'PUT',
  //     headers: {
  //       authorization: this.authKey,
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       return Promise.reject(res.status);
  //     })
  //     .catch((res) => Promise.reject(new Error(res.message)));
  // }

  // DELETE https://praktikum.tk/cohortId/cards/like/cardId
  // doDeleteLikeRequest(cardId) {
  //   const requestUrl = `${this.domainUrl}${this.groupId}/cards/like/${cardId}`;
  //   return fetch(requestUrl, {
  //     method: 'DELETE',
  //     headers: {
  //       authorization: this.authKey,
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       return Promise.reject(res.status);
  //     })
  //     .catch((res) => Promise.reject(new Error(res.message)));
  // }

  // PATCH https://praktikum.tk/cohortId/users/me/avatar
  //   doPatchRequestAvatar(urlToAvatar) {
  //     return fetch(`${this.domainUrl}${this.groupId}/users/me/avatar`, {
  //       method: 'PATCH',
  //       headers: {
  //         authorization: this.authKey,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         avatar: urlToAvatar,
  //       }),
  //     })
  //       .then((res) => {
  //         if (res.ok) {
  //           return res.json();
  //         }
  //         return Promise.reject(res.status);
  //       })
  //       .catch((res) => Promise.reject(new Error(res.message)));
  //   }
}
