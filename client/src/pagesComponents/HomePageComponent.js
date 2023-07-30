import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "..";

import SidebarContent from "../components/SidebarContent";
import { getAllTwits, getTwitsByUser } from "../http/twitsApi";
import { getAllUsers, getFollowingUsers, getUserById } from "../http/userApi";
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
    getUserById(authUserID).then((userInfo) => usersStore.setUser(userInfo));
    getAllUsers().then((users) => usersStore.setAllUsers(users));
    getFollowingUsers(authUserID).then((followings) =>
      usersFollowingsStore.setuserFollowing(followings)
    );
    getTwitsByUser(authUserID).then((usersTwits) =>
      twitsStore.setUserTwits(usersTwits)
    );
    getAllTwits().then((alltwits) => {
      twitsStore.setTwits(alltwits);
    });
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
