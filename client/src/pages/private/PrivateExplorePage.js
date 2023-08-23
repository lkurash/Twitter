import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

import userApi from "../../http/userApi";
import twitsApi from "../../http/twitsApi";

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
      twitsApi.getAllTwits().then((alltwits) => twitsStore.setTwits(alltwits));

      usersStore.setAuth(getFlagIsAuth());

      userApi
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
