import "../App.css";
import "../components/common/common.css";
import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import MenuComponent from "../components/MenuComponent";
import MainComponentTwitterPage from "../components/MainComponentTwitterPage";
import SidebarComponent from "../components/SidebarComponent";
import FooterComponent from "../components/FooterComponent";
import { Context } from "..";
import { getAllTwits } from "../hhtp/twitsApi";
import { getAllTopics } from "../hhtp/topicsApi";
import { getAllUsers, getUserInfo } from "../hhtp/userApi";

const TwitterPage = observer(()=> {
  const { user } = useContext(Context);
  const { twits } = useContext(Context);
  const { topics } = useContext(Context);

  useEffect(() => {
    try {
      getAllTopics().then((data) => topics.setTopics(data));
      getAllUsers().then((data) => user.setAllUsers(data));
      getAllTwits().then((data) => twits.setTwits(data));
    } catch (error) {
      console.log(error.response.data.message);
    }
  });

  if (user.isAuth) {
    useEffect(() => {
      try {
        getUserInfo().then((data) => user.setUser(data));
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
