import { observer } from "mobx-react-lite";
import "./main.css";
import { useContext } from "react";
import { Context } from "..";

import Twit from "./Twit";
import TooltipRetwitOnTwit from "./common/TolltipRetwitOnTwit";

const TwitsForYou = observer(({ showTwitsForYou }) => {
  const { twitsStore } = useContext(Context);

  if (!showTwitsForYou) return null;

  return (
    <div className="twits">
      {twitsStore.twits ? (
        <>
          {twitsStore.twits.map((twit) => (
            <div key={twit.id}>
              {twit.retwit && <TooltipRetwitOnTwit retwit={twit} />}
              <Twit key={twit.id} twit={twit} />
            </div>
          ))}
        </>
      ) : (
        <p className="empty-twits">No twits</p>
      )}
    </div>
  );
});

export default TwitsForYou;
