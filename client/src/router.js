import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TrendsPage from "./pages/TrendsPage";
import TwitterPageNotAuthUser from "./pages/TwitterNotAuthUserPage";
import ExplorePage from "./pages/ExplorePage";
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
} from "./utils/constans";
import TwitterPage from "./pages/TwitterPage";
import AuthPage from "./pages/AuthPage";

export const authRoutes = [
  {
    path: HOME_PAGE,
    Component: AuthPage,
  },
  {
    path: `${BOOKMARKS_PAGE}:id`,
    Component: AuthPage,
  },
  {
    path: `${PROFILE_PAGE_USER}:id`,
    Component: AuthPage,
  },
  {
    path: `${PROFILE_PAGE_USER_ANSWERS}:id`,
    Component: AuthPage,
  },
  {
    path: `${PROFILE_PAGE_USER_LIKES}:id`,
    Component: AuthPage,
  },
  {
    path: `${PROFILE_PAGE_USER_MEDIA}:id`,
    Component: AuthPage,
  },
  {
    path: `${EDIT_PROFILE_PAGE}:id`,
    Component: AuthPage,
  },
  {
    path: `${FOLLOWING_PAGE}:id`,
    Component: AuthPage,
  },
  {
    path: `${FOLLOWER_PAGE}:id`,
    Component: AuthPage,
  },
  {
    path: `${MESSAGE_PAGE}:id`,
    Component: AuthPage,
  },
];

export const publicRoutes = [
  {
    path: TWITTER_PAGE,
    Component: TwitterPage,
  },
  {
    path: EXPLORE_PAGE,
    Component: ExplorePage,
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
