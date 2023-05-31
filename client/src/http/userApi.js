import { $authHost, $host } from ".";

export const authorization = async (email, password) => {
  const response = await $host.post("api/user/login", { email, password });

  return localStorage.setItem("token", response.data.token);
};

export const registration = async (name, email, password, birthdate) => {
  const response = await $host.post("api/user/registration", {
    name,
    email,
    password,
    birthdate,
  });

  return localStorage.setItem("token", response.data.token);
};

export const checkToken = async () => {
  const response = await $authHost.get("api/user/auth");

  return localStorage.setItem("token", response.data.token);
};

export const getUserInfo = async (email) => {
  const userInfo = await $authHost.get("api/user/home", email);

  return userInfo.data;
};

export const updateUserProfile = async (user) => {
  const userProfile = await $authHost.post("api/user/profile", user);

  return userProfile.data;
};
export const getAllUsers = async () => {
  const users  = await $host.get("api/user/allUsers");

  return users.data;
};
export const getUserById = async (id) => {
  const userById = await $authHost.get(`api/user/${id}`);

  return userById.data;
};
export const createFollow = async (followUserId) => {
  const following = await $authHost.post("api/user/following", { followUserId });

  return following.data;
};
export const deleteFollow = async (followUserId) => {
  const unFollow = await $authHost.post("api/user/deleteFollowing", {
    followUserId,
  });

  return unFollow.data;
};
export const getFollowingUser = async (id) => {
  const allFollowing = await $authHost.get(`api/user/following/${id}`);

  return allFollowing.data;
};
export const getFollowersUser = async (id) => {
  const allFollowers = await $authHost.get(`api/user/followers/${id}`);

  return allFollowers.data;
};
