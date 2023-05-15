import { makeAutoObservable } from "mobx";

class FavoriteTwitsStore {
  constructor() {
    this._favoriteTwits = [];
    this._hoverTwitBookmark = {};
    this._notActiveFavoriteTwit = {};
    makeAutoObservable(this);
  }

  setFavoriteTwits(twit) {
    this._favoriteTwits = twit;
  }

  setHoverTwitBookmark(twit) {
    this._hoverTwitBookmark = twit;
  }
  
  sethoverTwitRetwit(twit) {
    this._hoverTwitRetwit = twit;
  }

  get favoriteTwits() {
    return this._favoriteTwits;
  }

  get hoverTwitBookmark() {
    return this._hoverTwitBookmark;
  }
}
export default FavoriteTwitsStore;
