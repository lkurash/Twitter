import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../..";

import SidebarContent from "../../components/SidebarContent";
import ContentHomePage from "../../components/ContentHomePage";

import getAuthUserID from "../../utils/getAuthUserID";
import getFlagIsAuth from "../../utils/getFlagIsAuth";
import getInfoAuthPage from "../../utils/getInfoAuthPage";
import twitsClient from "../../http/twitsClient";
import usersClient from "../../http/usersClient";

const HomePage = observer(({ loadingPage }) => {
  const { usersStore } = useContext(Context);
  const { favoriteTwitsStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const { retwitsStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const authUserID = getAuthUserID();

  useEffect(() => {
    usersClient
      .getUserProfile(authUserID)
      .then((userInfo) => usersStore.setUser(userInfo));

    usersClient
      .getFollowingsUser(authUserID)
      .then((followings) => usersFollowingsStore.setuserFollowing(followings));

    usersClient
      .getFollowersUser(authUserID)
      .then((followers) => usersFollowingsStore.setuserFollowers(followers));

    // twitsClient.getTwitsByUser(authUserID).then((usersTwits) => {
    //   twitsStore.setUserTwits(usersTwits);
    // });

    twitsClient
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
