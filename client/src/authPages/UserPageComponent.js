import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "..";

import { getAllTwits, getTwitsByUser } from "../http/twitsApi";
import {
  getFollowerUsers,
  getFollowingUsers,
  getUserById,
  getAllUsers,
} from "../http/userApi";
import ContentUsersPage from "../components/ContentUsersPage";
import SidebarContent from "../components/SidebarContent";
import getAuthUserID from "../utils/getAuthUserID";
import getFlagIsAuth from "../utils/getFlagIsAuth";

const UserPageComponent = observer(({ loadingPage }) => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const { id } = useParams();
  const authUserID = getAuthUserID(usersStore);

  useEffect(() => {
    try {
      getUserById(authUserID).then((userInfo) => usersStore.setUser(userInfo));
      getUserById(id).then((userById) => usersStore.setUserPage(userById));
      getTwitsByUser(id).then((usersTwits) =>
        twitsStore.setUserTwits(usersTwits)
      );
      getAllUsers().then((users) => usersStore.setAllUsers(users));
      getAllTwits().then((allTwits) => twitsStore.setTwits(allTwits));
      getFollowingUsers(id).then((followings) =>
        usersFollowingsStore.setuserFollowing(followings)
      );
      getFollowerUsers(id).then((followers) =>
        usersFollowingsStore.setuserFollowers(followers)
      );
      usersStore.setAuth(getFlagIsAuth());
    } catch (error) {
      console.log(error.response.data.message);
    }
  });

  return (
    <>
      <div className="main-wrapper">
        <main className="main">
          <ContentUsersPage />
        </main>
      </div>
      <SidebarContent />
    </>
  );
});

export default UserPageComponent;
