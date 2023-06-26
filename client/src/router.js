import BookmarksPage from "./pages/BookmarksPage";
import EditProfilePage from "./pages/EditProfilePage";
import FollowPage from "./pages/FollowPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MessagesPage from "./pages/MessagesPage";
import SignUpPage from "./pages/SignUpPage";
import TrendsPage from "./pages/TrendsPage";
import TwitPage from "./pages/TwitPage";
import TwitterPageNotAuthUser from "./pages/TwitterNotAuthUserPage";
import TwitterPage from "./pages/TwitterPage";
import UserPage from "./pages/UserPage";
import {
  BOOKMARKS_PAGE,
  EDIT_PROFILE_PAGE,
  EXPLORE_PAGE,
  FOLLOWER_PAGE,
  FOLLOWING_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
  LOGIN_PAGE_NOT_AUTH,
  MESSAGE_PAGE,
  PROFILE_PAGE_USER,
  PROFILE_PAGE_USER_ANSWERS,
  PROFILE_PAGE_USER_LIKES,
  PROFILE_PAGE_USER_MEDIA,
  SIGNUP_PAGE,
  TRENDS_PAGE,
  TWITTER_PAGE,
  TWITTER_USER_PAGE,
  TWIT_PAGE,
} from "./utils/constans";

export const authRoutes = [
  {
    path: HOME_PAGE,
    Component: HomePage,
  },
  {
    path: `${BOOKMARKS_PAGE}:id`,
    Component: BookmarksPage,
  },
  {
    path: `${PROFILE_PAGE_USER}:id`,
    Component: UserPage,
  },
  {
    path: `${PROFILE_PAGE_USER_ANSWERS}:id`,
    Component: UserPage,
  },
  {
    path: `${PROFILE_PAGE_USER_LIKES}:id`,
    Component: UserPage,
  },
  {
    path: `${PROFILE_PAGE_USER_MEDIA}:id`,
    Component: UserPage,
  },
  {
    path: TWIT_PAGE,
    Component: TwitPage,
  },
  {
    path: `${EDIT_PROFILE_PAGE}:id`,
    Component: EditProfilePage,
  },
  {
    path: `${FOLLOWING_PAGE}:id`,
    Component: FollowPage,
  },
  {
    path: `${FOLLOWER_PAGE}:id`,
    Component: FollowPage,
  },
  {
    path: `${MESSAGE_PAGE}:id`,
    Component: MessagesPage,
  },
];

export const publicRoutes = [
  {
    path: TWITTER_PAGE,
    Component: TwitterPage,
  },
  {
    path: EXPLORE_PAGE,
    Component: TwitterPage,
  },
  {
    path: LOGIN_PAGE,
    Component: LoginPage,
  },
  {
    path: LOGIN_PAGE_NOT_AUTH,
    Component: LoginPage,
  },
  {
    path: SIGNUP_PAGE,
    Component: SignUpPage,
  },
  {
    path: `${TRENDS_PAGE}:trend`,
    Component: TrendsPage,
  },
  {
    path: `${TWITTER_USER_PAGE}:id`,
    Component: TwitterPageNotAuthUser,
  },
];
