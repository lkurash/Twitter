import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import FooterMobileComponent from "../components/FooterMobileComponent";
import MenuComponent from "../components/MenuComponent";
import SidebarComponent from "../components/SidebarComponent";
import UserMessagesComponent from "../components/UserMessagesComponent";
import { getAllUsers, getUserInfo } from "../hhtp/userApi";
import { TWITTER_PAGE } from "../utils/constans";

const MessagesPage = observer(()=>{
  const {user} = useContext(Context);
  const navigate = useNavigate();

  if (user.isAuth) {
    useEffect(() => {
      try {
        getUserInfo().then((data) => user.setUser(data));
        getAllUsers().then((data) => user.setAllUsers(data));
      } catch (error) {
        console.log(error.response.data.message);
      }
    });
  } else {
    useEffect(() => {
      navigate(TWITTER_PAGE);
    });
  }

  return(
    <div>
      <div className="page">
        <MenuComponent />
        <div className="main-wrapper">
          <main className="main">
            <div className="user-main-content">
              <UserMessagesComponent />
            </div>
          </main>
        </div>
        <SidebarComponent />
      </div>
      <FooterMobileComponent />
    </div>
  );
});

export default MessagesPage;
