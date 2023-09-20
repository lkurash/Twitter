import { observer } from "mobx-react-lite";
import { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "..";

import twitClient from "../http/twitClient";
import getAuthUserID from "../utils/getAuthUserID";
import spinner from "../utils/spinner";

import ShowMoreTwitsButton from "./buttons/ShowMoreTwitsButton";
import Twits from "./Twits";

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
    <Fragment>
      <Twits />
      {twitsStore.twits.length >= 7 && (
        <ShowMoreTwitsButton
          getTwits={twitClient.getTwitsWithUserLikes}
          userId={usersStore.userPage.id}
          store={twitsStore}
        />
      )}
    </Fragment>
  );
});

export default ProfilePageLikes;
