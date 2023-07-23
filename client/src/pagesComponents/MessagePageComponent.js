import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "..";

import { getAllUsers } from "../http/userApi";
import FooterMobileComponent from "../components/FooterMobileComponent";
import MenuComponent from "../components/MenuComponent";
import SidebarContent from "../components/SidebarContent";
import ContentMessagesPage from "../components/ContentMessagesPage";

import "../App.css";
import "../components/common/common.css";
import "../components/main.css";
import "../components/userpage.css";

const MessagesPageComponent = observer(() => {
  const { usersStore } = useContext(Context);

  useEffect(() => {
    try {
      getAllUsers().then((users) => usersStore.setAllUsers(users));
    } catch (error) {
      console.log(error.response.data.message);
    }
  });

  return (
    <>
      <main className="main-wrapper">
        <div className="main">
          <div className="user-main-content">
            <ContentMessagesPage />
          </div>
        </div>
      </main>
      <SidebarContent />
    </>
  );
});

export default MessagesPageComponent;
