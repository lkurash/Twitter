import { useContext, useEffect } from "react";
import "./main.css";
import { observer } from "mobx-react-lite";
import MainContentExplorePage from "./MainContentExplorePage";
import { Context } from "..";
import { getAllTopics } from "../http/topicsApi";
import { getAllUsers } from "../http/userApi";
import { getAllTwits } from "../http/twitsApi";
import MenuComponent from "./MenuComponent";
import SidebarComponent from "./SidebarComponent";
import FooterComponent from "./FooterComponent";
import MainContentExplorePageAllTwits from "./MainContentExplorePageAllTwits";

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
        {user.isAuth ? (
          <MainContentExplorePageAllTwits />
        ) : (
          <MainContentExplorePage />
        )}
        <SidebarComponent />
      </div>
      {!user.isAuth && <FooterComponent />}
    </div>
  );
});

export default MainComponentExplorePage;
