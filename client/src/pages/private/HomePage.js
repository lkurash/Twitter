import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../..";

import SidebarContent from "../../components/SidebarContent";
import ContentHomePage from "../../components/ContentHomePage";

import getAuthUserID from "../../utils/getAuthUserID";
import getFlagIsAuth from "../../utils/getFlagIsAuth";
import twitsClient from "../../http/twitsClient";
import usersClient from "../../http/usersClient";

const HomePage = observer(({ loadingPage }) => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const authUserID = getAuthUserID();

  useEffect(() => {
    if (authUserID) {
      usersClient
        .getUserProfile(authUserID)
        .then((userInfo) => usersStore.setUser(userInfo));

      usersClient
        .getFollowingsUser(authUserID)
        .then((followings) =>
          usersFollowingsStore.setuserFollowing(followings)
        );

      usersClient
        .getFollowersUser(authUserID)
        .then((followers) => usersFollowingsStore.setuserFollowers(followers));

      twitsClient
        .getTwitsByFollowingsUsers(authUserID)
        .then((twits) => twitsStore.setTwitsWhoReading(twits));

      twitsClient.getTwitsForAuthUser(authUserID).then((twits) => {
        twitsStore.setTwits(twits);
      });
    }

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
