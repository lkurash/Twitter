import { createSelector } from "reselect";

const selectButtonsOnTweetStore = (state) => state.buttonStateOnTweet;

export const buttonsStateStore = createSelector(
  [selectButtonsOnTweetStore],
  (state) => state
);

const selectButtonStoreFollow = (state) => state.buttonStateOnFollow;

export const buttonStateFollow = createSelector(
  [selectButtonStoreFollow],
  (state) => state
);
