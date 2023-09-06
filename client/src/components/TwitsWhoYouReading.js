import { observer } from "mobx-react-lite";
import { Fragment, useContext } from "react";
import { Context } from "..";

import getMoreWhoYouReadingTwits from "../utils/getMoreWhoYouReadingTwits";

import ButtonShowMoreTwits from "./buttons/ButtonShowMoreTwits";
import TooltipRetwitOnTwit from "./common/TolltipRetwitOnTwit";
import Twit from "./Twit";

const TwitsWhoYouRead = observer(() => {
  const { twitsStore } = useContext(Context);
  return (
    <div className="twits">
      <>
        {twitsStore.twitsWhoReading.map((twit) => (
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
