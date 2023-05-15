import { makeAutoObservable } from "mobx";

class UserStore {
  constructor() {
    this._auth = false;
    this._user = [];
    this._allUsers = [];
    this._userFavoriteTwits = [];
    this._userPage = [];
    this._userFollowing = [];
    this._userFollowers = [];
    this._unfollowUser = [];
    this._hoverFollowUser = [];
    this._startFollowUser = [];
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this._auth = bool;
  }

  setUser(user) {
    this._user = user;
  }

  setUserFavoriteTwits(twits) {
    this._userFavoriteTwits = twits;
  }

  setAllUsers(users) {
    this._allUsers = users;
  }

  setUserPage(user) {
    this._userPage = user;
  }

  setuserFollowing(following) {
    this._userFollowing = following;
  }

  setuserFollowers(followers) {
    this._userFollowers = followers;
  }

  setUnfollowUser(follower) {
    this._unfollowUser = follower;
  }

  setStartFollowUser(user) {
    this._startFollowUser = user;
  }

  setHoverFollowUser(user) {
    this._hoverFollowUser = user;
  }

  get isAuth() {
    return this._auth;
  }

  get user() {
    return this._user;
  }

  get userFavoriteTwits() {
    return this._userFavoriteTwits;
  }

  get allUsers() {
    return this._allUsers;
  }

  get userPage() {
    return this._userPage;
  }

  get userFollowing() {
    return this._userFollowing;
  }

  get userFollowers() {
    return this._userFollowers;
  }

  get unfollowUser() {
    return this._unfollowUser;
  }

  get startFollowUser() {
    return this._startFollowUser;
  }

  get hoverFollowUser() {
    return this._hoverFollowUser;
  }
}
export default UserStore;
