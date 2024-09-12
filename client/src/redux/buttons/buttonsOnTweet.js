import { createSlice } from "@reduxjs/toolkit";

export const buttonsOnTweet = createSlice({
  name: "buttonsOnTweet",
  initialState: {
    hoverLikeTweet: { id: null },
    hoverBookmarkTweet: { id: null },
    hoverRetweetTweet: { id: null },
    hoverRepliesTweet: { id: null },
    likedTweet: { id: null },
    bookmarkedTweet: { id: null },
    retweetedTweet: { id: null },
    activeButtonReplies: { id: null },
  },
  reducers: {
    setHoverLikeTweet: (state, action) => {
      state.hoverLikeTweet.id = action.payload.id;
    },
    setHoverBookmarkTweet: (state, action) => {
      state.hoverBookmarkTweet.id = action.payload.id;
    },
    setHoverRetweetTweet: (state, action) => {
      state.hoverRetweetTweet.id = action.payload.id;
    },
    setHoverRepliesTweet: (state, action) => {
      state.hoverRepliesTweet.id = action.payload.id;
    },
    setLikedTweet: (state, action) => {
      state.likedTweet.id = action.payload.id;
    },
    setBookmarkedTweet: (state, action) => {
      state.bookmarkedTweet.id = action.payload.id;
    },
    setRetweetedTweet: (state, action) => {
      state.retweetedTweet.id = action.payload.id;
    },
    setActiveButtonReplies: (state, action) => {
      state.activeButtonReplies.id = action.payload.id;
    },
  },
});

export const {
  setHoverLikeTweet,
  setHoverBookmarkTweet,
  setHoverRetweetTweet,
  setHoverRepliesTweet,
  setLikedTweet,
  setBookmarkedTweet,
  setRetweetedTweet,
  setActiveButtonReplies,
} = buttonsOnTweet.actions;

export default buttonsOnTweet.reducer;
