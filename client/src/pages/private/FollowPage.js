import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../..";

import usersClient from "../../http/usersClient";
import getFlagIsAuth from "../../utils/getFlagIsAuth";
import getAuthUserID from "../../utils/getAuthUserID";

import ContentFollowPage from "../../components/ContentFollowPage";
import SidebarContent from "../../components/SidebarContent";

const FollowPage = observer(() => {
  const { usersStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const { id } = useParams();
  const authUserID = getAuthUserID();

  useEffect(() => {
    try {
      usersClient
        .getUserProfile(id || authUserID)
        .then((userById) => usersStore.setUserPage(userById));

      usersClient
        .getFollowingsUser(id || authUserID)
        .then((followings) =>
          usersFollowingsStore.setuserFollowing(followings)
        );

      usersClient
        .getFollowersUser(id || authUserID)
        .then((followers) => usersFollowingsStore.setuserFollowers(followers));

      usersClient.getUsers().then((users) => usersStore.setAllUsers(users));

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

export default FollowPage;
