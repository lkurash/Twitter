import { observer } from "mobx-react-lite";
import { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "..";

import twitClient from "../http/twitClient";

import getAuthUserID from "../utils/getAuthUserID";
import spinner from "../utils/spinner";

import ShowMoreTwitsButton from "./buttons/ShowMoreTwitsButton";
import Twits from "./Twits";

const TwitsWhoYouRead = observer(() => {
  const { twitsStore } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const authUserID = getAuthUserID();

  useEffect(() => {
    if (authUserID) {
      twitClient
        .getTwitsByFollowingsUsers(authUserID)
        .then((twits) => twitsStore.setTwits(twits));
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  }, []);

  if (twitsStore.twits.length === 0 || isLoading) {
    return spinner();
  }

  return (
    <Fragment>
      <Twits />
      {twitsStore.twits.length >= 7 && (
        <ShowMoreTwitsButton
          getTwits={twitClient.getTwitsByFollowingsUsers}
          userId={authUserID}
          store={twitsStore}
        />
      )}
    </Fragment>
  );
});

export default TwitsWhoYouRead;
