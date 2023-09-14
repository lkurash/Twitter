import { $authClient, $client } from "./clients";

class UserClient {
  async register(name, email, password, birthdate) {
    const response = await $client.post("api/users/registration", {
      name,
      email,
      password,
      birthdate,
    });

    return response.data;
  }

  async authentication(email, password) {
    const response = await $client.post("api/users/login", {
      email,
      password,
    });

    return response.data;
  }

  async createRefreshToken() {
    const response = await $authClient.get("api/users/auth");

    return response.data;
  }

  async updateUserProfile(id, updateUser) {
    const userProfile = await $authClient.put(`api/users/${id}`, updateUser);

    return userProfile.data.user;
  }

  async getUsers() {
    const users = await $client.get("api/users");

    return users.data;
  }

  async getSearchUsers(name) {
    const users = await $authClient.get(`api/users/user/${name}`);

    return users.data;
  }

  async getUserProfile(id) {
    const userById = await $authClient.get(`api/users/${id}`);

    return userById.data;
  }

  async createFollowings(id, followUserId) {
    const followings = await $authClient.post(`api/users/${id}/followings`, {
      followUserId,
    });

    return followings.data;
  }

  async deleteFollowings(id, followUserId) {
    const unFollowings = await $authClient.delete(
      `api/users/${id}/unfollow/${followUserId}`
    );

    return unFollowings.data;
  }

  async getFollowingsUser(id) {
    const followings = await $authClient.get(`api/users/${id}/followings`);

    return followings.data;
  }

  async getFollowersUser(id) {
    const followers = await $authClient.get(`api/users/${id}/followers`);

    return followers.data;
  }

  async getWhoNotReadingUsers(id) {
    const followers = await $authClient.get(`api/users/${id}/nofollowings`);

    return followers.data;
  }
}

const userClient = new UserClient();

export default userClient;
