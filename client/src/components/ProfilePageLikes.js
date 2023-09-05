import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "..";

import getMoreTwitsWithLike from "../utils/getMoreTwitsWithLike";
import spinner from "../utils/spinner";

import ButtonShowMoreTwits from "./buttons/ButtonShowMoreTwits";
import Twit from "./Twit";

const ProfilePageLikes = observer(() => {
  const { twitsStore } = useContext(Context);
  const [loadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingPage(false);
    }, 250);
  }, []);

  if (twitsStore.twits.length === 0 || loadingPage) return spinner();
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
