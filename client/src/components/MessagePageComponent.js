import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "..";
import { getAllUsers } from "../http/userApi";
import FooterMobileComponent from "./FooterMobileComponent";
import MenuComponent from "./MenuComponent";
import SidebarComponent from "./SidebarComponent";
import UserMessagesComponent from "./UserMessagesComponent";
import "../App.css";
import "./common/common.css";
import "./main.css";
import "./userpage.css";

const MessagesPageComponent = observer(() => {
  const { user } = useContext(Context);

  useEffect(() => {
    try {
      getAllUsers().then((users) => user.setAllUsers(users));
    } catch (error) {
      console.log(error.response.data.message);
    }
  });

  return (
    <div>
      <div className="page">
        <MenuComponent />
        <main className="main-wrapper">
          <div className="main">
            <div className="user-main-content">
              <UserMessagesComponent />
            </div>
          </div>
        </main>
        <SidebarComponent />
      </div>
      <FooterMobileComponent />
    </div>
  );
});

export default MessagesPageComponent;
