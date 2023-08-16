import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";

import trendsApi from "../http/trendsApi";
import userApi from "../http/userApi";
import twitsApi from "../http/twitsApi";

import SidebarContent from "../components/SidebarContent";
import ContentExplorePageAllTwits from "../components/ContentExplorePageAllTwits";

import "../App.css";
import "../components/common/common.css";
import getFlagIsAuth from "../utils/getFlagIsAuth";
import getAuthUserID from "../utils/getAuthUserID";

const ExplorePage = observer(() => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const { trendsStore } = useContext(Context);
  const authUserID = getAuthUserID(usersStore);

  useEffect(() => {
    try {
      trendsApi
        .getAllTrends()
        .then((allTrends) => trendsStore.setTrends(allTrends));
      userApi.getAllUsers().then((users) => usersStore.setAllUsers(users));
      twitsApi.getAllTwits().then((alltwits) => twitsStore.setTwits(alltwits));
      usersStore.setAuth(getFlagIsAuth());
      if (authUserID) {
        userApi
          .getUserById(authUserID)
          .then((userInfo) => usersStore.setUser(userInfo));
      }
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

export default ExplorePage;
