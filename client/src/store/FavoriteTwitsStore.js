import { makeAutoObservable } from "mobx";

class FavoriteTwitsStore {
  constructor() {
    this._favoriteTwits = [];
    this._hoverTwitBookmark = {};
    this._newTwitBookmark = {};
    this._notActiveFavoriteTwit = {};
    makeAutoObservable(this);
  }

  setFavoriteTwits(twits) {
    if (twits.length !== 0) {
      this._favoriteTwits = twits;
    } else {
      this._favoriteTwits = false;
    }
  }

  setHoverTwitBookmark(twit) {
    this._hoverTwitBookmark = twit;
  }

  setNewTwitBookmark(twit) {
    this._newTwitBookmark = twit;
  }

  setNotActiveFavoriteTwit(twit) {
    this._notActiveFavoriteTwit = twit;
  }

  get favoriteTwits() {
    return this._favoriteTwits;
  }

  get hoverTwitBookmark() {
    return this._hoverTwitBookmark;
  }

  get notActiveFavoriteTwit() {
    return this._notActiveFavoriteTwit;
  }
}
export default FavoriteTwitsStore;
