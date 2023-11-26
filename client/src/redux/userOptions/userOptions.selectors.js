import { createSelector } from "reselect";

const selectUserStore = (state) => state.userPreview;

export const userPreview = createSelector([selectUserStore], (state) => state.userInfo);

export const searchUsers = createSelector(
  [selectUserStore],
  (state) => state.users
);
