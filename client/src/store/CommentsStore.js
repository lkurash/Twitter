import { makeAutoObservable } from "mobx";

class CommentsStore {
  constructor() {
    this._hoverButtonComment = {};
    this._activeComment = {};
    makeAutoObservable(this);
  }

  setHoverButtonComment(twit) {
    this._hoverButtonComment = twit;
  }

  setActiveComment(twit) {
    this._activeComment = twit;
  }

  get hoverButtonComment() {
    return this._hoverButtonComment;
  }

  get activeComment() {
    return this._activeComment;
  }
}
export default CommentsStore;
