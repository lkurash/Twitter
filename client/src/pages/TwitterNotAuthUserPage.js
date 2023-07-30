import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "..";

import TwitterNotAuthProfileUser from "../components/TwitterNotAuthProfileUser";
import { getAllTwits, getTwitsByUser } from "../http/twitsApi";
import {
  getFollowerUsers,
  getFollowingUsers,
  getUserById,
} from "../http/userApi";

const TwitterPageNotAuthUser = observer(() => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    getUserById(id).then((userById) => usersStore.setUserPage(userById));
    getTwitsByUser(id).then((usersTwits) =>
      twitsStore.setUserTwits(usersTwits)
    );
    getAllTwits().then((allTwits) => twitsStore.setTwits(allTwits));
    getFollowingUsers(id).then((followings) =>
      usersFollowingsStore.setuserFollowing(followings)
    );
    getFollowerUsers(id).then((followers) =>
      usersFollowingsStore.setuserFollowers(followers)
    );
  });

  return (
    <div className="main-wrapper">
      <main className="main">
        <TwitterNotAuthProfileUser />
      </main>
    </div>
  );
});

export default TwitterPageNotAuthUser;
