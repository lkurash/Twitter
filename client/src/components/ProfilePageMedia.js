import { observer } from "mobx-react-lite";
import { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "..";

import twitClient from "../http/twitClient";
import spinner from "../utils/spinner";

import ShowMoreTwitsButton from "./buttons/ShowMoreTwitsButton";
import Twits from "./Twits";

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
    <Fragment>
      <Twits />
      {twitsStore.twits.length >= 4 && (
        <ShowMoreTwitsButton
          getTwits={twitClient.getUserTwitsWithMedia}
          userId={usersStore.userPage.id}
          store={twitsStore}
        />
      )}
    </Fragment>
  );
});

export default ProfilePageMedia;
