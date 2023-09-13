import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "..";
import twitClient from "../http/twitClient";
import getAuthUserID from "../utils/getAuthUserID";

import getMoreTwitsWithLike from "../utils/getMoreTwitsWithLike";
import spinner from "../utils/spinner";

import ButtonShowMoreTwits from "./buttons/ButtonShowMoreTwits";
import Twit from "./Twit";

const ProfilePageLikes = observer(() => {
  const { twitsStore } = useContext(Context);
  const { usersStore } = useContext(Context);
  const [loadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    const authUserID = getAuthUserID();

    if (authUserID) {
      twitClient.getTwitsWithUserLikes(usersStore.userPage.id).then((twits) => {
        twitsStore.setTwits(twits);
      });
      setTimeout(() => {
        setIsLoadingPage(false);
      }, 250);
    }
  }, []);

  if (usersStore.userPage.length === 0 || loadingPage) return spinner();

  return (
    <div className="twits">
      {twitsStore.twits ? (
        <>
          {twitsStore.twits.map((like) => (
            <Twit twit={like} key={like.id} />
          ))}
          {twitsStore.twits.length >= 7 && (
            <ButtonShowMoreTwits
              getMoreTwits={getMoreTwitsWithLike}
              store={twitsStore}
            />
          )}
        </>
      ) : (
        <p className="twit-hint-about-lack-twits">No twits</p>
      )}
    </div>
  );
});

export default ProfilePageLikes;
