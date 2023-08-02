import { observer } from "mobx-react-lite";
import { Fragment, useContext } from "react";
import { Context } from "..";

import Twit from "./Twit";
import spinner from "../utils/spinner";
import TooltipRetwitOnTwit from "./common/TolltipRetwitOnTwit";

import "./main.css";
import ButtonShowMoreTwits from "./buttons/ButtonShowMoreTwits";
import getMoreUserTwits from "../utils/getMoreUserTwits";

const UserTwits = observer(() => {
  const { twitsStore } = useContext(Context);

  if (twitsStore.userTwits.length === 0) return spinner();

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
            <ButtonShowMoreTwits getMoreTwits={getMoreUserTwits} />
          )}
        </>
      ) : (
        <p className="empty-twits">No twits</p>
      )}
    </div>
  );
});

export default UserTwits;
