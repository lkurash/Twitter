import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../..";

import SidebarContent from "../../components/SidebarContent";
import ContentHomePage from "../../components/ContentHomePage";

import getAuthUserID from "../../utils/getAuthUserID";
import getFlagIsAuth from "../../utils/getFlagIsAuth";
import getInfoAuthPage from "../../utils/getInfoAuthPage";
import twitsApi from "../../http/twitsApi";
import userApi from "../../http/userApi";

const HomePage = observer(({ loadingPage }) => {
  const { usersStore } = useContext(Context);
  const { favoriteTwitsStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const { retwitsStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const authUserID = getAuthUserID();

  useEffect(() => {
    userApi
      .getUserProfile(authUserID)
      .then((userInfo) => usersStore.setUser(userInfo));

    userApi
      .getFollowingsUser(authUserID)
      .then((followings) => usersFollowingsStore.setuserFollowing(followings));

    userApi
      .getFollowersUser(authUserID)
      .then((followers) => usersFollowingsStore.setuserFollowers(followers));

    twitsApi.getTwitsByUser(authUserID).then((usersTwits) => {
      twitsStore.setUserTwits(usersTwits);
    });

    twitsApi
      .getTwitsByFollowingsUsers(authUserID)
      .then((twits) => twitsStore.setTwitsWhoReading(twits));

    getInfoAuthPage(
      authUserID,
      usersStore,
      usersFollowingsStore,
      twitsStore,
      retwitsStore,
      favoriteTwitsStore
    );

    usersStore.setAuth(getFlagIsAuth());
  });

  return (
    <>
      <ContentHomePage />
      <SidebarContent />
    </>
  );
});

export default HomePage;
