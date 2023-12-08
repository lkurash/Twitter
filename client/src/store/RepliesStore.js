import { makeAutoObservable } from "mobx";

class RepliesStore {
  constructor() {
    this._hoverButtonReplies = {};
    this._activeRepliesOnTweet = {};
    makeAutoObservable(this);
  }

  setHoverButtonReplies(tweet) {
    this._hoverButtonReplies = tweet;
  }

  setActiveRepliesOnTweet(tweet) {
    this._activeRepliesOnTweet = tweet;
  }

  get hoverButtonReplies() {
    return this._hoverButtonReplies;
  }

  get activeRepliesOnTweet() {
    return this._activeRepliesOnTweet;
  }
}
export default RepliesStore;
