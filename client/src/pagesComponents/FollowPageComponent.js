import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "..";

import {
  getFollowerUsers,
  getFollowingUsers,
  getUserById,
  getAllUsers,
} from "../http/userApi";
import ContentFollowPage from "../components/ContentFollowPage";
import SidebarContent from "../components/SidebarContent";

const FollowPageComponent = observer(() => {
  const { usersStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    try {
      getFollowingUsers(id).then((followings) =>
        usersFollowingsStore.setuserFollowing(followings)
      );
      getFollowerUsers(id).then((followers) =>
        usersFollowingsStore.setuserFollowers(followers)
      );
      getAllUsers().then((users) => usersStore.setAllUsers(users));
      getUserById(id).then((userById) => usersStore.setUserPage(userById));
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
