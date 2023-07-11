import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "..";
import {
  getFollowersUser,
  getFollowingUser,
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
      getFollowingUser(id).then((allFollowing) =>
        usersFollow.setuserFollowing(allFollowing)
      );
      getFollowersUser(id).then((allFollowers) =>
        usersFollow.setuserFollowers(allFollowers)
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
