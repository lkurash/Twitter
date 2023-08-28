import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

import usersClient from "../../http/usersClient";
import twitsClient from "../../http/twitsClient";

import getFlagIsAuth from "../../utils/getFlagIsAuth";
import getAuthUserID from "../../utils/getAuthUserID";

import SidebarContent from "../../components/SidebarContent";
import ContentExplorePageAllTwits from "../../components/ContentExplorePageAllTwits";

const PrivateExplorePage = observer(() => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const authUserID = getAuthUserID(usersStore);

  useEffect(() => {
    try {
      twitsClient
        .getAllTwits()
        .then((alltwits) => twitsStore.setTwits(alltwits));

      usersStore.setAuth(getFlagIsAuth());

      usersClient
        .getUserProfile(authUserID)
        .then((userInfo) => usersStore.setUser(userInfo));
    } catch (error) {
      console.log(error.response.data.message);
    }
  }, []);

  return (
    <>
      <ContentExplorePageAllTwits />
      <SidebarContent />
    </>
  );
});

export default PrivateExplorePage;
