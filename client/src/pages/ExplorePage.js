import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";

import { getAllTopics } from "../http/topicsApi";
import userApi from "../http/userApi";
import twitsApi from "../http/twitsApi";

import SidebarContent from "../components/SidebarContent";
import ContentExplorePageAllTwits from "../components/ContentExplorePageAllTwits";

import "../App.css";
import "../components/common/common.css";
import getFlagIsAuth from "../utils/getFlagIsAuth";

const ExplorePage = observer(() => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const { topicsStore } = useContext(Context);

  useEffect(() => {
    try {
      getAllTopics().then((allTopics) => topicsStore.setTopics(allTopics));
      userApi.getAllUsers().then((users) => usersStore.setAllUsers(users));
      twitsApi.getAllTwits().then((alltwits) => twitsStore.setTwits(alltwits));
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

export default ExplorePage;
