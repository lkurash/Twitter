import { observer } from "mobx-react-lite";
import "./main.css";
import { useContext } from "react";
import { Context } from "..";

import Twit from "./Twit";
import TooltipRetwitOnTwit from "./common/TolltipRetwitOnTwit";
import sortTwits from "../utils/sortTwits";

const TwitsForYou = observer(({ showTwitsForYou }) => {
  const { twitsStore } = useContext(Context);
  const { retwitsStore } = useContext(Context);

  const allTwitsAndUserRetwits = sortTwits(retwitsStore.retwits, twitsStore.twits);

  if (!showTwitsForYou) return null;

  return (
    <div className="twits">
      {allTwitsAndUserRetwits.map((twit) => (
        <div key={twit.Twit ? `retwet-${twit.Twit.id}` : `twit-${twit.id}`}>
          {twit.retwit && <TooltipRetwitOnTwit retwit={twit} />}
          <Twit
            key={twit.Twit ? `retwet-${twit.Twit.id}` : `twit-${twit.id}`}
            twit={twit.Twit ? twit.Twit : twit}
          />
        </div>
      ))}
      {allTwitsAndUserRetwits.length === 0 && (
        <p className="empty-twits">No twits</p>
      )}
    </div>
  );
});

export default TwitsForYou;
