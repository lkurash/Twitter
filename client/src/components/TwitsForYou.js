import { observer } from "mobx-react-lite";
import "./main.css";
import { Fragment, useContext } from "react";
import { Context } from "..";

import Twit from "./Twit";
import TooltipRetwitOnTwit from "./common/TolltipRetwitOnTwit";
import ButtonShowMoreTwits from "./buttons/ButtonShowMoreTwits";
import getMoreAllTwits from "../utils/getMoreAllTwits";

const TwitsForYou = observer(({ showTwitsForYou }) => {
  const { twitsStore } = useContext(Context);

  if (!showTwitsForYou) return null;

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
            <ButtonShowMoreTwits getMoreTwits={getMoreAllTwits} />
          )}
        </>
      ) : (
        <p className="empty-twits">No twits</p>
      )}
    </div>
  );
});

export default TwitsForYou;
