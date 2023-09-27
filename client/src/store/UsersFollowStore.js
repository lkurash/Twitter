import { makeAutoObservable } from "mobx";

class UsersFollowStore {
  constructor() {
    this._userFollowing = [];
    this._userFollowers = [];
    this._unfollowUsersIds = [];
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

  setUnfollowUsersIds(id) {
    this._unfollowUsersIds = id;
  }

  setStartFollowUser(user) {
    this._startFollowUser = user;
  }

  setHoverFollowUser(user) {
    this._hoverFollowUser = user;
  }

  deleteIdInUnfollowListIds(id) {
    let unFollowId = this._unfollowUsersIds.indexOf(id);

    return this._unfollowUsersIds.splice(unFollowId, 1);
  }

  deleteFollowUserInFollowList(followingUserId) {
    this._userFollowers.forEach((following) => {
      if (following.id === followingUserId) {
        following.following = false;
      }
    });
    
    this._userFollowing.forEach((following) => {
      if (following.id === followingUserId) {
        following.following = false;
      }
    });
  }

  createFollowUserInFollowList(followingUserId) {
    this._userFollowers.forEach((following) => {
      if (following.id === followingUserId) {
        following.following = true;
      }
    });

    this._userFollowing.forEach((following) => {
      if (following.id === followingUserId) {
        following.following = true;
      }
    });
  }

  get userFollowing() {
    return this._userFollowing;
  }

  get userFollowers() {
    return this._userFollowers;
  }

  get unfollowUsersIds() {
    return this._unfollowUsersIds;
  }

  get startFollowUser() {
    return this._startFollowUser;
  }

  get hoverFollowUser() {
    return this._hoverFollowUser;
  }
}
export default UsersFollowStore;
