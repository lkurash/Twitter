import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "..";

import userClient from "../http/userClient";

import getAuthUserID from "../utils/getAuthUserID";

import ListWhoReadUserHomePage from "../components/ListWhoReadUserHomePage";

const MainSectionWhoToRead = observer((props) => {
  const { usersStore } = useContext(Context);
  const authUserID = getAuthUserID(usersStore);

  useEffect(() => {
    if (authUserID) {
      userClient.getUsers().then((users) => usersStore.setAllUsers(users));
      userClient
        .getWhoNotReadingUsers(authUserID)
        .then((users) => usersStore.setUsersWhoToReadUsers(users));
    } else {
      userClient.getUsers().then((users) => {
        usersStore.setUsersWhoToReadUsers(users);
        usersStore.setAllUsers(users);
      });
    }
  }, []);

  return (
    <section className={props.className}>
      <h2 className="main-section-name">Who to read</h2>
      <ListWhoReadUserHomePage users={usersStore.usersWhoToReadUsers} />
    </section>
  );
});

export default MainSectionWhoToRead;
