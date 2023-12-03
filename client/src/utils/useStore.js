import { useSelector } from "react-redux";

export function useTweetsStore() {
  return useSelector((state) => state.tweetsStore.Tweets);
}

export function useUserStore() {
  return useSelector((state) => state.userStore.User);
}
