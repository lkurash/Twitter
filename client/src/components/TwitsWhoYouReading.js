import { observer } from "mobx-react-lite";
import { Fragment, useContext, useEffect } from "react";
import { Context } from "..";
import twitsClient from "../http/twitsClient";
import getAuthUserID from "../utils/getAuthUserID";

import getMoreWhoYouReadingTwits from "../utils/getMoreWhoYouReadingTwits";

import ButtonShowMoreTwits from "./buttons/ButtonShowMoreTwits";
import TooltipRetwitOnTwit from "./common/TolltipRetwitOnTwit";
import Twit from "./Twit";

const TwitsWhoYouRead = observer(() => {
  const { twitsStore } = useContext(Context);
  const authUserID = getAuthUserID();

  // useEffect(()=>{
  //   twitsClient
  //     .getTwitsByFollowingsUsers(authUserID)
  //     .then((twits) => twitsStore.setTwits(twits));
  // },[])

  return (
    <div className="twits">
      <>
        {twitsStore.twits.map((twit) => (
          <Fragment key={twit.id}>
            {twit.retwit && <TooltipRetwitOnTwit retwit={twit} />}
            <Twit key={twit.id} twit={twit} />
          </Fragment>
        ))}
        {twitsStore.twitsWhoReading.length >= 7 && (
          <ButtonShowMoreTwits
            getMoreTwits={getMoreWhoYouReadingTwits}
            store={twitsStore}
          />
        )}
      </>
      {twitsStore.twitsWhoReading.length === 0 && (
        <p className="empty-twits">No twits</p>
      )}
    </div>
  );
});

export default TwitsWhoYouRead;
