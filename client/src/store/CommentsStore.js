import { makeAutoObservable } from "mobx";

class CommentsStore {
  constructor() {
    this._comments = [];
    this._hoverButtonComment = {};
    this._activeComment = {};
    makeAutoObservable(this);
  }

  setComments(comments) {
    if (comments.length !== 0) {
      this._comments = comments;
    } else {
      this._comments = false;
    }
  }

  setHoverButtonComment(twit) {
    this._hoverButtonComment = twit;
  }

  setActiveComment(twit) {
    this._activeComment = twit;
  }

  get comments() {
    return this._comments;
  }

  get hoverButtonComment() {
    return this._hoverButtonComment;
  }

  get activeComment() {
    return this._activeComment;
  }
}
export default CommentsStore;
