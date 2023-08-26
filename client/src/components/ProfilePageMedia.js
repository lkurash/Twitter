import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "..";

import twitsApi from "../http/twitsApi";

import getMoreTwitsWithMedia from "../utils/getMoreTwitsWithMedia";
import spinner from "../utils/spinner";

import ButtonShowMoreTwits from "./buttons/ButtonShowMoreTwits";
import Twit from "./Twit";

const ProfilePageMedia = observer(() => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const [loadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    twitsApi.getUserTwitsWithMedia(usersStore.userPage.id).then((twits) => {
      twitsStore.setUserTwitsWithMedia(twits);
    });
    setTimeout(() => {
      setIsLoadingPage(false);
    }, 250);
  }, []);

  if (twitsStore.userTwits.length === 0 || loadingPage) return spinner();

  return (
    <div className="twits">
      {twitsStore.userTwitsWithMedia.map((twit) => (
        <Twit twit={twit} key={twit.id} />
      ))}
      {twitsStore.userTwitsWithMedia.length >= 4 && (
        <ButtonShowMoreTwits
          getMoreTwits={getMoreTwitsWithMedia}
          store={twitsStore}
        />
      )}
      {twitsStore.userTwitsWithMedia.length === 0 && (
        <p className="empty-twits">No twits</p>
      )}
    </div>
  );
});

export default ProfilePageMedia;
