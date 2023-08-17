import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "..";

import SidebarContent from "../components/SidebarContent";
import ContentHomePage from "../components/ContentHomePage";
import getAuthUserID from "../utils/getAuthUserID";

import "../App.css";
import "../components/common/common.css";
import "../components/main.css";
import "../components/userpage.css";
import getFlagIsAuth from "../utils/getFlagIsAuth";
import getInfoAuthPage from "../utils/getInfoAuthPage";
import trendsApi from "../http/trendsApi";
import twitsApi from "../http/twitsApi";
import userApi from "../http/userApi";

const HomePageComponent = observer(({ loadingPage }) => {
  const { usersStore } = useContext(Context);
  const { favoriteTwitsStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const { retwitsStore } = useContext(Context);
  const { trendsStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const authUserID = getAuthUserID(usersStore);

  useEffect(() => {
    userApi
      .getUserById(authUserID)
      .then((userInfo) => usersStore.setUser(userInfo));

    userApi
      .getFollowingUsers(authUserID)
      .then((followings) => usersFollowingsStore.setuserFollowing(followings));

    userApi
      .getFollowerUsers(authUserID)
      .then((followers) => usersFollowingsStore.setuserFollowers(followers));

    twitsApi.getTwitsByUser(authUserID).then((usersTwits) => {
      twitsStore.setUserTwits(usersTwits);
    });

    twitsApi
      .getTwitsByFollowingsUsers(authUserID)
      .then((twits) => twitsStore.setTwitsWhoReading(twits));

    trendsApi
      .getAllTrends()
      .then((allTrends) => trendsStore.setTrends(allTrends));

    getInfoAuthPage(
      authUserID,
      usersStore,
      usersFollowingsStore,
      twitsStore,
      retwitsStore,
      favoriteTwitsStore,
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

export default HomePageComponent;
