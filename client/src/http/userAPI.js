import { $authClient, $client } from "./clients";

class UserAPI {
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

  async updateUserProfile(userId, updateUser) {
    const userProfile = await $authClient.put(
      `api/users/${userId}`,
      updateUser
    );

    return userProfile.data;
  }

  async getUsers() {
    const users = await $client.get("api/users");

    return users.data;
  }

  async getSearchUsers(name) {
    const users = await $authClient.get(`api/users/user/${name}`);

    return users.data;
  }

  async getUserProfile(userId) {
    const userById = await $authClient.get(`api/users/${userId}`);

    return userById.data;
  }

  async createFollowings(userId, followUserId) {
    const followings = await $authClient.post(
      `api/users/${userId}/followings`,
      {
        followUserId,
      }
    );

    return followings.data;
  }

  async deleteFollowings(userId, followUserId) {
    const unFollowings = await $authClient.delete(
      `api/users/${userId}/unfollow/${followUserId}`
    );

    return unFollowings.data;
  }

  async getFollowingsUser(userId) {
    const followings = await $authClient.get(`api/users/${userId}/followings`);

    return followings.data;
  }

  async getPreviewProfile(userId, authUserId) {
    const followings = await $authClient.get(`api/users/following/${userId}`, {
      params: { authUserId },
    });

    return followings.data;
  }

  async getFollowersUser(userId) {
    const followers = await $authClient.get(`api/users/${userId}/followers`);

    return followers.data;
  }

  async getWhoNotReadingUsers(userId) {
    const followers = await $authClient.get(`api/users/${userId}/nofollowings`);

    return followers.data;
  }
}

const userAPI = new UserAPI();

export default userAPI;
