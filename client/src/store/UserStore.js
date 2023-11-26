import { makeAutoObservable } from "mobx";

class UserStore {
  constructor() {
    this._name = null;
    this._about = null;
    this._webSite = null;
    this._photo = null;
    this._background = null;
    this._userRegistrationName = "";
    this._userRegistrationEmail = "";
    this._userRegistrationPassword = "";
    this._birthDate = "";
    makeAutoObservable(this);
  }

  setUserInfo(profile) {
    this.setName(profile.user_name);
    this.setPhoto(profile.photo);
    this.setBackground(profile.background);
    this.setAbout(profile.about);
    this.setWebSite(profile.web_site_url);
  }

  setName(name) {
    this._name = name;
  }

  setPhoto(photo) {
    this._photo = photo;
  }

  setBackground(background) {
    this._background = background;
  }

  setAbout(about) {
    this._about = about;
  }

  setWebSite(webSite) {
    this._webSite = webSite;
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

  setBirthDate(birthDate) {
    this._birthDate = birthDate;
  }

  get name() {
    return this._name;
  }

  getPhoto() {
    return this._photo;
  }

  getBackground() {
    return this._background;
  }

  get about() {
    return this._about;
  }

  get webSite() {
    return this._webSite;
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

  get birthDate() {
    return this._birthDate;
  }
}
export default UserStore;
