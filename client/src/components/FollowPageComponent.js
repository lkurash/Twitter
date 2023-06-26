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
import ContentFollowPage from "./ContentFollowPage";
import MenuComponent from "./MenuComponent";
import SidebarComponent from "./SidebarComponent";

const FollowPageComponent = observer(() => {
  const { user } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    try {
      getFollowingUser(id).then((allFollowing) =>
        user.setuserFollowing(allFollowing)
      );
      getFollowersUser(id).then((allFollowers) =>
        user.setuserFollowers(allFollowers)
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
      <SidebarComponent />
    </div>
  );
});

export default FollowPageComponent;
