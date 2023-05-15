import { observer } from "mobx-react-lite";
import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "..";
import FooterMobileComponent from "../components/FooterMobileComponent";

import MenuComponent from "../components/MenuComponent";
import ProfileUserComponent from "../components/ProfileUserComponent";
import SidebarComponent from "../components/SidebarComponent";
import {
  getAllTwits,
  getRetwitsByUser,
  getTwitsByUser,
} from "../hhtp/twitsApi";
import {
  getFollowersUser,
  getFollowingUser,
  getUserInfo,
  getUserPage,
} from "../hhtp/userApi";
import { TWITTER_PAGE } from "../utils/constans";

const UserPage = observer(() => {
  const { user } = useContext(Context);
  const { twits } = useContext(Context);
  const { retwits } = useContext(Context);
  const ref = useRef();
  const { id } = useParams();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    ref.current.scrollIntoView();
  });

  if (user.isAuth) {
    useEffect(() => {
      try {
        getUserPage(id).then((data) => user.setUserPage(data));
        getTwitsByUser(id).then((data) => twits.setUserTwits(data));
        getAllTwits().then((data) => twits.setTwits(data));
        getRetwitsByUser(id).then((data) => retwits.setRetwits(data));
        getFollowingUser(id).then((data) => user.setuserFollowing(data));
        getFollowersUser(id).then((data) => user.setuserFollowers(data));
        getUserInfo().then((data) => user.setUser(data));
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
    <div>
      <div className="page">
        <MenuComponent />
        <div className="main-wrapper" ref={ref}>
          <main className="main">
            <ProfileUserComponent />
          </main>
        </div>
        <SidebarComponent />
      </div>
      <FooterMobileComponent />
    </div>
  );
});

export default UserPage;
