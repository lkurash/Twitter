import { observer } from "mobx-react-lite";
import { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "..";

import twitClient from "../http/twitClient";

import getAuthUserID from "../utils/getAuthUserID";
import spinner from "../utils/spinner";

import ShowMoreTwitsButton from "./buttons/ShowMoreTwitsButton";
import Twits from "./Twits";

import "./main.css";

const TwitsForYou = observer(() => {
  const { twitsStore } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  const authUserID = getAuthUserID();

  useEffect(() => {
    twitClient.getTwitsForAuthUser(authUserID).then((twits) => {
      twitsStore.setTwits(twits);
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  }, []);

  if (twitsStore.twits.length === 0 || isLoading) {
    return spinner();
  }

  return (
    <>
      <Twits />
      {twitsStore.twits.length >= 7 && (
        <ShowMoreTwitsButton
          getTwits={twitClient.getTwitsForAuthUser}
          userId={authUserID}
          store={twitsStore}
        />
      )}
    </>
  );
});

export default TwitsForYou;
