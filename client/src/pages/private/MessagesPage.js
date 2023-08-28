import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../..";

import usersClient from "../../http/usersClient";

import getFlagIsAuth from "../../utils/getFlagIsAuth";

import SidebarContent from "../../components/SidebarContent";
import ContentMessagesPage from "../../components/ContentMessagesPage";

const MessagesPage = observer(() => {
  const { usersStore } = useContext(Context);

  useEffect(() => {
    try {
      usersClient.getUsers().then((users) => usersStore.setAllUsers(users));
      usersStore.setAuth(getFlagIsAuth());
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

export default MessagesPage;
