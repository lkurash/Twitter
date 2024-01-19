export const defaultState = {
  isAuth: { isAuth: false, loadingStatus: "PENDING", error: false },
  User: {
    userProfile: { profile: null, loadingStatus: "PENDING", error: false },
    userProfileById: { profile: null, loadingStatus: "PENDING", error: false },
    userFollowers: {
      followers: null,
      loadingStatus: "PENDING",
      error: false,
    },
    userFollowings: {
      followings: null,
      loadingStatus: "PENDING",
      error: false,
    },
    userListWhoNotReading: {
      listWhoNotReading: null,
      loadingStatus: "PENDING",
      error: false,
    },
  },
  userInfo: {
    loadingStatus: "PENDING",
    userInfo: null,
    error: "",
  },

  users: {
    users: [],
  },

  Tweets: { tweets: null, loadingStatus: "PENDING", error: false },

  Trends: {
    trends: [],
    loadingStatus: "PENDING",
    error: false,
  },

  visibilityPrivatePage: {
    loadingStatus: "PENDING",
    visibilityPage: false,
    error: false,
  },
  
  visibilityPublicPage: {
    loadingStatus: "PENDING",
    visibilityPage: false,
    error: false,
  },
};
