import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "..";

import twitClient from "../http/twitClient";

import spinner from "../utils/spinner";

import ButtonShowMoreTwits from "./buttons/ButtonShowMoreTwits";
import Twit from "./Twit";

const ProfilePageMedia = observer(() => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const [loadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    twitClient.getUserTwitsWithMedia(usersStore.userPage.id).then((twits) => {
      twitsStore.setTwits(twits);
    });
    setTimeout(() => {
      setIsLoadingPage(false);
    }, 250);
  }, []);

  if (usersStore.userPage.length === 0 || loadingPage) return spinner();

  return (
    <div className="twits">
      {twitsStore.twits ? (
        <>
          {twitsStore.twits.map((twit) => (
            <Twit twit={twit} key={twit.id} />
          ))}
          {twitsStore.twits.length >= 4 && (
            <ButtonShowMoreTwits
              getTwits={twitClient.getUserTwitsWithMedia}
              userId={usersStore.userPage.id}
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

export default ProfilePageMedia;
