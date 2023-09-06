import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "..";
import twitsClient from "../http/twitsClient";
import getAuthUserID from "../utils/getAuthUserID";

import getMoreTwitsWithLike from "../utils/getMoreTwitsWithLike";
import spinner from "../utils/spinner";

import ButtonShowMoreTwits from "./buttons/ButtonShowMoreTwits";
import Twit from "./Twit";

const ProfilePageLikes = observer(() => {
  const { twitsStore } = useContext(Context);
  const { usersStore } = useContext(Context);
  const authUserID = getAuthUserID();

  const [loadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    twitsClient.getTwitsWithUserLikes(authUserID).then((twits) => {
      twitsStore.setTwitsWithUsersLikes(twits);
    });
    setTimeout(() => {
      setIsLoadingPage(false);
    }, 250);
  }, []);

  if (usersStore.user.length === 0 || loadingPage) return spinner();

  return (
    <div className="twits">
      {twitsStore.twitsWithUsersLikes.map((like) => (
        <Twit twit={like} key={like.id} />
      ))}
      {twitsStore.twitsWithUsersLikes.length >= 7 && (
        <ButtonShowMoreTwits
          getMoreTwits={getMoreTwitsWithLike}
          store={twitsStore}
        />
      )}
      {twitsStore.twitsWithUsersLikes.length === 0 && (
        <p className="empty-twits">No twits</p>
      )}
    </div>
  );
});

export default ProfilePageLikes;
