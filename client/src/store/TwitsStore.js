import { makeAutoObservable } from "mobx";

class TwitsStore {
  constructor() {
    this._likedTwit = {};
    this._hoverTwitLike = {};
    this._dislikeTwit = {};
    makeAutoObservable(this);
  }

  setLikedTwit(twit) {
    this._likedTwit = twit;
  }

  sethoverTwitLike(twit) {
    this._hoverTwitLike = twit;
  }

  setDislikeTwit(twit) {
    this._dislikeTwit = twit;
  }

  get likedTwit() {
    return this._likedTwit;
  }

  get hoverTwitLike() {
    return this._hoverTwitLike;
  }

  get dislikeTwit() {
    return this._dislikeTwit;
  }
}
export default TwitsStore;
