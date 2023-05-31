import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "..";
import MenuComponent from "../components/MenuComponent";
import SidebarComponent from "../components/SidebarComponent";
import {
  getFollowersUser,
  getFollowingUser,
  getUserInfo,
  getUserById,
} from "../http/userApi";
import ContentFollowPage from "../components/ContentFollowPage";
import { TWITTER_PAGE } from "../utils/constans";

const FollowPage = observer(() => {
  const { user } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();

  if (user.isAuth) {
    useEffect(() => {
      try {
        getFollowingUser(id).then((allFollowing) => user.setuserFollowing(allFollowing));
        getFollowersUser(id).then((allFollowers) => user.setuserFollowers(allFollowers));
        getUserInfo().then((userInfo) => user.setUser(userInfo));
        getUserById(id).then((userById) => user.setUserPage(userById));
      } catch (error) {
        console.log(error.response.data.message);
      }
    });
  } else {
    useEffect(() => {
      navigate(TWITTER_PAGE);
    });
  }

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

export default FollowPage;
