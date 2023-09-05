import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../..";

import twitsClient from "../../http/twitsClient";
import usersClient from "../../http/usersClient";

import getAuthUserID from "../../utils/getAuthUserID";
import getFlagIsAuth from "../../utils/getFlagIsAuth";

import ContentUserProfilePage from "../../components/ContentUserProfilePage";
import SidebarContent from "../../components/SidebarContent";

const HomeProfileUserPage = observer(({ loadingPage }) => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const authUserID = getAuthUserID();

  useEffect(() => {
    try {
      if (authUserID) {
        usersClient.getUserProfile(authUserID).then((userInfo) => {
          usersStore.setUser(userInfo);
          usersStore.setUserPage(userInfo);
        });

        twitsClient.getTwitsWithUserLikes(authUserID).then((twits) => {
          twitsStore.setTwitsWithUsersLikes(twits);
        });

        twitsClient
          .getTwitsByUser(authUserID)
          .then((usersTwits) => twitsStore.setUserTwits(usersTwits));

        usersClient.getFollowingsUser(authUserID).then((followings) => {
          usersFollowingsStore.setuserFollowing(followings);
        });

        usersClient
          .getFollowersUser(authUserID)
          .then((followers) =>
            usersFollowingsStore.setuserFollowers(followers)
          );
      }

      usersStore.setAuth(getFlagIsAuth());
    } catch (error) {
      console.log(error.response.data.message);
    }
  }, []);

  return (
    <>
      <div className="main-wrapper">
        <main className="main">
          <ContentUserProfilePage pathHomeProfileUser />
        </main>
      </div>
      <SidebarContent />
    </>
  );
});

export default HomeProfileUserPage;
