import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

import userClient from "../../http/userClient";
import twitClient from "../../http/twitClient";

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
      if (authUserID) {
        twitClient.getTwitsForAuthUser(authUserID).then((twits) => {
          twitsStore.setTwits(twits);
        });

        userClient
          .getUserProfile(authUserID)
          .then((userInfo) => usersStore.setUser(userInfo));
      }

      usersStore.setAuth(getFlagIsAuth());
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
