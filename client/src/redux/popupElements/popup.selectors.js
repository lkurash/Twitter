import { createSelector } from "reselect";

const selectPopupElementsStore = (state) => state.popUpFormStore;

export const popupElementsStateStore = createSelector(
  [selectPopupElementsStore],
  (state) => state
);

const selectPopupElementsStoreInfoMessage = (state) => state.infoMessageStore;

export const popupElementsStateInfoMessage = createSelector(
  [selectPopupElementsStoreInfoMessage],
  (state) => state
);
