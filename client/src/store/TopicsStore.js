import { makeAutoObservable } from "mobx";

class TopicsStore {
  constructor() {
    this._topics = [];
    makeAutoObservable(this);
  }
  setTopics(topics) {
    if (topics.length !== 0) {
       this._topics = topics;
    } else {
      this._topics = false;
    }
  }
  get topics() {
    return this._topics;
  }
}
export default TopicsStore;
