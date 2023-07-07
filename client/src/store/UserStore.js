import { makeAutoObservable } from "mobx";

class UserStore {
  constructor() {
    this._auth = false;
    this._user = [];
    this._birthDate = "";
    this._allUsers = [];
    this._userPage = [];
    // this._userFollowing = [];
    // this._userFollowers = [];
    // this._unfollowUser = [];
    // this._hoverFollowUser = [];
    // this._startFollowUser = [];
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this._auth = bool;
  }

  setUser(user) {
    this._user = user;
  }

  setAllUsers(users) {
    if (users.length !== 0) {
      this._allUsers = users;
    }else{
      this._allUsers = false;
    }
  }

  setUserPage(user) {
    this._userPage = user;
  }

  // setuserFollowing(following) {
  //   this._userFollowing = following;
  // }

  // setuserFollowers(followers) {
  //   this._userFollowers = followers;
  // }

  // setUnfollowUser(follower) {
  //   this._unfollowUser = follower;
  // }

  // setStartFollowUser(user) {
  //   this._startFollowUser = user;
  // }

  // setHoverFollowUser(user) {
  //   this._hoverFollowUser = user;
  // }

  setBirthDate(birthDate) {
    this._birthDate = birthDate;
  }

  get isAuth() {
    return this._auth;
  }

  get user() {
    return this._user;
  }

  get allUsers() {
    return this._allUsers;
  }

  get userPage() {
    return this._userPage;
  }

  // get userFollowing() {
  //   return this._userFollowing;
  // }

  // get userFollowers() {
  //   return this._userFollowers;
  // }

  // get unfollowUser() {
  //   return this._unfollowUser;
  // }

  // get startFollowUser() {
  //   return this._startFollowUser;
  // }

  // get hoverFollowUser() {
  //   return this._hoverFollowUser;
  // }

  get birthDate() {
    return this._birthDate;
  }
}
export default UserStore;
