import authenticate from "./utils/authenticate";
import redirectLoader from "./utils/redirectLoader";

import AppLayout from "./pages/public/AppLayout";
import LayoutLoginAndSignUpPage from "./pages/public/LayoutLoginAndSignUpPage";
import PublicHomePage from "./pages/public/PublicHomePage";
import PublicExplorePage from "./pages/public/PublicExplorePage";
import PublicProfilePageUser from "./pages/public/PublicProfilePageUser";
import TrendsPage from "./pages/public/TrendsPage";
import LoginPage from "./pages/public/LoginPage";
import SignUpPage from "./pages/public/SignUpPage";

import HomePage from "./pages/private/HomePage";
import PrivateExplorePage from "./pages/private/PrivateExplorePage";
import MessagesPage from "./pages/private/MessagesPage";
import BookmarksPage from "./pages/private/BookmarkPage";
import HomeProfileUserPage from "./pages/private/HomeProfileUserPage";
import EditProfilePage from "./pages/private/EditProfilePage";
import FollowPage from "./pages/private/FollowPage";
import ProfileUserPage from "./pages/private/ProfileUserPage";

import ProfilePageLikes from "./components/ProfilePageLikes";
import ProfilePageMedia from "./components/ProfilePageMedia";
import ProfilePageAnswers from "./components/ProfilePageAnswers";
import UserTwits from "./components/UserTwits";

import {
  AUTHEXPLORE_PAGE_PATH,
  BOOKMARKS_PAGE_PATH,
  EDIT_PROFILE_PAGE_PATH,
  EXPLORE_PAGE_PATH,
  LOGIN_PAGE_PATH,
  MESSAGE_PAGE_PATH,
  NOTIFICATIONS_PAGE_PATH,
  PROFILE_PAGE_USER_PATH,
  PROFILE_PAGE_USER_ANSWERS_PATH,
  PROFILE_PAGE_USER_LIKES_PATH,
  PROFILE_PAGE_USER_MEDIA_PATH,
  SIGNUP_PAGE_PATH,
  ROOT_PAGE_PATH,
  LOGIN_REDIRECT_PAGE_PATH,
  ROOT_PRIVATE_PAGE_PATH,
  PUBLIC_HOME_PAGE_PATH,
  PRIVATE_HOME_PAGE_PATH,
  AUTH_PAGE_PATH,
  PUBLIC_USER_PAGE_PATH,
  PROFILE_PAGE_USER_TWITS_PATH,
  PRIVATE_USER_PAGE_PATH,
  PRIVATE_USER_PAGE_TWITS_PATH,
  PRIVATE_USER_PAGE_ANSWERS_PATH,
  PRIVATE_USER_PAGE_LIKES_PATH,
  PRIVATE_USER_PAGE__MEDIA_PATH,
  PRIVATE_USER_FOLLOWER_PAGE_PATH,
  PRIVATE_USER_FOLLOWING_PAGE_PATH,
  FOLLOWINGS_PAGE_PATH,
  FOLLOWERS_PAGE_PATH,
  TRENDS_PAGE_PATH,
  AUTHTRENDS_PAGE_PATH,
} from "./utils/constans";

export const publicRoutes = {
  path: ROOT_PAGE_PATH,
  element: <AppLayout />,
  children: [
    {
      path: PUBLIC_HOME_PAGE_PATH,
      element: <PublicHomePage />,
      loader: redirectLoader,
    },
    {
      path: EXPLORE_PAGE_PATH,
      element: <PublicExplorePage />,
    },
    {
      path: TRENDS_PAGE_PATH,
      element: <TrendsPage />,
    },
    {
      path: PUBLIC_USER_PAGE_PATH,
      element: <PublicProfilePageUser />,
    },
  ],
};

export const authRoutes = {
  path: AUTH_PAGE_PATH,
  element: <LayoutLoginAndSignUpPage />,
  loader: redirectLoader,
  children: [
    {
      path: LOGIN_REDIRECT_PAGE_PATH,
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
  path: ROOT_PRIVATE_PAGE_PATH,
  element: <AppLayout />,
  loader: authenticate,
  children: [
    {
      path: PRIVATE_HOME_PAGE_PATH,
      element: <HomePage />,
    },
    {
      path: AUTHEXPLORE_PAGE_PATH,
      element: <PrivateExplorePage />,
    },
    {
      path: NOTIFICATIONS_PAGE_PATH,
    },
    {
      path: MESSAGE_PAGE_PATH,
      element: <MessagesPage />,
    },
    {
      path: BOOKMARKS_PAGE_PATH,
      element: <BookmarksPage />,
    },
    {
      path: PROFILE_PAGE_USER_PATH,
      element: <HomeProfileUserPage />,
      children: [
        {
          path: PROFILE_PAGE_USER_TWITS_PATH,
          element: <UserTwits />,
        },
        {
          path: PROFILE_PAGE_USER_ANSWERS_PATH,
          element: <ProfilePageAnswers />,
        },
        {
          path: PROFILE_PAGE_USER_LIKES_PATH,
          element: <ProfilePageLikes />,
        },
        {
          path: PROFILE_PAGE_USER_MEDIA_PATH,
          element: <ProfilePageMedia />,
        },
        {
          path: EDIT_PROFILE_PAGE_PATH,
          element: <EditProfilePage />,
        },
      ],
    },
    {
      path: FOLLOWINGS_PAGE_PATH,
      element: <FollowPage />,
    },
    {
      path: FOLLOWERS_PAGE_PATH,
      element: <FollowPage />,
    },
    {
      path: AUTHTRENDS_PAGE_PATH,
      element: <TrendsPage />,
    },
  ],
};

export const privateUserPageRoutes = {
  path: PRIVATE_USER_PAGE_PATH,
  element: <AppLayout />,
  loader: authenticate,
  children: [
    {
      path: PRIVATE_USER_PAGE_PATH,
      element: <ProfileUserPage />,
      children: [
        {
          path: PRIVATE_USER_PAGE_TWITS_PATH,
          element: <UserTwits />,
        },
        {
          path: PRIVATE_USER_PAGE_ANSWERS_PATH,
          element: <ProfilePageAnswers />,
        },
        {
          path: PRIVATE_USER_PAGE_LIKES_PATH,
          element: <ProfilePageLikes />,
        },
        {
          path: PRIVATE_USER_PAGE__MEDIA_PATH,
          element: <ProfilePageMedia />,
        },
      ],
    },
    {
      path: PRIVATE_USER_FOLLOWER_PAGE_PATH,
      element: <FollowPage />,
    },
    {
      path: PRIVATE_USER_FOLLOWING_PAGE_PATH,
      element: <FollowPage />,
    },
  ],
};
