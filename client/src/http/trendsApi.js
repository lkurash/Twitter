import { $host } from ".";

class Trends {
  async getAllTrends() {
    const trends = await $host.get("api/twitter/trends");

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
}
const trendsApi = new Trends();

export default trendsApi;
