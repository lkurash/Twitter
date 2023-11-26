import { useSelector } from "react-redux";

export function useTwitsStore() {
  return useSelector((state) => state.twitsStore.Twits);
}

export function useUserStore() {
  return useSelector((state) => state.userStore.User);
}


