import { makeAutoObservable } from "mobx";

class RetwitsStore {
  constructor() {
    this._hoverTwitRetwit = {};
    makeAutoObservable(this);
  }

  sethoverTwitRetwit(twit) {
    this._hoverTwitRetwit = twit;
  }

  get hoverTwitRetwit() {
    return this._hoverTwitRetwit;
  }
}
export default RetwitsStore;
