import { $host } from ".";

export const getAllTopics = async () => {
  const topics = await $host.get("api/twitter/topics");

  return topics.data;
};
