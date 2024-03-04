import { createSlice } from "@reduxjs/toolkit";

export const popupForm = createSlice({
  name: "popupForm",
  initialState: {
    loginPage: false,
    signUpPage: false,
  },
  reducers: {
    setSignUpPageVisible: (state, action) => {
      state.signUpPage = action.payload;
    },
    setLoginPageVisible: (state, action) => {
      state.loginPage = action.payload;
    },
  },
});

export const { setSignUpPageVisible, setLoginPageVisible } = popupForm.actions;

export default popupForm.reducer;


