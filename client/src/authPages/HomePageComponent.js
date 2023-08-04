import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "..";

import SidebarContent from "../components/SidebarContent";
import twitsApi from "../http/twitsApi";
import userApi from "../http/userApi";
import ContentHomePage from "../components/ContentHomePage";
import getAuthUserID from "../utils/getAuthUserID";

import "../App.css";
import "../components/common/common.css";
import "../components/main.css";
import "../components/userpage.css";
import getFlagIsAuth from "../utils/getFlagIsAuth";

const HomePageComponent = observer(({ loadingPage }) => {
  const { twitsStore } = useContext(Context);
  const { usersStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const authUserID = getAuthUserID(usersStore);

  useEffect(() => {
    userApi
      .getUserById(authUserID)
      .then((userInfo) => usersStore.setUser(userInfo));
    userApi.getAllUsers().then((users) => usersStore.setAllUsers(users));
    userApi
      .getFollowingUsers(authUserID)
      .then((followings) => usersFollowingsStore.setuserFollowing(followings));
    twitsApi.getTwitsByUser(authUserID).then((usersTwits) => {
      twitsStore.setUserTwits(usersTwits);
    });
    twitsApi.getAllTwits().then((alltwits) => {
      twitsStore.setTwits(alltwits);
    });

    twitsApi
      .getTwitsByFollowingsUsers(authUserID)
      .then((twits) => twitsStore.setTwitsWhoReading(twits));
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
