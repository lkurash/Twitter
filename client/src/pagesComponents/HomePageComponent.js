import { observer } from "mobx-react-lite";
import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { Context } from "..";
import "../App.css";
import "../components/common/common.css";
import "../components/main.css";
import "../components/userpage.css";
import MenuComponent from "../components/MenuComponent";
import SidebarContent from "../components/SidebarContent";
import {
  getAllTwits,
  getRetwitsByUser,
  getTwitsByUser,
} from "../http/twitsApi";
import { getAllUsers, getFollowingUser } from "../http/userApi";
import FooterMobileComponent from "../components/FooterMobileComponent";
import ContentHomePage from "../components/ContentHomePage";
import getAuthUserID from "../utils/getAuthUserID";

const HomePageComponent = observer(() => {
  const { twits } = useContext(Context);
  const { user } = useContext(Context);
  const { retwits } = useContext(Context);
  const { usersFollow } = useContext(Context);
  const ref = useRef();
  const authUserID = getAuthUserID(user);

  useLayoutEffect(() => {
    ref.current.scrollIntoView();
  });

  useEffect(() => {
    getRetwitsByUser(authUserID).then((retwitsByUser) =>
      retwits.setRetwits(retwitsByUser)
    );
    getAllUsers().then((users) => user.setAllUsers(users));
    getFollowingUser(authUserID).then((allFollowing) =>
      usersFollow.setuserFollowing(allFollowing)
    );
    getTwitsByUser(authUserID).then((twitsById) =>
      twits.setUserTwits(twitsById)
    );
    getAllTwits().then((alltwits) => twits.setTwits(alltwits));
  });

  return (
    <div>
      <div className="page" ref={ref}>
        <MenuComponent />
        <ContentHomePage />
        <SidebarContent />
      </div>
      <FooterMobileComponent />
    </div>
  );
});

export default HomePageComponent;
