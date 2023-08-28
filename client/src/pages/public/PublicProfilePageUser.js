import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Context } from "../..";

import twitsClient from "../../http/twitsClient";
import usersClient from "../../http/usersClient";

import PublicProfileUser from "../../components/PublicProfileUser";

const PublicProfilePageUser = observer(() => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user");

  useEffect(() => {
    usersClient
      .getUserProfile(userId)
      .then((userById) => usersStore.setUserPage(userById));
    twitsClient
      .getTwitsByUser(userId)
      .then((usersTwits) => twitsStore.setUserTwits(usersTwits));
    usersClient
      .getFollowingsUser(userId)
      .then((followings) => usersFollowingsStore.setuserFollowing(followings));
    usersClient
      .getFollowersUser(userId)
      .then((followers) => usersFollowingsStore.setuserFollowers(followers));
  },[]);

  return (
    <div className="main-wrapper">
      <main className="main">
        <PublicProfileUser />
      </main>
    </div>
  );
});

export default PublicProfilePageUser;
