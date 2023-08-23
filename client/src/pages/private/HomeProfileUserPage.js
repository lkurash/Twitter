import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../..";

import twitsApi from "../../http/twitsApi";
import userApi from "../../http/userApi";

import ContentUserProfilePage from "../../components/ContentUserProfilePage";
import SidebarContent from "../../components/SidebarContent";
import getAuthUserID from "../../utils/getAuthUserID";
import getFlagIsAuth from "../../utils/getFlagIsAuth";
import getInfoAuthPage from "../../utils/getInfoAuthPage";

const HomeProfileUserPage = observer(({ loadingPage }) => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const { favoriteTwitsStore } = useContext(Context);
  const { retwitsStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const authUserID = getAuthUserID();

  useEffect(() => {
    try {
      userApi
        .getUserProfile(authUserID)
        .then((userById) => usersStore.setUserPage(userById));

      if (authUserID) {
        userApi
          .getUserProfile(authUserID)
          .then((userInfo) => usersStore.setUser(userInfo));
      }

      twitsApi
        .getTwitsByUser(authUserID)
        .then((usersTwits) => twitsStore.setUserTwits(usersTwits));

      userApi
        .getFollowingsUser(authUserID)
        .then((followings) =>
          usersFollowingsStore.setuserFollowing(followings)
        );

      userApi
        .getFollowersUser(authUserID)
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
          <ContentUserProfilePage pathHomeProfileUser />
        </main>
      </div>
      <SidebarContent />
    </>
  );
});

export default HomeProfileUserPage;
