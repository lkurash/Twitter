import jwt_decode from "jwt-decode";
import { $authHost, $host } from ".";

export const createTwitByUser = async (twit) => {
  const { data } = await $authHost.post("api/twits/createtwit", twit);

  return data;
};

export const getAllTwits = async () => {
  const { data } = await $host.get("api/twits/alltwits");

  return data;
};

export const getTwitsByUser = async (id) => {
  if (id) {
    const { data } = await $authHost.get(`api/twits/userTwits/${id}`);

    return data;
  }

  const { data } = await $authHost.get(`api/twits/userTwits`);

  return data;
};

export const createLikeTwitByUser = async (id) => {
  const { data } = await $authHost.post("api/twits/like", id);

  return data;
};

export const createRetwitByUser = async (id) => {
  const { data } = await $authHost.post("api/twits/retwit", id);

  return data;
};

export const createFavoriteTwitByUser = async (id) => {
  const { data } = await $authHost.post("api/twits/bookmarks", id);

  return data;
};
export const createCommentTwitByUser = async (TwitId, text) => {
  const { data } = await $authHost.post("api/twits/comment", { TwitId, text });

  return data;
};
export const getCommentsByUser = async (id) => {
  const { data } = await $authHost.get(`api/twits/allUserComments/${id}`);

  return data;
};
export const getFavoriteTwits = async () => {
  const { data } = await $authHost.get("api/twits/allUserBookmarks");

  return data;
};
export const getRetwitsByUser = async (id) => {
  const { data } = await $authHost.get(`api/twits/allUserRetwits/${id}`);

  return data;
};
export const deleteTwitByUser = async (id) => {
  const { data } = await $authHost.post("api/twits/deleteTwit", { id });

  return data;
};
