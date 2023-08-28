import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../..";

import twitsClient from "../../http/twitsClient";
import usersClient from "../../http/usersClient";

import PublicProfileUser from "../../components/PublicProfileUser";

const PublicProfilePageUser = observer(() => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    usersClient
      .getUserProfile(id)
      .then((userById) => usersStore.setUserPage(userById));
    twitsClient
      .getTwitsByUser(id)
      .then((usersTwits) => twitsStore.setUserTwits(usersTwits));
    twitsClient.getAllTwits().then((allTwits) => twitsStore.setTwits(allTwits));
    usersClient
      .getFollowingsUser(id)
      .then((followings) => usersFollowingsStore.setuserFollowing(followings));
    usersClient
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
