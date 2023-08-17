import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "..";

import twitsApi from "../http/twitsApi";
import userApi from "../http/userApi";
import ContentUsersPage from "../components/ContentUsersPage";
import SidebarContent from "../components/SidebarContent";
import getAuthUserID from "../utils/getAuthUserID";
import getFlagIsAuth from "../utils/getFlagIsAuth";
import getInfoAuthPage from "../utils/getInfoAuthPage";

const UserPageComponent = observer(({ loadingPage }) => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const { favoriteTwitsStore } = useContext(Context);
  const { retwitsStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const { id } = useParams();
  const authUserID = getAuthUserID(usersStore);

  useEffect(() => {
    try {
      userApi
        .getUserById(id)
        .then((userById) => usersStore.setUserPage(userById));

      userApi
        .getUserById(authUserID)
        .then((userInfo) => usersStore.setUser(userInfo));

      twitsApi
        .getTwitsByUser(id)
        .then((usersTwits) => twitsStore.setUserTwits(usersTwits));

      userApi
        .getFollowingUsers(id)
        .then((followings) =>
          usersFollowingsStore.setuserFollowing(followings)
        );

      userApi
        .getFollowerUsers(id)
        .then((followers) => usersFollowingsStore.setuserFollowers(followers));

      getInfoAuthPage(
        authUserID,
        usersStore,
        usersFollowingsStore,
        twitsStore,
        retwitsStore,
        favoriteTwitsStore
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
          <ContentUsersPage />
        </main>
      </div>
      <SidebarContent />
    </>
  );
});

export default UserPageComponent;