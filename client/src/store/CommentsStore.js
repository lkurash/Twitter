import { makeAutoObservable } from "mobx";

class CommentsStore {
  constructor() {
    this._comments = [];
    makeAutoObservable(this);
  }

  setComments(comments) {
    this._comments = comments;
  }

  get comments() {
    return this._comments;
  }
}
export default CommentsStore;
