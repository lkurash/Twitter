import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";

import Twit from "./Twit";
import spinner from "../utils/spinner";
import TooltipRetwitOnTwit from "./common/TolltipRetwitOnTwit";

import "./main.css";

const UserTwits = observer(() => {
  const { twitsStore } = useContext(Context);

  if (twitsStore.userTwits.length === 0) return spinner();

  return (
    <div className="twits">
      {twitsStore.userTwits ? (
        <>
          {twitsStore.userTwits.map((twit) => (
            <div key={twit.id}>
              {twit.retwit && (
                <TooltipRetwitOnTwit retwit={twit} key={`tooltip-${twit.id}`} />
              )}
              <Twit twit={twit} key={twit.id} />
            </div>
          ))}
        </>
      ) : (
        <p className="empty-twits">No twits</p>
      )}
    </div>
  );
});

export default UserTwits;
