import { $authHost, $host } from ".";
const Cookies = require("js-cookie");

export const register = async (name, email, password, birthdate) => {
  const response = await $host.post("api/users/registration", {
    name,
    email,
    password,
    birthdate,
  });

  localStorage.setItem("token", response.data.token);
  return response.data.user;
};

export const authentication = async (email, password) => {
  const response = await $host.post("api/users/login", {
    email,
    password,
  });

  localStorage.setItem("token", response.data.token);
  Cookies.set("token", response.data.token);

  return response.data.user;
};

export const refreshToken = async () => {
  const response = await $authHost.get("api/users/auth");

  Cookies.set("refreshToken", response.data.token, { expires: 0.1 });

  return response.data.token;
};

export const updateUserProfile = async (id, updateUser) => {
  const userProfile = await $authHost.put(`api/users/${id}`, updateUser);

  return userProfile.data.user;
};

export const getAllUsers = async () => {
  const users = await $host.get("api/users");

  return users.data;
};

export const getUserById = async (id) => {
  const userById = await $authHost.get(`api/users/${id}`);

  return userById.data;
};

export const createFollowings = async (id, followUserId) => {
  const followings = await $authHost.post(`api/users/${id}/followings`, {
    followUserId,
  });

  return followings.data;
};

export const deleteFollowings = async (id, followUserId) => {
  const unFollowings = await $authHost.delete(
    `api/users/${id}/unfollow/${followUserId}`
  );

  return unFollowings.data;
};

export const getFollowingUsers = async (id) => {
  const followings = await $authHost.get(`api/users/${id}/followings`);

  return followings.data;
};

export const getFollowerUsers = async (id) => {
  const followers = await $authHost.get(`api/users/${id}/followers`);

  return followers.data;
};
