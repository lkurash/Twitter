import { $authHost, $host } from ".";

export const createTwitByUser = async (twit) => {
  const newTwit = await $authHost.post("api/twits/createtwit", twit);

  return newTwit.data;
};

export const getAllTwits = async () => {
  const alltwits = await $host.get("api/twits/alltwits");

  return alltwits.data;
};

export const getTwitsByUser = async (id) => {
  if (id) {
    const twitsById = await $authHost.get(`api/twits/userTwits/${id}`);

    return twitsById.data;
  }

  const twitsById = await $authHost.get(`api/twits/userTwits`);

  return twitsById.data;
};

export const createLikeTwitByUser = async (id) => {
  const like = await $authHost.post("api/twits/like", id);

  return like.data;
};

export const createRetwitByUser = async (id) => {
  const retwitByUser = await $authHost.post("api/twits/retwit", id);

  return retwitByUser.data;
};

export const createFavoriteTwitByUser = async (id) => {
  const favoriteTwit = await $authHost.post("api/twits/bookmarks", id);

  return favoriteTwit.data;
};
export const createCommentTwitByUser = async (TwitId, text) => {
  const comment = await $authHost.post("api/twits/comment", { TwitId, text });

  return comment.data;
};
export const getCommentsByUser = async (id) => {
  const comments = await $authHost.get(`api/twits/allUserComments/${id}`);

  return comments.data;
};
export const getFavoriteTwits = async () => {
  const favoriteTwits = await $authHost.get("api/twits/allUserBookmarks");

  return favoriteTwits.data;
};
export const getRetwitsByUser = async (id) => {
  const retwitsByUser = await $authHost.get(`api/twits/allUserRetwits/${id}`);

  return retwitsByUser.data;
};
export const deleteTwitByUser = async (id) => {
  const twit = await $authHost.post("api/twits/deleteTwit", { id });

  return twit.data;
};
