import { makeAutoObservable } from "mobx";

class VisiblePopUpStore {
  constructor() {
    this._loginPage = false;
    this._signUpPage = false;
    makeAutoObservable(this);
  }

  setSignPageUpVisible(visible) {
    this._signUpPage = visible;
  }

  setLoginPageVisible(visible) {
    this._loginPage = visible;
  }

  get loginPage() {
    return this._loginPage;
  }

  get signUpPage() {
    return this._signUpPage;
  }
}

export default VisiblePopUpStore;
