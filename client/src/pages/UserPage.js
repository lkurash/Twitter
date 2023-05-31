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
} from "../http/twitsApi";
import {
  getFollowersUser,
  getFollowingUser,
  getUserInfo,
  getUserById,
} from "../http/userApi";
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
        getUserById(id).then((userById) => user.setUserPage(userById));
        getTwitsByUser(id).then((twitsById) => twits.setUserTwits(twitsById));
        getAllTwits().then((allTwits) => twits.setTwits(allTwits));
        getRetwitsByUser(id).then((retwitsByUser) => retwits.setRetwits(retwitsByUser));
        getFollowingUser(id).then((allFollowing) => user.setuserFollowing(allFollowing));
        getFollowersUser(id).then((allFollowers) => user.setuserFollowers(allFollowers));
        getUserInfo().then((userInfo) => user.setUser(userInfo));
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
