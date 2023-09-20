import { makeAutoObservable } from "mobx";

class InfoMessageStore {
  constructor() {
    this._textMessage = "";
    this._infoMessageVisible = false;
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

  get textMessage() {
    return this._textMessage;
  }

  get infoMessageVisible() {
    return this._infoMessageVisible;
  }
}
export default InfoMessageStore;
