import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../..";

import twitsApi from "../../http/twitsApi";
import userApi from "../../http/userApi";

import PublicProfileUser from "../../components/PublicProfileUser";

const PublicProfilePageUser = observer(() => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    userApi
      .getUserProfile(id)
      .then((userById) => usersStore.setUserPage(userById));
    twitsApi
      .getTwitsByUser(id)
      .then((usersTwits) => twitsStore.setUserTwits(usersTwits));
    twitsApi.getAllTwits().then((allTwits) => twitsStore.setTwits(allTwits));
    userApi
      .getFollowingsUser(id)
      .then((followings) => usersFollowingsStore.setuserFollowing(followings));
    userApi
      .getFollowersUser(id)
      .then((followers) => usersFollowingsStore.setuserFollowers(followers));
  });

  return (
    <div className="main-wrapper">
      <main className="main">
        <PublicProfileUser />
      </main>
    </div>
  );
});

export default PublicProfilePageUser;
