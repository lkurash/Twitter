import { makeAutoObservable } from "mobx";

class TrendsStore {
  constructor() {
    this._trends = [];
    this._trensTwits = [];
    makeAutoObservable(this);
  }

  setTrends(trends) {
    if (trends.length !== 0) {
      this._trends = trends;
    } else {
      this._trends = false;
    }
  }

  setTrendsTwits(twits) {
    this._trensTwits = twits;
  }

  get trends() {
    return this._trends;
  }

  get trensTwits() {
    return this._trensTwits;
  }
}
export default TrendsStore;
