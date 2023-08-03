import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "..";

import { getAllTopics } from "../http/topicsApi";
import { getAllTwits } from "../http/twitsApi";
import { getAllUsers } from "../http/userApi";

import SidebarContent from "../components/SidebarContent";
import ContentExplorePage from "../components/ContentExplorePage";

const PublicHomePage = observer(({ children }) => {
  const { usersStore } = useContext(Context);
  const { topicsStore } = useContext(Context);
  const { twitsStore } = useContext(Context);

  useEffect(() => {
    try {
      getAllTopics().then((allTopics) => topicsStore.setTopics(allTopics));
      getAllUsers().then((users) => usersStore.setAllUsers(users));
      getAllTwits().then((alltwits) => twitsStore.setTwits(alltwits));
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
