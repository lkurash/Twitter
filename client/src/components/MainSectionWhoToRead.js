import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "..";
import userApi from "../http/userApi";
import getAuthUserID from "../utils/getAuthUserID";

import ListWhoReadUserHomePage from "./ListWhoReadUserHomePage";

const MainSectionWhoToRead = observer((props) => {
  const { usersStore } = useContext(Context);
  const authUserID = getAuthUserID(usersStore);

  useEffect(() => {
    if (authUserID) {
      userApi
        .getWhoNotReadingUsers(authUserID)
        .then((users) => usersStore.setUsersWhoToReadUsers(users));
    } else {
      userApi
        .getAllUsers()
        .then((users) => usersStore.setUsersWhoToReadUsers(users));
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
