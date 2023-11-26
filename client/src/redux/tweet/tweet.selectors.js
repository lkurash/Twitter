import { createSelector } from "reselect";

const selectTwitsStore = (state) => state.twitsStore;

export const twitsStore = createSelector(
  [selectTwitsStore],
  (state) => state
);
