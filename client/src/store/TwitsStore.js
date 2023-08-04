import { makeAutoObservable } from "mobx";

class TwitsStore {
  constructor() {
    this._twits = [];
    this._twitsWhoReading = [];
    this._userTwits = [];
    this._likedTwit = {};
    this._hoverTwitLike = {};
    this._dislikeTwit = {};
    this._twitsIdWithUsersLike = [];
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

  addTwitLike(twitLike) {
    this._twits.map((twit) => {
      if (twit.id === twitLike.id) {
        twit.countLikes = twitLike.countLikes;
      }
      return this._twits;
    });
  }

  addRetwitTwit(retwit) {
    this._twits.map((twit) => {
      if (twit.id === retwit.id) {
        twit.countRetwits = retwit.countRetwits;
      }
      return this._twits;
    });
  }

  deleteRetwit(retwit) {
    let twit = this._twits.findIndex(
      (twit) => twit.twitId === retwit.id && twit.retwit === true
    );
    return this._twits.splice(twit, 1);
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

  setTwitsWhoReading(twits) {
    this._twitsWhoReading = twits;
  }

  setTwitsIdWithUsersLike(ids) {
    this._twitsIdWithUsersLike = ids;
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

  get twitsIdWithUsersLike() {
    return this._twitsIdWithUsersLike;
  }
}
export default TwitsStore;
