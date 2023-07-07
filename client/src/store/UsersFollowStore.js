import { makeAutoObservable } from "mobx";

class UsersFollowStore {
  constructor() {
    this._userFollowing = [];
    this._userFollowers = [];
    this._unfollowUser = [];
    this._hoverFollowUser = [];
    this._startFollowUser = [];
    makeAutoObservable(this);
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
export default UsersFollowStore;
