import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "..";

import TwitterNotAuthProfileUser from "../components/TwitterNotAuthProfileUser";
import twitsApi from "../http/twitsApi";
import userApi from "../http/userApi";

const PublicHomePageNotAuthUser = observer(() => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    userApi
      .getUserById(id)
      .then((userById) => usersStore.setUserPage(userById));
    twitsApi
      .getTwitsByUser(id)
      .then((usersTwits) => twitsStore.setUserTwits(usersTwits));
    twitsApi.getAllTwits().then((allTwits) => twitsStore.setTwits(allTwits));
    userApi
      .getFollowingUsers(id)
      .then((followings) => usersFollowingsStore.setuserFollowing(followings));
    userApi
      .getFollowerUsers(id)
      .then((followers) => usersFollowingsStore.setuserFollowers(followers));
  });

  return (
    <div className="main-wrapper">
      <main className="main">
        <TwitterNotAuthProfileUser />
      </main>
    </div>
  );
});

export default PublicHomePageNotAuthUser;
