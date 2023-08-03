import AppLayout from "./pages/AppLayout";
import LayoutLoginAndSignUpPage from "./pages/LayoutLoginAndSignUpPage";
import authenticate from "./utils/authenticate";

import PublicHomePage from "./pages/PublicHomePage";
import TrendsPage from "./pages/TrendsPage";
import PublicHomePageNotAuthUser from "./pages/TwitterNotAuthUserPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import HomePageComponent from "./authPages/HomePageComponent";
import ExplorePage from "./pages/ExplorePage";
import MessagesPageComponent from "./authPages/MessagePageComponent";
import BookmarksPageComponent from "./authPages/BookmarkPageComponent";
import UserPageComponent from "./authPages/UserPageComponent";
import EditProfilePageComponent from "./authPages/EditProfilPageComponent";
import FollowPageComponent from "./authPages/FollowPageComponent";
import ProfilePageLikes from "./components/ProfilePageLikes";
import ProfilePageMedia from "./components/ProfilePageMedia";
import ProfilePageAnswers from "./components/ProfilePageAnswers";
import UserTwits from "./components/UserTwits";

import {
  AUTHEXPLORE_PAGE_PATH,
  BOOKMARKS_PAGE_PATH,
  EDIT_PROFILE_PAGE_PATH,
  EXPLORE_PAGE_PATH,
  FOLLOWER_PAGE_PATH,
  FOLLOWING_PAGE_PATH,
  HOME_PAGE_PATH,
  LOGIN_PAGE_PATH,
  MESSAGE_PAGE_PATH,
  NOTIFICATIONS_PAGE_PATH,
  PROFILE_PAGE_USER_PATH,
  PROFILE_PAGE_USER_ANSWERS_PATH,
  PROFILE_PAGE_USER_LIKES_PATH,
  PROFILE_PAGE_USER_MEDIA_PATH,
  SIGNUP_PAGE_PATH,
  TRENDS_PAGE_PATH,
  ROOT_PAGE_PATH,
  TWITTER_USER_PAGE_PATH,
} from "./utils/constans";

export const publicRoutes = {
  path: ROOT_PAGE_PATH,
  element: <AppLayout />,
  children: [
    {
      path: "",
      element: <PublicHomePage />,
    },
    {
      path: EXPLORE_PAGE_PATH,
      element: <ExplorePage />,
    },
    {
      path: `${TRENDS_PAGE_PATH}:trend`,
      element: <TrendsPage />,
    },
    {
      path: `${TWITTER_USER_PAGE_PATH}:id`,
      element: <PublicHomePageNotAuthUser />,
    },
  ],
};

export const authorizationRoutes = {
  path: "/authentication",
  element: <LayoutLoginAndSignUpPage />,
  children: [
    {
      path: "/authentication/redirect",
      element: <LoginPage />,
    },
    {
      path: LOGIN_PAGE_PATH,
      element: <LoginPage />,
    },
    {
      path: SIGNUP_PAGE_PATH,
      element: <SignUpPage />,
    },
  ],
};

export const privateRoutes = {
  path: HOME_PAGE_PATH,
  element: <AppLayout />,
  loader: authenticate,
  children: [
    {
      path: "",
      element: <HomePageComponent />,
    },
    {
      path: `${AUTHEXPLORE_PAGE_PATH}`,
      element: <ExplorePage />,
    },
    {
      path: `${NOTIFICATIONS_PAGE_PATH}`,
      // element: <UserPageComponent />,
    },
    {
      path: `${MESSAGE_PAGE_PATH}:id`,
      element: <MessagesPageComponent />,
    },
    {
      path: `${BOOKMARKS_PAGE_PATH}`,
      element: <BookmarksPageComponent />,
    },
    {
      path: `${PROFILE_PAGE_USER_PATH}:id`,
      element: <UserPageComponent />,
      children: [
        {
          path: "",
          element: <UserTwits />,
        },
        {
          path: `${PROFILE_PAGE_USER_ANSWERS_PATH}`,
          element: <ProfilePageAnswers />,
        },
        {
          path: `${PROFILE_PAGE_USER_LIKES_PATH}`,
          element: <ProfilePageLikes />,
        },
        {
          path: `${PROFILE_PAGE_USER_MEDIA_PATH}`,
          element: <ProfilePageMedia />,
        },
      ],
    },
    {
      path: `${EDIT_PROFILE_PAGE_PATH}:id`,
      element: <EditProfilePageComponent />,
    },
    {
      path: `${FOLLOWING_PAGE_PATH}:id`,
      element: <FollowPageComponent />,
    },
    {
      path: `${FOLLOWER_PAGE_PATH}:id`,
      element: <FollowPageComponent />,
    },
  ],
};
