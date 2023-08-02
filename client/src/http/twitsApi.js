import Cookies from "js-cookie";
import { $authHost, $host } from ".";

export const createTwitByUser = async (twit) => {
  const newTwit = await $authHost.post("api/twits/twit", twit);

  return newTwit.data;
};

export const getAllTwits = async (limit, list) => {
  const alltwits = await $host.get(`api/twits/`, { params: { limit, list } });

  return alltwits.data;
};

export const getTwitsByUser = async (userId, limit, list) => {
  const usersTwits = await $authHost.get(`api/twits/user/${userId}`, {
    params: { limit, list },
  });

  return usersTwits.data;
};

export const getTwitsByFollowingsUsers = async (userId, limit, list) => {
  const twits = await $authHost.get(`api/twits/following/user/${userId}`, {
    params: { limit, list },
  });

  return twits.data;
};

export const createLikeTwitByUser = async (userId, twitId) => {
  const usersTwitsLikes = await $authHost.post(
    `api/twits/twit/${twitId}/user/${userId}/likes`
  );

  return usersTwitsLikes.data;
};

export const createRetwitByUser = async (userId, twitId, twit) => {
  const retwitByUser = await $authHost.post(
    `api/twits/twit/${twitId}/user/${userId}/retwits`,
    twit
  );

  return retwitByUser.data;
};

export const createFavoriteTwitByUser = async (userId, twitId) => {
  const favoriteTwit = await $authHost.post(
    `api/twits/twit/${twitId}/user/${userId}/bookmarks`
  );

  return favoriteTwit.data;
};

export const createCommentTwitByUser = async (userId, twitId, text) => {
  const comment = await $authHost.post(
    `api/twits/twit/${twitId}/user/${userId}/comments`,
    {
      text,
    }
  );

  return comment.data;
};

export const getCommentsByUser = async (userId) => {
  const comments = await $authHost.get(`api/twits/user/${userId}/comments`);

  return comments.data;
};

export const getFavoriteTwits = async (userId) => {
  const favoriteTwits = await $authHost.get(
    `api/twits/user/${userId}/bookmarks`
  );

  return favoriteTwits.data;
};

export const getCountRetwits = async (twitId) => {
  const countRetwits = await $authHost.put(`api/twits/twit/${twitId}/retwits`);

  return countRetwits.data;
};

export const getCountLikes = async (twitId) => {
  const countLikes = await $authHost.put(`api/twits/twit/${twitId}/likes`);

  return countLikes.data;
};

export const getCountComments = async (twitId) => {
  const countComments = await $authHost.put(
    `api/twits/twit/${twitId}/comments`
  );

  return countComments.data;
};

export const deleteTwitByUser = async (twitId) => {
  const twit = await $authHost.delete(`api/twits/twit/${twitId}`);

  return twit.data;
};
