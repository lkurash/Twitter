import { observer } from "mobx-react-lite";
import { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "..";

import Twit from "./Twit";
import ButtonShowMoreTwits from "./buttons/ButtonShowMoreTwits";

import "./main.css";
import twitClient from "../http/twitClient";
import getAuthUserID from "../utils/getAuthUserID";
import spinner from "../utils/spinner";

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
    <div className="twits">
      {twitsStore.twits ? (
        <>
          {twitsStore.twits.map((twit) => (
            <Twit key={twit.id} twit={twit} />
          ))}
          {twitsStore.twits.length >= 7 && (
            <ButtonShowMoreTwits
              getTwits={twitClient.getTwitsForAuthUser}
              userId={authUserID}
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

export default TwitsForYou;
