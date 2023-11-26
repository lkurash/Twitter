import { createSelector } from "reselect";

const selectTrendStore = (state) => state.trendStore;

export const trendStore = createSelector([selectTrendStore], (state) => state);
