import { createSelector } from "reselect";

const selectTweetsStore = (state) => state.tweetsStore;

export const tweetsStore = createSelector(
  [selectTweetsStore],
  (state) => state
);
