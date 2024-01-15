import { makeAutoObservable } from "mobx";

class InfoMessageStore {
  constructor() {
    this._textMessage = "";
    this._infoMessageVisible = false;
    this._textErrorMessage = "";
    this._errorVisible = false;
    makeAutoObservable(this);
  }

  setTextMessage(text) {
    if (text) {
      this._textMessage = text;
    }
  }

  setInfoMessageVisible(visible) {
    this._infoMessageVisible = visible;
  }

  setTextErrorMessage(text) {
    this._textErrorMessage = text;
  }

  setErrorVisible(visible) {
    this._errorVisible = visible;
  }

  get textMessage() {
    return this._textMessage;
  }

  get infoMessageVisible() {
    return this._infoMessageVisible;
  }

  get textErrorMessage() {
    return this._textErrorMessage;
  }

  get errorVisible() {
    return this._errorVisible;
  }
}
export default InfoMessageStore;
