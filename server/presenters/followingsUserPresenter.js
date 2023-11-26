class FollowingsUserPresenter {
  constructor(users) {
    this.users = users;
    this.followingsUser = {};
    this.followingsUsers = [];
  }

  toJSON() {
    this.users.forEach((user) => {
      this.followingsUser = {
        id: user.followUser.id,
        user_name: user.followUser.user_name,
        photo: user.followUser.photo,
        following: user.followUser.followers_user.id != null,
      };
      this.followingsUsers.push(this.followingsUser);
    });
    return this.followingsUsers;
  }
}

module.exports = FollowingsUserPresenter;
