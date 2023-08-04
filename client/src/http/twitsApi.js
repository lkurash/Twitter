import { $authHost, $host } from ".";

class TwitsApi {
  async createTwitByUser(twit) {
    const newTwit = await $authHost.post("api/twits/twit", twit);

    return newTwit.data;
  }

  async getAllTwits(limit, list) {
    const alltwits = await $host.get(`api/twits/`, { params: { limit, list } });

    return alltwits.data;
  }

  async getTwitsByUser(userId, limit, list) {
    const usersTwits = await $authHost.get(`api/twits/user/${userId}`, {
      params: { limit, list },
    });

    return usersTwits.data;
  }

  async getTwitsByFollowingsUsers(userId, limit, list) {
    const twits = await $authHost.get(`api/twits/following/user/${userId}`, {
      params: { limit, list },
    });

    return twits.data;
  }

  async createLikeTwitByUser(userId, twitId) {
    const usersTwitsLikes = await $authHost.post(
      `api/twits/twit/${twitId}/user/${userId}/likes`
    );

    return usersTwitsLikes.data;
  }

  async createRetwitByUser(userId, twitId, twit) {
    const retwitByUser = await $authHost.post(
      `api/twits/twit/${twitId}/user/${userId}/retwits`,
      twit
    );

    return retwitByUser.data;
  }

  async createFavoriteTwitByUser(userId, twitId) {
    const favoriteTwit = await $authHost.post(
      `api/twits/twit/${twitId}/user/${userId}/bookmarks`
    );

    return favoriteTwit.data;
  }

  async createCommentTwitByUser(userId, twitId, text) {
    const comment = await $authHost.post(
      `api/twits/twit/${twitId}/user/${userId}/comments`,
      {
        text,
      }
    );

    return comment.data;
  }

  async getCommentsByUser(userId) {
    const comments = await $authHost.get(`api/twits/user/${userId}/comments`);

    return comments.data;
  }

  async getFavoriteTwits(userId) {
    const favoriteTwits = await $authHost.get(
      `api/twits/user/${userId}/bookmarks`
    );

    return favoriteTwits.data;
  }

  async getCountRetwits(twitId) {
    const countRetwits = await $authHost.put(
      `api/twits/twit/${twitId}/retwits`
    );

    return countRetwits.data;
  }

  async getCountLikes(twitId) {
    const countLikes = await $authHost.put(`api/twits/twit/${twitId}/likes`);

    return countLikes.data;
  }

  async getCountComments(twitId) {
    const countComments = await $authHost.put(
      `api/twits/twit/${twitId}/comments`
    );

    return countComments.data;
  }

  async deleteTwitByUser(twitId) {
    const twit = await $authHost.delete(`api/twits/twit/${twitId}`);

    return twit.data;
  }
}
const twitsApi = new TwitsApi();

export default twitsApi;
