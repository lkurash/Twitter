import { observer } from "mobx-react-lite";
import "./main.css";
import { useContext } from "react";
import { Context } from "..";
import Twit from "./Twit";
import TooltipRetwitOnTwit from "./TolltipRetwitOnTwit";
import sortTwits from "../utils/sortTwits";

const TwitsForYou = observer(({ showTwitsForYou }) => {
  const { twits } = useContext(Context);
  const { retwits } = useContext(Context);
  const allTwitsAndUserRetwits = sortTwits(retwits.retwits, twits.twits);

  if (!showTwitsForYou) return null;

  return (
    <div className="twits">
      {allTwitsAndUserRetwits.map((twit) => (
        <>
          <TooltipRetwitOnTwit retwit={twit.Twi} />
          <Twit
            key={twit.Twit ? `retwet-${twit.Twit.id}` : `twit-${twit.id}`}
            twit={twit.Twit ? twit.Twit : twit}
          />
        </>
      ))}
      {allTwitsAndUserRetwits.length === 0 && (
        <p className="empty-twits">No twits</p>
      )}
    </div>
  );
});

export default TwitsForYou;
