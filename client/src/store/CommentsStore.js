import { makeAutoObservable } from "mobx";

class CommentsStore {
  constructor() {
    this._hoverButtonComment = {};
    this._activeComment = {};
    makeAutoObservable(this);
  }

  setHoverButtonComment(tweet) {
    this._hoverButtonComment = tweet;
  }

  setActiveComment(tweet) {
    this._activeComment = tweet;
  }

  get hoverButtonComment() {
    return this._hoverButtonComment;
  }

  get activeComment() {
    return this._activeComment;
  }
}
export default CommentsStore;
