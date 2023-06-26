import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "..";
import FooterComponent from "../components/FooterComponent";
import MainContentExplorePageAllTwits from "../components/MainContentExplorePageAllTwits";
import MenuComponent from "../components/MenuComponent";
import SidebarComponent from "../components/SidebarComponent";
import { getAllTopics } from "../http/topicsApi";
import { getAllTwits } from "../http/twitsApi";
import { getAllUsers } from "../http/userApi";

const TwitterPage = observer(() => {
  const { user } = useContext(Context);
  const { topics } = useContext(Context);
  const { twits } = useContext(Context);

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
        <MainContentExplorePageAllTwits />
        <SidebarComponent />
      </div>
      {!user.isAuth && <FooterComponent />}
    </div>
  );
});
export default TwitterPage;
