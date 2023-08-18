import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "..";

import twitsApi from "../http/twitsApi";
import userApi from "../http/userApi";

import SidebarContent from "../components/SidebarContent";
import ContentExplorePage from "../components/ContentExplorePage";
import trendsApi from "../http/trendsApi";

const PublicHomePage = observer(({ children }) => {
  const { usersStore } = useContext(Context);
  const { trendsStore } = useContext(Context);
  const { twitsStore } = useContext(Context);

  useEffect(() => {
    try {
      // trendsApi
      //   .getAllTrends()
      //   .then((allTrends) => trendsStore.setTrends(allTrends));
      userApi.getAllUsers().then((users) => usersStore.setAllUsers(users));
      twitsApi.getAllTwits().then((alltwits) => twitsStore.setTwits(alltwits));
    } catch (error) {
      console.log(error.response.data.message);
    }
  });
  return (
    <>
      <ContentExplorePage />
      <SidebarContent />
    </>
  );
});
export default PublicHomePage;
