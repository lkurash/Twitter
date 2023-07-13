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
  const { user } = useContext(Context);
  const { twits } = useContext(Context);
  const { topics } = useContext(Context);

  useEffect(() => {
    try {
      getAllTopics().then((allTopics) => topics.setTopics(allTopics));
      getAllUsers().then((users) => user.setAllUsers(users));
      getAllTwits().then((alltwits) => twits.setTwits(alltwits));
    } catch (error) {
      console.log(error.response.data.message);
    }
  });

  return (
    <div>
      <div className="page">
        <MenuComponent />
        {user.isAuth ? <ContentExplorePageAllTwits /> : <ContentExplorePage />}
        <SidebarContent />
      </div>
      {!user.isAuth && <FooterComponent />}
    </div>
  );
});

export default MainComponentExplorePage;
