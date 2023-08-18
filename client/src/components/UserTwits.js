import { observer } from "mobx-react-lite";
import { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "..";

import spinner from "../utils/spinner";
import getMoreUserTwits from "../utils/getMoreUserTwits";

import Twit from "./Twit";
import TooltipRetwitOnTwit from "./common/TolltipRetwitOnTwit";
import ButtonShowMoreTwits from "./buttons/ButtonShowMoreTwits";

import "./main.css";

const UserTwits = observer(() => {
  const { twitsStore } = useContext(Context);
  const [loadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingPage(false);
    }, 250);
  }, []);

  if (twitsStore.userTwits.length === 0 || loadingPage) return spinner();

  return (
    <div className="twits">
      {twitsStore.userTwits ? (
        <>
          {twitsStore.userTwits.map((twit) => (
            <Fragment key={twit.id}>
              {twit.retwit && (
                <TooltipRetwitOnTwit retwit={twit} key={`tooltip-${twit.id}`} />
              )}
              <Twit twit={twit} key={twit.id} />
            </Fragment>
          ))}
          {twitsStore.userTwits.length >= 7 && (
            <ButtonShowMoreTwits
              getMoreTwits={getMoreUserTwits}
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

export default UserTwits;
