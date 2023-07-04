import { observer } from "mobx-react-lite";
import "./main.css";
import { useContext } from "react";
import { Context } from "..";
import Twit from "./Twit";
import spinner from "../utils/spinner";
import TooltipRetwitOnTwit from "./TolltipRetwitOnTwit";
import sortTwits from "../utils/sortTwits";

const UserTwits = observer(() => {
  const { twits } = useContext(Context);
  const { retwits } = useContext(Context);

  const userTwitsAndRetwits = sortTwits(twits.userTwits, retwits.retwits);

  if (userTwitsAndRetwits.length === 0) return spinner();

  return (
    <div className="twits">
      {userTwitsAndRetwits.map((twit) => (
        <>
          <TooltipRetwitOnTwit retwit={twit.Twit} />
          <Twit
            key={twit.Twit ? `retwit-${twit.Twit.id}` : `twit-${twit.id}`}
            twit={twit.Twit ? twit.Twit : twit}
          />
        </>

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
