import { createSelector } from "reselect";

const selectVisability = (state) => state.visibilityState;

export const visibility = createSelector(
  [selectVisability],
  (state) => state
);
