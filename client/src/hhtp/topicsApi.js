import { $host } from ".";

export const getAllTopics = async () => {
  const { data } = await $host.get("api/twitter/topics");

  return data;
};
