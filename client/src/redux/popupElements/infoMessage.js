import { createSlice } from "@reduxjs/toolkit";

export const infoMessage = createSlice({
  name: "infoMessage",
  initialState: {
    text: "",
    infoMessageVisible: false,
    textErrorMessage: "",
    errorVisible: false,
  },
  reducers: {
    setTextMessage: (state, action) => {
      state.text = action.payload;
    },
    setInfoMessageVisible: (state, action) => {
      state.infoMessageVisible = action.payload;
    },
    setTextErrorMessage: (state, action) => {
      state.textErrorMessage = action.payload;
    },
    setErrorVisible: (state, action) => {
      state.errorVisible = action.payload;
    },
  },
});

export const {
  setTextMessage,
  setInfoMessageVisible,
  setTextErrorMessage,
  setErrorVisible,
} = infoMessage.actions;

export default infoMessage.reducer;
