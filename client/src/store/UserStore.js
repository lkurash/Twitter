import { makeAutoObservable } from "mobx";

class UserStore {
  constructor() {
    this._auth = false;
    this._user = [];
    this._birthDate = "";
    this._allUsers = [];
    this._userPage = [];
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this._auth = bool;
  }

  setUser(user) {
    this._user = user;
  }

  setAllUsers(users) {
    if (users.length !== 0) {
      this._allUsers = users;
    }else{
      this._allUsers = false;
    }
  }

  setUserPage(user) {
    this._userPage = user;
  }

  setBirthDate(birthDate) {
    this._birthDate = birthDate;
  }

  get isAuth() {
    return this._auth;
  }

  get user() {
    return this._user;
  }

  get allUsers() {
    return this._allUsers;
  }

  get userPage() {
    return this._userPage;
  }

  get birthDate() {
    return this._birthDate;
  }
}
export default UserStore;
