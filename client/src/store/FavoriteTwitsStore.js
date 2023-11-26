import { makeAutoObservable } from "mobx";

class FavoriteTwitsStore {
  constructor() {
    this._hoverTwitBookmark = {};
    this._notActiveFavoriteTwit = {};
    makeAutoObservable(this);
  }

  setHoverTwitBookmark(twit) {
    this._hoverTwitBookmark = twit;
  }

  setNotActiveFavoriteTwit(twit) {
    this._notActiveFavoriteTwit = twit;
  }

  get hoverTwitBookmark() {
    return this._hoverTwitBookmark;
  }

  get notActiveFavoriteTwit() {
    return this._notActiveFavoriteTwit;
  }
}
export default FavoriteTwitsStore;
