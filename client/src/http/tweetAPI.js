import { $authClient, $client } from "./clients";

class TweetAPI {
  async createTweetByUser(tweet) {
    const newTweet = await $authClient.post("api/tweets/tweet", tweet);

    return newTweet.data;
  }

  async getAllTweets(limit, list) {
    const alltweets = await $client.get(`api/tweets/`, {
      params: { limit, list },
    });

    return alltweets.data;
  }

  async getTweetsByUser(userId, limit, list) {
    const usersTweets = await $authClient.get(
      `api/tweets/auth/user/${userId}`,
      {
        params: { limit, list },
      }
    );

    return usersTweets.data;
  }

  async getPublicTweetsByUser(userId, limit, list) {
    const usersTweets = await $client.get(`api/tweets/user/${userId}`, {
      params: { limit, list },
    });

    return usersTweets.data;
  }

  async getTweetsByFollowingsUsers(userId, limit, list) {
    const tweets = await $authClient.get(
      `api/tweets/following/user/${userId}`,
      {
        params: { limit, list },
      }
    );

    return tweets.data;
  }

  async createLikeTweetByUser(userId, tweetId) {
    const usersTweetsLikes = await $authClient.post(
      `api/tweets/tweet/${tweetId}/user/${userId}/likes`
    );

    return usersTweetsLikes.data;
  }

  async createRetweetByUser(userId, tweetId, tweet) {
    const retweetByUser = await $authClient.post(
      `api/tweets/tweet/${tweetId}/user/${userId}/retweets`,
      tweet
    );

    return retweetByUser.data;
  }

  async createFavoriteTweetByUser(userId, tweetId) {
    const favoriteTweet = await $authClient.post(
      `api/tweets/tweet/${tweetId}/user/${userId}/bookmarks`
    );

    return favoriteTweet.data;
  }

  async deleteFavoriteTweetByUser(userId, tweetId) {
    const deletedBookmark = await $authClient.post(
      `api/tweets/bookmarks/tweet/${tweetId}/user/${userId}`
    );

    return deletedBookmark.data;
  }

  async createCommentTweetByUser(userId, tweetId, text) {
    const comment = await $authClient.post(
      `api/tweets/tweet/${tweetId}/user/${userId}/comments`,
      { text }
    );

    return comment.data;
  }

  async getCommentsByUser(userId, limit, list) {
    const comments = await $authClient.get(
      `api/tweets/user/${userId}/comments`,
      {
        params: { limit, list },
      }
    );

    return comments.data;
  }

  async getFavoriteTweets(userId, limit, list) {
    const favoriteTweets = await $authClient.get(
      `api/tweets/user/${userId}/bookmarks`,
      {
        params: { limit, list },
      }
    );

    return favoriteTweets.data;
  }

  async getCountRetweets(tweetId) {
    const countRetweets = await $authClient.put(
      `api/tweets/tweet/${tweetId}/retweets`
    );

    return countRetweets.data;
  }

  async deleteLike(userId, tweetId) {
    const dislikedTweet = await $authClient.put(
      `api/tweets/tweet/${tweetId}/likes/user/${userId}`
    );
    return dislikedTweet.data;
  }

  async getCountComments(tweetId) {
    const countComments = await $authClient.put(
      `api/tweets/tweet/${tweetId}/comments`
    );

    return countComments.data;
  }

  async deleteTweetByUser(tweetId) {
    const tweet = await $authClient.delete(`api/tweets/tweet/${tweetId}`);

    return tweet.data;
  }

  async getTweetsForAuthUser(userId, limit, list) {
    const tweetsIds = await $authClient.get(`api/tweets/authUser/${userId}`, {
      params: { limit, list },
    });

    return tweetsIds.data;
  }

  async deleteRetweet(retweetId, userId) {
    const retweet = await $authClient.put(
      `api/tweets/retweets/${retweetId}/user/${userId}`
    );

    return retweet.data;
  }

  async getUserTweetsWithMedia(userId, limit, list) {
    const tweets = await $authClient.get(`api/tweets/user/${userId}/media`, {
      params: { limit, list },
    });

    return tweets.data;
  }

  async getTweetsWithUserLikes(userId, limit, list) {
    const tweets = await $authClient.get(`api/tweets/likes/user/${userId}`, {
      params: { limit, list },
    });

    return tweets.data;
  }
}
const tweetAPI = new TweetAPI();

export default tweetAPI;
