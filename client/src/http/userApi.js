import { $authHost, $host } from ".";

class UserApi {
  async register(name, email, password, birthdate) {
    const response = await $host.post("api/users/registration", {
      name,
      email,
      password,
      birthdate,
    });

    return response.data;
  }

  async authentication(email, password) {
    const response = await $host.post("api/users/login", {
      email,
      password,
    });

    return response.data;
  }

  async createRefreshToken() {
    const response = await $authHost.get("api/users/auth");

    return response.data;
  }

  async updateUserProfile(id, updateUser) {
    const userProfile = await $authHost.put(`api/users/${id}`, updateUser);

    return userProfile.data.user;
  }

  async getAllUsers() {
    const users = await $host.get("api/users");

    return users.data;
  }

  async getSearchUsers(name) {
    const users = await $authHost.get(`api/users/user/${name}`);

    return users.data;
  }

  async getUserById(id) {
    const userById = await $authHost.get(`api/users/${id}`);

    return userById.data;
  }

  async createFollowings(id, followUserId) {
    const followings = await $authHost.post(`api/users/${id}/followings`, {
      followUserId,
    });

    return followings.data;
  }

  async deleteFollowings(id, followUserId) {
    const unFollowings = await $authHost.delete(
      `api/users/${id}/unfollow/${followUserId}`
    );

    return unFollowings.data;
  }

  async getFollowingUsers(id) {
    const followings = await $authHost.get(`api/users/${id}/followings`);

    return followings.data;
  }

  async getFollowerUsers(id) {
    const followers = await $authHost.get(`api/users/${id}/followers`);

    return followers.data;
  }
}

const userApi = new UserApi();

export default userApi;
