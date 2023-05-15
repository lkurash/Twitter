import { makeAutoObservable } from "mobx";

class TwitsStore {
  constructor() {
    this._twits = [];
    this._userTwits = [];
    this._likedTwit = {};
    this._hoverTwitLike = {};
    this._hoverTwitComment = {};
    this._activeTwitComment = {};
    this._hoverTwitBookmark = {};
    this._favoriteTwit = {};
    this._deleteFavoriteTwit = {};
    this._dislikeTwit = {};
    makeAutoObservable(this);
  }

  setTwits(twit) {
    this._twits = twit;
  }

  setUserTwits(twits) {
    this._userTwits = twits;
  }

  setLikedTwit(twit) {
    this._likedTwit = twit;
  }

  sethoverTwitLike(twit) {
    this._hoverTwitLike = twit;
  }

  sethoverTwitComment(twit) {
    this._hoverTwitComment = twit;
  }

  setActiveTwitComment(twit) {
    this._activeTwitComment = twit;
  }

  sethoverTwitBookmark(twit) {
    this._hoverTwitBookmark = twit;
  }

  setDislikeTwit(twit) {
    this._dislikeTwit = twit;
  }

  setFavoriteTwit(twit) {
    this._favoriteTwit = twit;
  }

  setDeleteFavoriteTwit(twit) {
    this._deleteFavoriteTwit = twit;
  }

  get twits() {
    return this._twits;
  }

  get userTwits() {
    return this._userTwits;
  }

  get likedTwit() {
    return this._likedTwit;
  }

  get hoverTwitLike() {
    return this._hoverTwitLike;
  }

  get hoverTwitComment() {
    return this._hoverTwitComment;
  }

  get hoverTwitBookmark() {
    return this._hoverTwitBookmark;
  }

  get dislikeTwit() {
    return this._dislikeTwit;
  }

  get favoriteTwit() {
    return this._favoriteTwit;
  }

  get deleteFavoriteTwit() {
    return this._deleteFavoriteTwit;
  }

  get activeTwitComment() {
    return this._activeTwitComment;
  }
}
export default TwitsStore;
