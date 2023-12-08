import { $authClient, $client } from "./clients";

class TrendAPI {
  async getAllTrends(userId, limit) {
    const trends = await $client.get("api/twitter/trends", {
      params: { userId, limit },
    });

    return trends.data;
  }

  async getAuthUserTweetsForTrend(trend, limit, list) {
    const tweets = await $authClient.get(`api/tweets/auth/trend/${trend}`, {
      params: { limit, list },
    });

    return tweets.data;
  }

  async getPublicTrendsTweets(trend, limit, list) {
    const tweets = await $client.get(`api/tweets/trend/${trend}`, {
      params: { limit, list },
    });

    return tweets.data;
  }

  async createNotInterestingTrend(trendId, userId) {
    const trend = await $client.put(
      `api/twitter/trends/trend/${trendId}/user/${userId}`
    );

    return trend.data;
  }
}
const trendAPI = new TrendAPI();

export default trendAPI;
