import { createSelector } from "reselect";

const selectVisability = (state) => state.visibilityState;

export const visibilityPublicPage = createSelector(
  [selectVisability],
  (state) => state.visibilityPublicPage
);

export const visibilityPrivatePage = createSelector(
  [selectVisability],
  (state) => state.visibilityPrivatePage
);
