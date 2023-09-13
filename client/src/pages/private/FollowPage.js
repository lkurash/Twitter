import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../..";

import userClient from "../../http/userClient";
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
      if (authUserID) {
        userClient
          .getUserProfile(id || authUserID)
          .then((userById) => usersStore.setUserPage(userById));

        userClient
          .getFollowingsUser(id || authUserID)
          .then((followings) =>
            usersFollowingsStore.setuserFollowing(followings)
          );

        userClient
          .getFollowersUser(id || authUserID)
          .then((followers) =>
            usersFollowingsStore.setuserFollowers(followers)
          );
      }

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
