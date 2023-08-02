import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "..";

import { getAllTwits, getFavoriteTwits } from "../http/twitsApi";
import { getAllUsers, getFollowingUsers, getUserById } from "../http/userApi";

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
      getUserById(authUserID).then((userInfo) => usersStore.setUser(userInfo));
      getAllTwits().then((alltwits) => twitsStore.setTwits(alltwits));
      getFavoriteTwits(authUserID).then((favoriteTwitsByUser) =>
        favoriteTwitsStore.setFavoriteTwits(favoriteTwitsByUser)
      );
      getAllUsers().then((users) => usersStore.setAllUsers(users));
      getFollowingUsers(authUserID).then((followings) =>
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
