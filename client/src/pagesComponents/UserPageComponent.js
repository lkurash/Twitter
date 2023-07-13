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
  getFollowingsUser,
  getUserById,
  getAllUsers,
} from "../http/userApi";
import FooterMobileComponent from "../components/FooterMobileComponent";
import MenuComponent from "../components/MenuComponent";
import ContentUsersPage from "../components/ContentUsersPage";
import SidebarContent from "../components/SidebarContent";

const UserPageComponent = observer(() => {
  const { user } = useContext(Context);
  const { twits } = useContext(Context);
  const { usersFollow } = useContext(Context);
  const { retwits } = useContext(Context);
  const ref = useRef();
  const { id } = useParams();

  useLayoutEffect(() => {
    ref.current.scrollIntoView();
  }, []);

  useEffect(() => {
    try {
      getUserById(id).then((userById) => user.setUserPage(userById));
      getTwitsByUser(id).then((usersTwits) => twits.setUserTwits(usersTwits));
      getAllUsers().then((users) => user.setAllUsers(users));
      getAllTwits().then((allTwits) => twits.setTwits(allTwits));
      getRetwitsByUser(id).then((retwitsByUser) =>
        retwits.setRetwits(retwitsByUser)
      );
      getFollowingsUser(id).then((followings) =>
        usersFollow.setuserFollowing(followings)
      );
      getFollowersUser(id).then((followers) =>
        usersFollow.setuserFollowers(followers)
      );
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
            <ContentUsersPage />
          </main>
        </div>
        <SidebarContent />
      </div>
      <FooterMobileComponent />
    </div>
  );
});

export default UserPageComponent;
