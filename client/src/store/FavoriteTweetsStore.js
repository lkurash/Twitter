import { makeAutoObservable } from "mobx";

class FavoriteTweetsStore {
  constructor() {
    this._hoverTweetBookmark = {};
    this._notActiveFavoriteTweet = {};
    this._tweetBookmark = {};
    makeAutoObservable(this);
  }

  setTweetBookmark(tweet) {
    this._tweetBookmark = tweet;
  }

  setHoverTweetBookmark(tweet) {
    this._hoverTweetBookmark = tweet;
  }

  setNotActiveFavoriteTweet(tweet) {
    this._notActiveFavoriteTweet = tweet;
  }

  get hoverTweetBookmark() {
    return this._hoverTweetBookmark;
  }

  get notActiveFavoriteTweet() {
    return this._notActiveFavoriteTweet;
  }

  get tweetBookmark() {
    return this._tweetBookmark;
  }
}
export default FavoriteTweetsStore;
