import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TrendsPage from "./pages/TrendsPage";
import TwitterPageNotAuthUser from "./pages/TwitterNotAuthUserPage";
import ExplorePage from "./pages/ExplorePage";
import {
  AUTHEXPLORE_PAGE,
  BOOKMARKS_PAGE,
  EDIT_PROFILE_PAGE,
  EXPLORE_PAGE,
  FOLLOWER_PAGE,
  FOLLOWING_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
  MESSAGE_PAGE,
  NOTIFICATIONS_PAGE,
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
import HomePageComponent from "./authPages/HomePageComponent";
import BookmarksPageComponent from "./authPages/BookmarkPageComponent";
import UserPageComponent from "./authPages/UserPageComponent";
import EditProfilePageComponent from "./authPages/EditProfilPageComponent";
import FollowPageComponent from "./authPages/FollowPageComponent";
import MessagesPageComponent from "./authPages/MessagePageComponent";
import WrapperTwitterPage from "./pages/WrapperTwitterPage";
import authorization from "./utils/authorization";
import ProfilePageLikes from "./components/ProfilePageLikes";
import ProfilePageMedia from "./components/ProfilePageMedia";
import ProfilePageAnswers from "./components/ProfilePageAnswers";
import UserTwits from "./components/UserTwits";
import WrapperLoginAndSignUpPage from "./pages/WrapperLoginAndSignUpPage";

export const authRoutes = {
  path: HOME_PAGE,
  element: <WrapperTwitterPage />,
  loader: authorization,
  children: [
    {
      path: "",
      element: <HomePageComponent />,
    },
    {
      path: `${BOOKMARKS_PAGE}:id`,
      element: <BookmarksPageComponent />,
    },
    {
      path: `${PROFILE_PAGE_USER}:id`,
      element: <UserPageComponent />,
      children: [
        {
          path: "",
          element: <UserTwits />,
        },
        {
          path: `${PROFILE_PAGE_USER_ANSWERS}`,
          element: <ProfilePageAnswers />,
        },
        {
          path: `${PROFILE_PAGE_USER_LIKES}`,
          element: <ProfilePageLikes />,
        },
        {
          path: `${PROFILE_PAGE_USER_MEDIA}`,
          element: <ProfilePageMedia />,
        },
      ],
    },
    {
      path: `${EDIT_PROFILE_PAGE}:id`,
      element: <EditProfilePageComponent />,
    },
    {
      path: `${FOLLOWING_PAGE}:id`,
      element: <FollowPageComponent />,
    },
    {
      path: `${FOLLOWER_PAGE}:id`,
      element: <FollowPageComponent />,
    },
    {
      path: `${MESSAGE_PAGE}:id`,
      element: <MessagesPageComponent />,
    },
    {
      path: `${NOTIFICATIONS_PAGE}`,
      // element: <UserPageComponent />,
    },
    {
      path: `${AUTHEXPLORE_PAGE}`,
      element: <ExplorePage />,
    },
  ],
};

export const publicRoutes = {
  path: TWITTER_PAGE,
  element: <WrapperTwitterPage />,
  children: [
    {
      path: "",
      element: <TwitterPage />,
    },
    {
      path: EXPLORE_PAGE,
      element: <ExplorePage />,
    },
    {
      path: `${TRENDS_PAGE}:trend`,
      element: <TrendsPage />,
    },
    {
      path: `${TWITTER_USER_PAGE}:id`,
      element: <TwitterPageNotAuthUser />,
    },
  ],
};

export const authenticationRoutes = {
  path: "/authentication",
  element: <WrapperLoginAndSignUpPage />,
  children: [
    {
      path: "/authentication/redirect",
      element: <LoginPage />,
    },
    {
      path: LOGIN_PAGE,
      element: <LoginPage />,
    },
    {
      path: SIGNUP_PAGE,
      element: <SignUpPage />,
    },
  ],
};
