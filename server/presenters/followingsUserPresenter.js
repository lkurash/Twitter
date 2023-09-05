class FollowingsUserPresenter {
  constructor(users) {
    this.users = users;
    this.followingsUser = {};
    this.followingsUsers = [];
  }

  toJSON() {
    this.users.forEach((user) => {
      this.followingsUser = {
        id: user.user.id,
        user_name: user.user.user_name,
        photo: user.user.photo,
        following: true,
      };
      this.followingsUsers.push(this.followingsUser);
    });
    return this.followingsUsers;
  }
}

module.exports = FollowingsUserPresenter;
