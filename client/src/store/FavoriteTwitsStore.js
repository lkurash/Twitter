import { makeAutoObservable } from "mobx";

class FavoriteTwitsStore {
  constructor() {
    this._favoriteTwits = [];
    this._hoverTwitBookmark = {};
    this._newTwitBookmark = {};
    this._notActiveFavoriteTwit = {};
    this._favoriteTwitsIds = [];
    makeAutoObservable(this);
  }

  setFavoriteTwits(twits) {
    if (twits.length !== 0) {
      this._favoriteTwits = twits;
    } else {
      this._favoriteTwits = false;
    }
  }

  setFavoriteTwitsIds(twits) {
    this._favoriteTwitsIds = twits;
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

  get favoriteTwitsIds() {
    return this._favoriteTwitsIds;
  }

  get hoverTwitBookmark() {
    return this._hoverTwitBookmark;
  }

  get notActiveFavoriteTwit() {
    return this._notActiveFavoriteTwit;
  }

  get newTwitBookmark() {
    return this._newTwitBookmark;
  }
}
export default FavoriteTwitsStore;
