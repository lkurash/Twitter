import { makeAutoObservable } from "mobx";

class RetwitsStore {
  constructor() {
    this._retwits = [];
    this._hoverTwitRetwit = {};
    this._deleteRetwit = {};
    this._retwitTwit = {};
    this._userRetwits = [];
    makeAutoObservable(this);
  }

  setRetwits(retwits) {
    this._retwits = retwits;
  }

  setRetwitTwit(twit) {
    this._retwitTwit = twit;
  }

  setDeleteRetwit(twit) {
    this._deleteRetwit = twit;
  }

  sethoverTwitRetwit(twit) {
    this._hoverTwitRetwit = twit;
  }

  setUserRetwits(retwit) {
    this._userRetwits = retwit;
  }

  get retwits() {
    return this._retwits;
  }

  get hoverTwitRetwit() {
    return this._hoverTwitRetwit;
  }

  get deleteRetwit() {
    return this._deleteRetwit;
  }

  get retwitTwit() {
    return this._retwitTwit;
  }

  get userRetwits() {
    return this._userRetwits;
  }
}
export default RetwitsStore;
