import { observer } from "mobx-react-lite";
import { Fragment, useContext } from "react";
import { Context } from "..";

import getMoreAllTwits from "../utils/getMoreAllTwits";

import Twit from "./Twit";
import TooltipRetwitOnTwit from "./common/TolltipRetwitOnTwit";
import ButtonShowMoreTwits from "./buttons/ButtonShowMoreTwits";

import "./main.css";

const TwitsForYou = observer(() => {
  const { twitsStore } = useContext(Context);

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
