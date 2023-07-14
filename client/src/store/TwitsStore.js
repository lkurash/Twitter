import { makeAutoObservable } from "mobx";

class TwitsStore {
  constructor() {
    this._twits = [];
    this._twitsWhoReading = false;
    this._userTwits = [];
    this._likedTwit = {};
    this._hoverTwitLike = {};
    this._dislikeTwit = {};
    makeAutoObservable(this);
  }

  setTwits(twits) {
    if (twits.length !== 0) {
      this._twits = twits;
    } else {
      this._twits = false;
    }
  }

  setUserTwits(twits) {
    if (twits.length !== 0) {
      this._userTwits = twits;
    } else {
      this._userTwits = false;
    }
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
  
  setTwitsWhoReading(bool) {
    this._twitsWhoReading = bool;
  }

  get twits() {
    return this._twits;
  }

  get userTwits() {
    return this._userTwits;
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

  get twitsWhoReading() {
    return this._twitsWhoReading;
  }
}
export default TwitsStore;
