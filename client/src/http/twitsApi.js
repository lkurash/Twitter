import { $authHost, $host } from ".";

export const createTwitByUser = async (twit) => {
  const newTwit = await $authHost.post("api/twits/twit", twit);

  return newTwit.data;
};

export const getAllTwits = async () => {
  const alltwits = await $host.get("api/twits");

  return alltwits.data;
};

export const getTwitsByUser = async (userId) => {
  const usersTwits = await $authHost.get(`api/twits/user/${userId}`);

  return usersTwits.data;
};

export const createLikeTwitByUser = async (userId, twitId) => {
  const usersTwitsLikes = await $authHost.post(
    `api/twits/twit/${twitId}/user/${userId}/likes`
  );

  return usersTwitsLikes.data;
};

export const createRetwitByUser = async (userId, twitId) => {
  const retwitByUser = await $authHost.post(
    `api/twits/twit/${twitId}/user/${userId}/retwits`
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
export const getRetwitsByUser = async (userId) => {
  const retwitsByUser = await $authHost.get(`api/twits/user/${userId}/retwits`);

  return retwitsByUser.data;
};
export const deleteTwitByUser = async (twitId) => {
  const twit = await $authHost.delete(`api/twits/${twitId}`);

  return twit.data;
};
