import { createSelector } from "reselect";

const selectUserStore = (state) => state.userStore;

export const userStore = createSelector([selectUserStore], (state) => state);

export const auth = createSelector(
  [selectUserStore],
  (state) => state.isAuth
);

export const userProfile = createSelector(
  [selectUserStore],
  (state) => state.userProfile
);

export const userFollowings = createSelector(
  [selectUserStore],
  (state) => state.userFollowings
);

export const userFollowers = createSelector(
  [selectUserStore],
  (state) => state.userFollowers
);

export const userListWhoNotReading = createSelector(
  [selectUserStore],
  (state) => state.userListWhoNotReading
);

export const userProfileById = createSelector(
  [selectUserStore],
  (state) => state.userProfileById
);

// export const selectAuthLoadingState = createSelector(
//   [selectUser],
//   (auth) => auth.loading
// );

// export const selectAuthErrors = createSelector(
//   [selectUser],
//   (auth) => auth.error
// );
