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
  const { user } = useContext(Context);
  const { twits } = useContext(Context);
  const { retwits } = useContext(Context);
  const { usersFollow } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    getUserById(id).then((userById) => user.setUserPage(userById));
    getTwitsByUser(id).then((usersTwits) => twits.setUserTwits(usersTwits));
    getAllTwits().then((allTwits) => twits.setTwits(allTwits));
    getRetwitsByUser(id).then((retwitsByUser) =>
      retwits.setRetwits(retwitsByUser)
    );
    getFollowingUsers(id).then((followings) =>
      usersFollow.setuserFollowing(followings)
    );
    getFollowerUsers(id).then((followers) =>
      usersFollow.setuserFollowers(followers)
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
