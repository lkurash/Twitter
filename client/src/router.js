import authenticate from "./utils/authenticate";
import redirectToHomePage from "./utils/redirectToHomePage";
import RootBoundary from "./utils/RootBoundary";

import AppLayout from "./pages/AppLayout";
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

import AnswersPageContent from "./components/AnswersPageContent";
import UserTweets from "./components/Tweets/UserTweets";
import UserFollowersList from "./components/UserFollowersList";
import UserFollowingList from "./components/UserFollowingList";
import UserTweetsWithMedia from "./components/Tweets/UserTweetsWithMedia";
import UserTweetsWithLikes from "./components/Tweets/UserTweetsWithLikes";

import {
  EXPLORE_PAGE_PATH,
  BOOKMARKS_PAGE_PATH,
  EDIT_PROFILE_PAGE_PATH,
  PUBLIC_EXPLORE_PAGE_PATH,
  LOGIN_PAGE_PATH,
  MESSAGE_PAGE_PATH,
  NOTIFICATIONS_PAGE_PATH,
  PROFILE_PAGE_USER_PATH,
  PROFILE_PAGE_USER_ANSWERS_PATH,
  PROFILE_PAGE_USER_LIKES_PATH,
  PROFILE_PAGE_USER_MEDIA_PATH,
  SIGNUP_PAGE_PATH,
  ROOT_PAGE_PATH,
  ROOT_PRIVATE_PAGE_PATH,
  PUBLIC_HOME_PAGE_PATH,
  HOME_PAGE_PATH,
  AUTH_PAGE_PATH,
  PROFILE_PAGE_USER_TWEETS_PATH,
  USER_PAGE_PATH,
  USER_PAGE_TWEETS_PATH,
  USER_PAGE_ANSWERS_PATH,
  USER_PAGE_LIKES_PATH,
  USER_PAGE__MEDIA_PATH,
  USER_FOLLOWER_PAGE_PATH,
  USER_FOLLOWING_PAGE_PATH,
  FOLLOWINGS_PAGE_PATH,
  FOLLOWERS_PAGE_PATH,
  PUBLIC_TRENDS_PAGE_PATH,
  TRENDS_PAGE_PATH,
  PUBLIC_USER_PAGE_PATH,
  LOG_OUT_PAGE_PATH,
} from "./utils/routs";
import LogOutPage from "./pages/private/LogOutPage";

export const publicRoutes = {
  path: ROOT_PAGE_PATH,
  element: <AppLayout />,
  errorElement: <RootBoundary />,
  children: [
    {
      path: PUBLIC_HOME_PAGE_PATH,
      loader: redirectToHomePage,
      element: <PublicHomePage />,
    },
    {
      path: PUBLIC_EXPLORE_PAGE_PATH,
      loader: redirectToHomePage,
      element: <PublicExplorePage />,
    },
    {
      path: PUBLIC_TRENDS_PAGE_PATH,
      element: <TrendsPage />,
      loader: redirectToHomePage,
    },
    {
      path: PUBLIC_USER_PAGE_PATH,
      element: <PublicProfilePageUser />,
    },
    {
      path: AUTH_PAGE_PATH,
      element: <LayoutLoginAndSignUpPage />,
      errorElement: <RootBoundary />,
      loader: redirectToHomePage,
      children: [
        {
          path: LOGIN_PAGE_PATH,
          element: <LoginPage />,
        },
        {
          path: SIGNUP_PAGE_PATH,
          element: <SignUpPage />,
        },
      ],
    },
  ],
};

export const privateRoutes = {
  path: ROOT_PRIVATE_PAGE_PATH,
  element: <AppLayout />,
  loader: authenticate,
  errorElement: <RootBoundary />,
  children: [
    {
      path: HOME_PAGE_PATH,
      element: <HomePage />,
    },
    {
      path: EXPLORE_PAGE_PATH,
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
          path: PROFILE_PAGE_USER_TWEETS_PATH,
          element: <UserTweets />,
        },
        {
          path: PROFILE_PAGE_USER_ANSWERS_PATH,
          element: <AnswersPageContent />,
        },
        {
          path: PROFILE_PAGE_USER_LIKES_PATH,
          element: <UserTweetsWithLikes />,
        },
        {
          path: PROFILE_PAGE_USER_MEDIA_PATH,
          element: <UserTweetsWithMedia />,
        },
        {
          path: EDIT_PROFILE_PAGE_PATH,
          element: <EditProfilePage />,
        },
      ],
    },
    {
      path: HOME_PAGE_PATH,
      element: <FollowPage />,
      children: [
        {
          path: FOLLOWINGS_PAGE_PATH,
          element: <UserFollowingList />,
        },
        {
          path: FOLLOWERS_PAGE_PATH,
          element: <UserFollowersList />,
        },
      ],
    },
    {
      path: TRENDS_PAGE_PATH,
      element: <TrendsPage />,
    },
    { path: LOG_OUT_PAGE_PATH,
      element: <LogOutPage />
    },
  ],
};

export const privateUserPageRoutes = {
  path: USER_PAGE_PATH,
  element: <AppLayout />,
  loader: authenticate,
  errorElement: <RootBoundary />,
  children: [
    {
      path: USER_PAGE_PATH,
      element: <ProfileUserPage />,
      children: [
        {
          path: USER_PAGE_TWEETS_PATH,
          element: <UserTweets />,
        },
        {
          path: USER_PAGE_ANSWERS_PATH,
          element: <AnswersPageContent />,
        },
        {
          path: USER_PAGE_LIKES_PATH,
          element: <UserTweetsWithLikes />,
        },
        {
          path: USER_PAGE__MEDIA_PATH,
          element: <UserTweetsWithMedia />,
        },
      ],
    },
    {
      path: "",
      element: <FollowPage />,
      children: [
        {
          path: USER_FOLLOWER_PAGE_PATH,
          element: <UserFollowersList />,
        },
        {
          path: USER_FOLLOWING_PAGE_PATH,
          element: <UserFollowingList />,
        },
      ],
    },
  ],
};
