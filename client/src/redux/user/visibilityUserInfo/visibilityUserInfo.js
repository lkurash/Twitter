import { createSlice } from "@reduxjs/toolkit";

export const visibilityUserInfo = createSlice({
  name: "visibilityUserInfo",
  initialState: {
    name: null,
    about: null,
    webSite: null,
    photo: null,
    background: null,
    userRegistrationName: "",
    userRegistrationEmail: "",
    userRegistrationPassword: "",
    birthDate: "",
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.name = action.payload.name;
      state.about = action.payload.about;
      state.webSite = action.payload.webSite;
      state.photo = action.payload.photo;
      state.background = action.payload.background;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setPhoto: (state, action) => {
      state.photo = action.payload;
    },
    setBackground: (state, action) => {
      state.background = action.payload;
    },
    setAbout: (state, action) => {
      state.about = action.payload;
    },
    setWebSite: (state, action) => {
      state.webSite = action.payload;
    },
    setBirthDate: (state, action) => {
      state.birthDate = action.payload;
    },
    setUserRegistrationName: (state, action) => {
      state.userRegistrationName = action.payload;
    },
    setUserRegistrationEmail: (state, action) => {
      state.userRegistrationEmail = action.payload;
    },
    setUserRegistrationPassword: (state, action) => {
      state.userRegistrationPassword = action.payload;
    },
  },
});

export const {
  setUserInfo,
  setName,
  setPhoto,
  setBackground,
  setAbout,
  setWebSite,
  setUserRegistrationName,
  setUserRegistrationEmail,
  setUserRegistrationPassword,
  setBirthDate,
} = visibilityUserInfo.actions;

export default visibilityUserInfo.reducer;
