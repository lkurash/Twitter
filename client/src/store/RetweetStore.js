import { makeAutoObservable } from "mobx";

class RetweetsStore {
  constructor() {
    this._hoverTweetRetweet = {};
    this._tweetRetweet = {};
    makeAutoObservable(this);
  }

  setTweetRetweet(tweet) {
    this._tweetRetweet = tweet;
  }

  sethoverTweetRetweet(tweet) {
    this._hoverTweetRetweet = tweet;
  }

  get hoverTweetRetweet() {
    return this._hoverTweetRetweet;
  }

  get tweetRetweet() {
    return this._tweetRetweet;
  }
}
export default RetweetsStore;
