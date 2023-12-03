import { makeAutoObservable } from "mobx";

class TweetsStore {
  constructor() {
    this._likedTweet = {};
    this._hoverTweetLike = {};
    this._dislikeTweet = {};
    makeAutoObservable(this);
  }

  setLikedTweet(tweet) {
    this._likedTweet = tweet;
  }

  sethoverTweetLike(tweet) {
    this._hoverTweetLike = tweet;
  }

  setDislikeTweet(tweet) {
    this._dislikeTweet = tweet;
  }

  get likedTweet() {
    return this._likedTweet;
  }

  get hoverTweetLike() {
    return this._hoverTweetLike;
  }

  get dislikeTweet() {
    return this._dislikeTweet;
  }
}
export default TweetsStore;
