import { makeAutoObservable } from "mobx";

class RetwitsStore {
  constructor() {
    this._retwits = [];
    this._hoverTwitRetwit = {};
    this._deleteRetwit = {};
    this._retwitTwit = {};
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
}
export default RetwitsStore;
