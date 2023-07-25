import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "..";

import FooterComponent from "../components/FooterComponent";
import MenuComponent from "../components/MenuComponent";
import SidebarContent from "../components/SidebarContent";
import { getAllTopics } from "../http/topicsApi";
import { getAllTwits } from "../http/twitsApi";
import { getAllUsers } from "../http/userApi";
import ContentExplorePage from "../components/ContentExplorePage";

const TwitterPage = observer(() => {
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
    <div>
      <div className="page">
        <MenuComponent show={true} />
        <ContentExplorePage />
        <SidebarContent />
      </div>
      {!usersStore.isAuth && <FooterComponent />}
    </div>
  );
});
export default TwitterPage;
