import { $host } from "./hosts";

class TrendsClient {
  async getAllTrends(userId, limit) {
    const trends = await $host.get("api/twitter/trends", {
      params: { userId, limit },
    });

    return trends.data;
  }

  async createTrends(text) {
    const trends = await $host.post("api/twitter/trends", text);

    return trends.data;
  }

  async getTrendsTwits(trend, limit, list) {
    const twits = await $host.get(`api/twitter/trends/${trend}`, {
      params: { limit, list },
    });

    return twits.data;
  }

  async createNotInterestingTrend(trendId, userId) {
    const trend = await $host.put(
      `api/twitter/trends/trend/${trendId}/user/${userId}`
    );

    return trend.data;
  }

  async getCountTrends(text) {
    const trends = await $host.put("api/twitter/trends/countTrends", text);

    return trends.data;
  }
}
const trendsClient = new TrendsClient();

export default trendsClient;
