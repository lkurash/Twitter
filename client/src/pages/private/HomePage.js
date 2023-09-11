import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../..";

import SidebarContent from "../../components/SidebarContent";
import ContentHomePage from "../../components/ContentHomePage";

import getAuthUserID from "../../utils/getAuthUserID";
import getFlagIsAuth from "../../utils/getFlagIsAuth";
import usersClient from "../../http/usersClient";

const HomePage = observer(({ loadingPage }) => {
  const { usersStore } = useContext(Context);
  
  const authUserID = getAuthUserID();

  useEffect(() => {
    if (authUserID) {
      usersClient
        .getUserProfile(authUserID)
        .then((userInfo) => usersStore.setUser(userInfo));
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
