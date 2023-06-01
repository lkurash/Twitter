import { observer } from "mobx-react-lite";
import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Context } from "..";
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
import FooterMobileComponent from "./FooterMobileComponent";
import MenuComponent from "./MenuComponent";
import ProfileUserComponent from "./ProfileUserComponent";
import SidebarComponent from "./SidebarComponent";

const UserPageComponent = observer(() => {
  const { user } = useContext(Context);
  const { twits } = useContext(Context);
  const { retwits } = useContext(Context);
  const ref = useRef();
  const { id } = useParams();

  useLayoutEffect(() => {
    ref.current.scrollIntoView();
  },[]);

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

  return (
    <div>
      <div className="page">
        <MenuComponent />
        <div className="main-wrapper" ref={ref}>
          <main className="main">
            <ProfileUserComponent/>
          </main>
        </div>
        <SidebarComponent />
      </div>
      <FooterMobileComponent />
    </div>
  );
});

export default UserPageComponent;
