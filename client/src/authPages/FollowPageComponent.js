import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "..";

import userApi from "../http/userApi";
import ContentFollowPage from "../components/ContentFollowPage";
import SidebarContent from "../components/SidebarContent";
import getFlagIsAuth from "../utils/getFlagIsAuth";

const FollowPageComponent = observer(() => {
  const { usersStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    try {
      userApi
        .getFollowingUsers(id)
        .then((followings) =>
          usersFollowingsStore.setuserFollowing(followings)
        );

      userApi
        .getFollowerUsers(id)
        .then((followers) => usersFollowingsStore.setuserFollowers(followers));

      userApi
        .getUserById(id)
        .then((userById) => usersStore.setUserPage(userById));

      userApi.getAllUsers().then((users) => usersStore.setAllUsers(users));

      usersStore.setAuth(getFlagIsAuth());
    } catch (error) {
      console.log(error.response.data.message);
    }
  });

  return (
    <>
      <div className="main-wrapper">
        <main className="main">
          <div className="user-main-content">
            <ContentFollowPage />
          </div>
        </main>
      </div>
      <SidebarContent />
    </>
  );
});

export default FollowPageComponent;
