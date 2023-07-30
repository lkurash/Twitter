import { observer } from "mobx-react-lite";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { Context } from "..";
import FooterMobileComponent from "../components/FooterMobileComponent";
import MenuComponent from "../components/MenuComponent";
import { refreshToken } from "../http/userApi";
import BookmarksPageComponent from "../pagesComponents/BookmarkPageComponent";
import EditProfilePageComponent from "../pagesComponents/EditProfilPageComponent";
import FollowPageComponent from "../pagesComponents/FollowPageComponent";
import HomePageComponent from "../pagesComponents/HomePageComponent";
import MessagesPageComponent from "../pagesComponents/MessagePageComponent";
import UserPageComponent from "../pagesComponents/UserPageComponent";
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

const AuthPage = observer(() => {
  const { usersStore } = useContext(Context);
  const navigate = useNavigate();
  const [loadingPage, setLoadingPage] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies();
  const ref = useRef();
  const locationWithoutId = useLocation().pathname.slice(0, -1);
  const location = useLocation().pathname;

  // useEffect(() => {
  //   refreshToken()
  //     .finally(() => {
  //       setLoadingPage(false);
  //       usersStore.setAuth(checkTokenOnPage());
  //     })
  //     .catch((error) => {
  //       console.log(error.response.data.message);
  //       removeCookie("token");
  //       return redirect(LOGIN_PAGE_NOT_AUTH);
  //     });
  // });

  // useLayoutEffect(() => {
  //   ref.current.scrollIntoView();
  // });

  return (
    <div>
      <div className="page">
        <MenuComponent userAuth={usersStore.isAuth} />
        {/* {location === HOME_PAGE && usersStore.isAuth && (
          <HomePageComponent loadingPage={loadingPage} />
        )}
        {locationWithoutId === BOOKMARKS_PAGE && usersStore.isAuth && (
          <BookmarksPageComponent loadingPage={loadingPage} />
        )}
        {locationWithoutId === EDIT_PROFILE_PAGE && usersStore.isAuth && (
          <EditProfilePageComponent loadingPage={loadingPage} />
        )}
        {((locationWithoutId === PROFILE_PAGE_USER && usersStore.isAuth) ||
          location === PROFILE_PAGE_USER_ANSWERS ||
          location === PROFILE_PAGE_USER_MEDIA ||
          location === PROFILE_PAGE_USER_LIKES) && (
          <UserPageComponent loadingPage={loadingPage} />
        )}
        {locationWithoutId === FOLLOWER_PAGE && usersStore.isAuth && (
          <FollowPageComponent loadingPage={loadingPage} />
        )}
        {locationWithoutId === FOLLOWING_PAGE && usersStore.isAuth && (
          <FollowPageComponent loadingPage={loadingPage} />
        )}
        {locationWithoutId === MESSAGE_PAGE && usersStore.isAuth && (
          <MessagesPageComponent loadingPage={loadingPage} />
        )} */}
      </div>
      <FooterMobileComponent />
    </div>
  );
});

export default AuthPage;
