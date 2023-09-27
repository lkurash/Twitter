import { $authClient, $client } from "./clients";

class TrendClient {
  async getAllTrends(userId, limit) {
    const trends = await $client.get("api/twitter/trends", {
      params: { userId, limit },
    });

    return trends.data;
  }

  async createTrends(text) {
    const trends = await $client.post("api/twitter/trends", text);

    return trends.data;
  }

  async getTrendsTwitsForAuthUser(trend, userId, limit, list) {
    const twits = await $authClient.get(`api/twitter/auth/trends/${trend}`, {
      params: { limit, list },
    });

    return twits.data;
  }

  async getPublicTrendsTwits(trend, limit, list) {
    const twits = await $client.get(`api/twitter/trends/${trend}`, {
      params: { limit, list },
    });

    return twits.data;
  }

  async createNotInterestingTrend(trendId, userId) {
    const trend = await $client.put(
      `api/twitter/trends/trend/${trendId}/user/${userId}`
    );

    return trend.data;
  }

  async getCountTrends(text) {
    const trends = await $client.put("api/twitter/trends/countTrends", text);

    return trends.data;
  }
}
const trendClient = new TrendClient();

export default trendClient;
