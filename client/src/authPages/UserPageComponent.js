import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "..";

import twitsApi from "../http/twitsApi";
import userApi from "../http/userApi";
import ContentUsersPage from "../components/ContentUsersPage";
import SidebarContent from "../components/SidebarContent";
import getAuthUserID from "../utils/getAuthUserID";
import getFlagIsAuth from "../utils/getFlagIsAuth";

const UserPageComponent = observer(({ loadingPage }) => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const { retwitsStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const { id } = useParams();
  const authUserID = getAuthUserID(usersStore);

  useEffect(() => {
    try {
      userApi
        .getUserById(authUserID)
        .then((userInfo) => usersStore.setUser(userInfo));

      userApi
        .getUserById(id)
        .then((userById) => usersStore.setUserPage(userById));

      twitsApi
        .getTwitsByUser(id)
        .then((usersTwits) => twitsStore.setUserTwits(usersTwits));

      userApi.getAllUsers().then((users) => usersStore.setAllUsers(users));

      twitsApi.getAllTwits().then((allTwits) => twitsStore.setTwits(allTwits));

      userApi
        .getFollowingUsers(id)
        .then((followings) =>
          usersFollowingsStore.setuserFollowing(followings)
        );

      userApi
        .getFollowerUsers(id)
        .then((followers) => usersFollowingsStore.setuserFollowers(followers));

      twitsApi
        .getTwitsIdWithUsersLike(authUserID)
        .then((ids) => twitsStore.setTwitsIdWithUsersLike(ids));

      twitsApi
        .getUserRetwits(authUserID)
        .then((retwits) => retwitsStore.setUserRetwits(retwits));
        
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
