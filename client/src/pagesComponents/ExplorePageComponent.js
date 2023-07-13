import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";

import ContentExplorePage from "../components/ContentExplorePage";
import { getAllTopics } from "../http/topicsApi";
import { getAllUsers } from "../http/userApi";
import { getAllTwits } from "../http/twitsApi";
import MenuComponent from "../components/MenuComponent";
import SidebarContent from "../components/SidebarContent";
import FooterComponent from "../components/FooterComponent";
import ContentExplorePageAllTwits from "../components/ContentExplorePageAllTwits";

import "../components/main.css";

const MainComponentExplorePage = observer(() => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const { topicsStore } = useContext(Context);

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
    <div>
      <div className="page">
        <MenuComponent />
        {usersStore.isAuth ? <ContentExplorePageAllTwits /> : <ContentExplorePage />}
        <SidebarContent />
      </div>
      {!usersStore.isAuth && <FooterComponent />}
    </div>
  );
});

export default MainComponentExplorePage;
