import jwt_decode from "jwt-decode";
import { $authHost, $host } from ".";

export const authorization = async (email, password) => {
  const { data } = await $host.post("api/user/login", { email, password });

  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const registration = async (name, email, password, birthdate) => {
  const { data } = await $host.post("api/user/registration", {
    name,
    email,
    password,
    birthdate,
  });

  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const checkToken = async () => {
  const { data } = await $authHost.get("api/user/auth");

  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const getUserInfo = async (email) => {
  const { data } = await $authHost.get("api/user/home", email);

  return data;
};

export const updateUserProfile = async (user) => {
  const { data } = await $authHost.post("api/user/profile", user);

  return data;
};
export const getAllUsers = async () => {
  const { data } = await $host.get("api/user/allUsers");

  return data;
};
export const getUserPage = async (id) => {
  const { data } = await $authHost.get(`api/user/${id}`);

  return data;
};
export const createFollow = async (followUserId) => {
  const { data } = await $authHost.post("api/user/following", { followUserId });

  return data;
};
export const deleteFollow = async (followUserId) => {
  const { data } = await $authHost.post("api/user/deleteFollowing", {
    followUserId,
  });

  return data;
};
export const getFollowingUser = async (id) => {
  const { data } = await $authHost.post(`api/user/following/${id}`);

  return data;
};
export const getFollowersUser = async (id) => {
  const { data } = await $authHost.post(`api/user/followers/${id}`);

  return data;
};
