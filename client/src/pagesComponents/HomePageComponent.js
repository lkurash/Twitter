import { observer } from "mobx-react-lite";
import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { Context } from "..";

import MenuComponent from "../components/MenuComponent";
import SidebarContent from "../components/SidebarContent";
import {
  getAllTwits,
  getRetwitsByUser,
  getTwitsByUser,
} from "../http/twitsApi";
import { getAllUsers, getFollowingUsers } from "../http/userApi";
import FooterMobileComponent from "../components/FooterMobileComponent";
import ContentHomePage from "../components/ContentHomePage";
import getAuthUserID from "../utils/getAuthUserID";

import "../App.css";
import "../components/common/common.css";
import "../components/main.css";
import "../components/userpage.css";

const HomePageComponent = observer(() => {
  const { twitsStore } = useContext(Context);
  const { usersStore } = useContext(Context);
  const { retwitsStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const ref = useRef();
  const authUserID = getAuthUserID(usersStore);

  useLayoutEffect(() => {
    ref.current.scrollIntoView();
  });

  useEffect(() => {
    getRetwitsByUser(authUserID).then((retwitsByUser) =>
      retwitsStore.setRetwits(retwitsByUser)
    );
    getAllUsers().then((users) => usersStore.setAllUsers(users));
    getFollowingUsers(authUserID).then((followings) =>
      usersFollowingsStore.setuserFollowing(followings)
    );
    getTwitsByUser(authUserID).then((usersTwits) =>
      twitsStore.setUserTwits(usersTwits)
    );
    getAllTwits().then((alltwits) => {
      twitsStore.setTwits(alltwits);
    });
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
