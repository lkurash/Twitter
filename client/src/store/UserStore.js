import { makeAutoObservable } from "mobx";

class UserStore {
  constructor() {
    this._auth = false;
    this._user = [];
    this._userRegistrationName = "";
    this._userRegistrationEmail = "";
    this._userRegistrationPassword = "";
    this._birthDate = "";
    this._allUsers = [];
    this._usersWhoToReadUsers = [];
    this._userPage = [];
    this._foundUsers = [];
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this._auth = bool;
  }

  setUserRegistrationName(name) {
    if (name.length > 0) {
      this._userRegistrationName = name;
    } else {
      this._userRegistrationName = false;
    }
  }

  setUserRegistrationEmail(email) {
    const expression =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (expression.test(String(email).toLowerCase())) {
      this._userRegistrationEmail = email;
    } else {
      this._userRegistrationEmail = false;
    }
  }

  setUserRegistrationPassword(password) {
    if (password.length > 0) {
      this._userRegistrationPassword = password;
    } else {
      this._userRegistrationPassword = false;
    }
  }

  setUser(user) {
    this._user = user;
  }

  setAllUsers(users) {
    if (users.length !== 0) {
      this._allUsers = users;
    } else {
      this._allUsers = false;
    }
  }

  setUserPage(user) {
    this._userPage = user;
  }

  setBirthDate(birthDate) {
    this._birthDate = birthDate;
  }

  setFoundUsers(users) {
    if (users.length !== 0) {
      this._foundUsers = users;
    } else {
      this._foundUsers = false;
    }
  }

  setUsersWhoToReadUsers(users) {
    this._usersWhoToReadUsers = users;
  }

  get isAuth() {
    return this._auth;
  }

  get user() {
    return this._user;
  }

  get userRegistrationName() {
    return this._userRegistrationName;
  }

  get userRegistrationEmail() {
    return this._userRegistrationEmail;
  }

  get userRegistrationPassword() {
    return this._userRegistrationPassword;
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
  get foundUsers() {
    return this._foundUsers;
  }

  get usersWhoToReadUsers() {
    return this._usersWhoToReadUsers;
  }
}
export default UserStore;
