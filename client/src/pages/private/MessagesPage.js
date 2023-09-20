import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../..";

import userClient from "../../http/userClient";

import getFlagIsAuth from "../../utils/getFlagIsAuth";

import ContentMessagesPage from "../../components/ContentMessagesPage";

const MessagesPage = observer(() => {
  const { usersStore } = useContext(Context);

  useEffect(() => {
    try {
      userClient.getUsers().then((users) => usersStore.setAllUsers(users));
      usersStore.setAuth(getFlagIsAuth());
    } catch (error) {
      console.log(error.response.data.message);
    }
  });

  return (
    <>
      <ContentMessagesPage />
    </>
  );
});

export default MessagesPage;
