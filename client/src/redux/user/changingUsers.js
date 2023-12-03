class ChangingUsers {
  deleteFollowInFollowingsList(users, userFollowingId) {
    users.map((user) => {
      if (user.id === userFollowingId) {
        user.following = false;
      }

      return users;
    });
    return users;
  }

  createFollowInFollowingsList(users, userFollowingId) {
    users.map((user) => {
      if (user.id === userFollowingId) {
        user.following = true;
      }

      return users;
    });
    return users;
  }

  deleteFollowInFollowersList(users, userFollowingId) {
    users.map((user) => {
      if (user.id === userFollowingId) {
        user.following = false;
      }
      return users;
    });
    return users;
  }

  createFollowInFollowersList(users, userFollowingId) {
    users.map((user) => {
      if (user.id === userFollowingId) {
        user.following = true;
      }
      return users;
    });
    return users;
  }

  deleteUserInListWhoNotReading(users, id) {
    let userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
    }

    return users;
  }

  changeFollow(userInfo) {
    userInfo.following = !userInfo.following;

    return userInfo;
  }
}
export const changingUsers = new ChangingUsers();
