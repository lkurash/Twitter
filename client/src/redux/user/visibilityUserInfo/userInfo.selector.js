import { createSelector } from "reselect";

const visibilityUserInfoStore = (state) => state.visibilityUserInfoStore;

export const visibilityUserInfo = createSelector(
  [visibilityUserInfoStore],
  (state) => state
);
