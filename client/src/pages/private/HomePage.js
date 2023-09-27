import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../..";

import SidebarContent from "../../components/SidebarContent";
import ContentHomePage from "../../components/ContentHomePage";

import getAuthUserID from "../../utils/getAuthUserID";
import getFlagIsAuth from "../../utils/getFlagIsAuth";
import userClient from "../../http/userClient";

const HomePage = observer(({ loadingPage }) => {
  const { usersStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);

  const authUserID = getAuthUserID();

  useEffect(() => {
    if (authUserID) {
      userClient
        .getUserProfile(authUserID)
        .then((userInfo) => usersStore.setUser(userInfo));
        
      userClient
        .getFollowingsUser(authUserID)
        .then((followings) =>
          usersFollowingsStore.setuserFollowing(followings)
        );
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
