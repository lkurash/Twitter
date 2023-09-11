import { observer } from "mobx-react-lite";
import { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "..";
import twitsClient from "../http/twitsClient";
import getAuthUserID from "../utils/getAuthUserID";

import getMoreWhoYouReadingTwits from "../utils/getMoreWhoYouReadingTwits";
import spinner from "../utils/spinner";

import ButtonShowMoreTwits from "./buttons/ButtonShowMoreTwits";
import TooltipRetwitOnTwit from "./common/TolltipRetwitOnTwit";
import Twit from "./Twit";

const TwitsWhoYouRead = observer(() => {
  const { twitsStore } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const authUserID = getAuthUserID();

  useEffect(() => {
    twitsClient
      .getTwitsByFollowingsUsers(authUserID)
      .then((twits) => twitsStore.setTwits(twits));

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
            <Fragment key={twit.id}>
              {twit.retwit && <TooltipRetwitOnTwit retwit={twit} />}
              <Twit key={twit.id} twit={twit} />
            </Fragment>
          ))}
          {twitsStore.twits.length >= 7 && (
            <ButtonShowMoreTwits
              getMoreTwits={getMoreWhoYouReadingTwits}
              store={twitsStore}
            />
          )}
        </>
      ) : (
        <p className="empty-twits">No twits</p>
      )}
    </div>
  );
});

export default TwitsWhoYouRead;
