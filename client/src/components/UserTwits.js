import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";

import Twit from "./Twit";
import spinner from "../utils/spinner";
import TooltipRetwitOnTwit from "./common/TolltipRetwitOnTwit";
import sortTwits from "../utils/sortTwits";

import "./main.css";

const UserTwits = observer(() => {
  const { twitsStore } = useContext(Context);
  const { retwitsStore } = useContext(Context);

  const userTwitsAndRetwits = sortTwits(twitsStore.userTwits, retwitsStore.retwits);

  if (twitsStore.userTwits.length === 0) return spinner();

  return (
    <div className="twits">
      {userTwitsAndRetwits.map((twit) => (
        <div key={twit.Twit ? `retwit-${twit.Twit.id}` : `twit-${twit.id}`}>
          {twit.retwit && <TooltipRetwitOnTwit retwit={twit} />}
          <Twit twit={twit.retwit ? twit.Twit : twit} />
        </div>

        // {!twit.Twit && twit.UserId === user.user.id && (
        //       <ButtonDeleteOnTwit twit={twit} />
        //     )}
      ))}
      {userTwitsAndRetwits.length === 0 && (
        <p className="empty-twits">No twits</p>
      )}
    </div>
  );
});

export default UserTwits;
