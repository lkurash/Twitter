import { observer } from "mobx-react-lite";
import { Fragment, useContext, useEffect } from "react";
import { Context } from "..";

import getTwitsForAuthUser from "../utils/getTwitsForAuthUser";

import Twit from "./Twit";
import TooltipRetwitOnTwit from "./common/TolltipRetwitOnTwit";
import ButtonShowMoreTwits from "./buttons/ButtonShowMoreTwits";

import "./main.css";
import twitsClient from "../http/twitsClient";
import getAuthUserID from "../utils/getAuthUserID";

const TwitsForYou = observer(() => {
  const { twitsStore } = useContext(Context);

  const authUserID = getAuthUserID();

  // useEffect(()=>{
  //   twitsClient.getTwitsForAuthUser(authUserID).then((twits) => {
  //     twitsStore.setTwits(twits);
  //   });
  // },[])

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
              getMoreTwits={getTwitsForAuthUser}
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

export default TwitsForYou;
