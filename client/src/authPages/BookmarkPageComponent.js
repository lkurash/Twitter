import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "..";

import SidebarContent from "../components/SidebarContent";
import ContentBookmarksPage from "../components/ContentBookmarksPage";
import getAuthUserID from "../utils/getAuthUserID";
import getFlagIsAuth from "../utils/getFlagIsAuth";
import getInfoAuthPage from "../utils/getInfoAuthPage";
import userApi from "../http/userApi";

const BookmarksPageComponent = observer(() => {
  const { twitsStore } = useContext(Context);
  const { usersStore } = useContext(Context);
  const { retwitsStore } = useContext(Context);
  const { trendsStore } = useContext(Context);
  const { favoriteTwitsStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const authUserID = getAuthUserID(usersStore);

  useEffect(() => {
    try {
      userApi
        .getUserById(authUserID)
        .then((userInfo) => usersStore.setUser(userInfo));

      userApi
        .getFollowingUsers(authUserID)
        .then((followings) =>
          usersFollowingsStore.setuserFollowing(followings)
        );

      getInfoAuthPage(
        authUserID,
        usersStore,
        usersFollowingsStore,
        twitsStore,
        retwitsStore,
        favoriteTwitsStore,
        trendsStore
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
