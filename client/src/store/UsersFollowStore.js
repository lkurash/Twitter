import { makeAutoObservable } from "mobx";

class UsersFollowStore {
  constructor() {
    this._hoverFollowUser = [];
    this._startFollowUser = [];
    makeAutoObservable(this);
  }

  setStartFollowUser(user) {
    this._startFollowUser = user;
  }

  setHoverFollowUser(user) {
    this._hoverFollowUser = user;
  }

  get startFollowUser() {
    return this._startFollowUser;
  }

  get hoverFollowUser() {
    return this._hoverFollowUser;
  }
}
export default UsersFollowStore;
