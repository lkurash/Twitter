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
import MenuComponent from "../components/MenuComponent";
import SidebarContent from "../components/SidebarContent";

const FollowPageComponent = observer(() => {
  const { user } = useContext(Context);
  const { usersFollow } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    try {
      getFollowingUsers(id).then((followings) =>
        usersFollow.setuserFollowing(followings)
      );
      getFollowerUsers(id).then((followers) =>
        usersFollow.setuserFollowers(followers)
      );
      getAllUsers().then((users) => user.setAllUsers(users));
      getUserById(id).then((userById) => user.setUserPage(userById));
    } catch (error) {
      console.log(error.response.data.message);
    }
  });

  return (
    <div className="page">
      <MenuComponent />
      <div className="main-wrapper">
        <main className="main">
          <div className="user-main-content">
            <ContentFollowPage />
          </div>
        </main>
      </div>
      <SidebarContent />
    </div>
  );
});

export default FollowPageComponent;
