import { createSlice } from "@reduxjs/toolkit";

export const followButton = createSlice({
  name: "followButton",
  initialState: {
    hoverButtonFollow: { id: null },
    startFollow: { id: null },
  },
  reducers: {
    setHoverButtonFollow: (state, action) => {
      state.hoverButtonFollow.id = action.payload.id;
    },

    setStartFollow: (state, action) => {
      state.startFollow.id = action.payload.id;
    },
  },
});

export const {
  setHoverButtonFollow,
  setStartFollow
} = followButton.actions;

export default followButton.reducer;
