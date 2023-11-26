import { $authClient, $client } from "./clients";

class TwitAPI {
  async createTwitByUser(twit) {
    const newTwit = await $authClient.post("api/twits/twit", twit);

    return newTwit.data;
  }

  async getAllTwits(limit, list) {
    const alltwits = await $client.get(`api/twits/`, {
      params: { limit, list },
    });

    return alltwits.data;
  }

  async getTwitsByUser(userId, limit, list) {
    const usersTwits = await $authClient.get(`api/twits/auth/user/${userId}`, {
      params: { limit, list },
    });

    return usersTwits.data;
  }

  async getPublicTwitsByUser(userId, limit, list) {
    const usersTwits = await $client.get(`api/twits/user/${userId}`, {
      params: { limit, list },
    });

    return usersTwits.data;
  }

  async getTwitsByFollowingsUsers(userId, limit, list) {
    const twits = await $authClient.get(`api/twits/following/user/${userId}`, {
      params: { limit, list },
    });

    return twits.data;
  }

  async createLikeTwitByUser(userId, twitId) {
    const usersTwitsLikes = await $authClient.post(
      `api/twits/twit/${twitId}/user/${userId}/likes`
    );

    return usersTwitsLikes.data;
  }

  async createRetwitByUser(userId, twitId, twit) {
    const retwitByUser = await $authClient.post(
      `api/twits/twit/${twitId}/user/${userId}/retwits`,
      twit
    );

    return retwitByUser.data;
  }

  async createFavoriteTwitByUser(userId, twitId) {
    const favoriteTwit = await $authClient.post(
      `api/twits/twit/${twitId}/user/${userId}/bookmarks`
    );

    return favoriteTwit.data;
  }

  async deleteFavoriteTwitByUser(userId, twitId) {
    const deletedBookmark = await $authClient.post(
      `api/twits/bookmarks/twit/${twitId}/user/${userId}`
    );

    return deletedBookmark.data;
  }

  async createCommentTwitByUser(userId, twitId, text) {
    const comment = await $authClient.post(
      `api/twits/twit/${twitId}/user/${userId}/comments`,
      { text }
    );

    return comment.data;
  }

  async getCommentsByUser(userId, limit, list) {
    const comments = await $authClient.get(
      `api/twits/user/${userId}/comments`,
      {
        params: { limit, list },
      }
    );

    return comments.data;
  }

  async getFavoriteTwits(userId, limit, list) {
    const favoriteTwits = await $authClient.get(
      `api/twits/user/${userId}/bookmarks`,
      {
        params: { limit, list },
      }
    );

    return favoriteTwits.data;
  }

  async getCountRetwits(twitId) {
    const countRetwits = await $authClient.put(
      `api/twits/twit/${twitId}/retwits`
    );

    return countRetwits.data;
  }

  async deleteLike(userId, twitId) {
    const dislikedTwit = await $authClient.put(
      `api/twits/twit/${twitId}/likes/user/${userId}`
    );
    return dislikedTwit.data;
  }

  async getCountComments(twitId) {
    const countComments = await $authClient.put(
      `api/twits/twit/${twitId}/comments`
    );

    return countComments.data;
  }

  async deleteTwitByUser(twitId) {
    const twit = await $authClient.delete(`api/twits/twit/${twitId}`);

    return twit.data;
  }

  async getTwitsForAuthUser(userId, limit, list) {
    const twitsIds = await $authClient.get(`api/twits/authUser/${userId}`, {
      params: { limit, list },
    });

    return twitsIds.data;
  }

  async deleteRetwit(retwitId, userId) {
    const retwit = await $authClient.put(
      `api/twits/retwits/${retwitId}/user/${userId}`
    );

    return retwit.data;
  }

  async getUserTwitsWithMedia(userId, limit, list) {
    const twits = await $authClient.get(`api/twits/user/${userId}/media`, {
      params: { limit, list },
    });

    return twits.data;
  }

  async getTwitsWithUserLikes(userId, limit, list) {
    const twits = await $authClient.get(`api/twits/likes/user/${userId}`, {
      params: { limit, list },
    });

    return twits.data;
  }
}
const twitAPI = new TwitAPI();

export default twitAPI;
