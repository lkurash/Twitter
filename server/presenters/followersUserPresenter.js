class FollowersUserPresenter {
  constructor(users) {
    this.users = users;
    this.followersUser = {};
    this.followersUsers = [];
  }

  toJSON() {
    this.users.forEach((user) => {
      this.followersUser = {
        id: user.followUser.id,
        user_name: user.followUser.user_name,
        photo: user.followUser.photo,
        following: user.followUser.followers_user.id != null,
      };
      this.followersUsers.push(this.followersUser);
    });
    return this.followersUsers;
  }
}
module.exports = FollowersUserPresenter;
