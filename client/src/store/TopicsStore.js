import { makeAutoObservable } from "mobx";

class TopicsStore {
  constructor() {
    this._topics = [];
    makeAutoObservable(this);
  }
  setTopics(topics) {
    this._topics = topics;
  }
  get topics() {
    return this._topics;
  }
}
export default TopicsStore;
