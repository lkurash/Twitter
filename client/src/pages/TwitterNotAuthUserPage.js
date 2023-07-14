import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "..";

import FooterComponent from "../components/FooterComponent";
import MenuComponent from "../components/MenuComponent";
import SidebarContent from "../components/SidebarContent";
import TwitterNotAuthProfileUser from "../components/TwitterNotAuthProfileUser";
import {
  getAllTwits,
  getRetwitsByUser,
  getTwitsByUser,
} from "../http/twitsApi";
import {
  getFollowerUsers,
  getFollowingUsers,
  getUserById,
} from "../http/userApi";

const TwitterPageNotAuthUser = observer(() => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const { retwitsStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    getUserById(id).then((userById) => usersStore.setUserPage(userById));
    getTwitsByUser(id).then((usersTwits) => twitsStore.setUserTwits(usersTwits));
    getAllTwits().then((allTwits) => twitsStore.setTwits(allTwits));
    getRetwitsByUser(id).then((retwitsByUser) =>
      retwitsStore.setRetwits(retwitsByUser)
    );
    getFollowingUsers(id).then((followings) =>
      usersFollowingsStore.setuserFollowing(followings)
    );
    getFollowerUsers(id).then((followers) =>
      usersFollowingsStore.setuserFollowers(followers)
    );
  });

  return (
    <div>
      <div className="page">
        <MenuComponent />
        <div className="main-wrapper">
          <main className="main">
            <TwitterNotAuthProfileUser />
          </main>
        </div>
        <SidebarContent />
      </div>
      <FooterComponent />
    </div>
  );
});

export default TwitterPageNotAuthUser;
