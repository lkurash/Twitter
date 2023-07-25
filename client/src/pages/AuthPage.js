import { observer } from "mobx-react-lite";
import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "..";
import FooterMobileComponent from "../components/FooterMobileComponent";
import MenuComponent from "../components/MenuComponent";
import { getUserById, refreshToken } from "../http/userApi";
import BookmarksPageComponent from "../pagesComponents/BookmarkPageComponent";
import FollowPageComponent from "../pagesComponents/FollowPageComponent";
import HomePageComponent from "../pagesComponents/HomePageComponent";
import MessagesPageComponent from "../pagesComponents/MessagePageComponent";
import UserPageComponent from "../pagesComponents/UserPageComponent";
import checkTokenOnPage from "../utils/checkTokenOnPage";
import {
  BOOKMARKS_PAGE,
  EDIT_PROFILE_PAGE,
  FOLLOWER_PAGE,
  FOLLOWING_PAGE,
  HOME_PAGE,
  LOGIN_PAGE_NOT_AUTH,
  MESSAGE_PAGE,
  PROFILE_PAGE_USER,
  PROFILE_PAGE_USER_ANSWERS,
  PROFILE_PAGE_USER_LIKES,
  PROFILE_PAGE_USER_MEDIA,
} from "../utils/constans";
import getAuthUserID from "../utils/getAuthUserID";

const AuthPage = observer(() => {
  const { usersStore } = useContext(Context);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  const ref = useRef();
  const location = useLocation().pathname;
  const authUserID = getAuthUserID(usersStore);

  useEffect(() => {
    refreshToken()
      .finally(() => {
        usersStore.setAuth(checkTokenOnPage());
        if (!usersStore.isAuth) {
          navigate(LOGIN_PAGE_NOT_AUTH);
        } else {
          getUserById(authUserID).then((userInfo) =>
            usersStore.setUser(userInfo)
          );
        }
      })
      .catch((error) => console.log(error.response.data.message));
  }, []);

  useLayoutEffect(() => {
    ref.current.scrollIntoView();
  });

  return (
    <div>
      <div className="page" ref={ref}>
        <MenuComponent show={cookies.token} />
        {location === HOME_PAGE && (
          <HomePageComponent isAuth={usersStore.isAuth} />
        )}
        {location === BOOKMARKS_PAGE + authUserID && (
          <BookmarksPageComponent isAuth={usersStore.isAuth} />
        )}
        {location === EDIT_PROFILE_PAGE + authUserID && (
          <EDIT_PROFILE_PAGE isAuth={usersStore.isAuth} />
        )}
        {(location === PROFILE_PAGE_USER + authUserID ||
          location === PROFILE_PAGE_USER_ANSWERS + authUserID ||
          location === PROFILE_PAGE_USER_MEDIA + authUserID ||
          location === PROFILE_PAGE_USER_LIKES + authUserID) && (
          <UserPageComponent isAuth={usersStore.isAuth} />
        )}
        {location === FOLLOWER_PAGE + authUserID && (
          <FollowPageComponent isAuth={usersStore.isAuth} />
        )}
        {location === FOLLOWING_PAGE + authUserID && (
          <FollowPageComponent isAuth={usersStore.isAuth} />
        )}
        {location === MESSAGE_PAGE + authUserID && (
          <MessagesPageComponent isAuth={usersStore.isAuth} />
        )}
      </div>
      <FooterMobileComponent />
    </div>
  );
});

export default AuthPage;
