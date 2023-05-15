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
  getUserPage,
} from "../hhtp/userApi";
import ContentFollowPage from "../components/ContentFollowPage";
import { TWITTER_PAGE } from "../utils/constans";

const FollowPage = observer(() => {
  const { user } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();

  if (user.isAuth) {
    useEffect(() => {
      try {
        getFollowingUser(id).then((data) => user.setuserFollowing(data));
        getFollowersUser(id).then((data) => user.setuserFollowers(data));
        getUserInfo().then((data) => user.setUser(data));
        getUserPage(id).then((data) => user.setUserPage(data));
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
