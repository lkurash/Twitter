import { $authClient, $client } from "./clients";

class PageAPI {
  async getUser(userId) {
    const user = await $authClient.get(`api/page/users/${userId}`);

    return user.data;
  }
}

const pageAPI = new PageAPI();

export default pageAPI;
