import "../App.css";
import "../components/common/common.css";
import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import MenuComponent from "../components/MenuComponent";
import MainComponentTwitterPage from "../components/MainComponentTwitterPage";
import SidebarComponent from "../components/SidebarComponent";
import FooterComponent from "../components/FooterComponent";
import { Context } from "..";
import { getAllTwits } from "../http/twitsApi";
import { getAllTopics } from "../http/topicsApi";
import { getAllUsers, getUserInfo } from "../http/userApi";

const TwitterPage = observer(()=> {
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

  if (user.isAuth) {
    useEffect(() => {
      try {
        getUserInfo().then((userInfo) => user.setUser(userInfo));
      } catch (error) {
        console.log(error.response.data.message);
      }
    });
  }
  return (
    <div>
      <div className="page">
        <MenuComponent />
        <MainComponentTwitterPage />
        <SidebarComponent />
      </div>
      {!user.isAuth && <FooterComponent />}
    </div>
  );
});

export default TwitterPage;
