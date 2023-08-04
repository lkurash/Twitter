import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "..";

import twitsApi from "../http/twitsApi";
import userApi from "../http/userApi";

import SidebarContent from "../components/SidebarContent";
import ContentBookmarksPage from "../components/ContentBookmarksPage";
import getAuthUserID from "../utils/getAuthUserID";
import getFlagIsAuth from "../utils/getFlagIsAuth";

const BookmarksPageComponent = observer(() => {
  const { twitsStore } = useContext(Context);
  const { usersStore } = useContext(Context);
  const { favoriteTwitsStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const authUserID = getAuthUserID(usersStore);

  useEffect(() => {
    try {
      userApi
        .getUserById(authUserID)
        .then((userInfo) => usersStore.setUser(userInfo));
      twitsApi.getAllTwits().then((alltwits) => twitsStore.setTwits(alltwits));
      twitsApi
        .getFavoriteTwits(authUserID)
        .then((favoriteTwitsByUser) =>
          favoriteTwitsStore.setFavoriteTwits(favoriteTwitsByUser)
        );
      userApi.getAllUsers().then((users) => usersStore.setAllUsers(users));
      userApi
        .getFollowingUsers(authUserID)
        .then((followings) =>
          usersFollowingsStore.setuserFollowing(followings)
        );
      usersStore.setAuth(getFlagIsAuth());
    } catch (error) {
      console.log(error.response.data.message);
    }
  });

  return (
    <>
      <div className="main-wrapper">
        <main className="main">
          <div className="user-main-content">
            <ContentBookmarksPage />
          </div>
        </main>
      </div>
      <SidebarContent />
    </>
  );
});

export default BookmarksPageComponent;
