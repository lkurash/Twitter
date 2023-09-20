import { observer } from "mobx-react-lite";
import { Fragment, useContext } from "react";
import { Context } from "..";
import Twit from "./Twit/Twit";

const Twits = observer(() => {
  const { twitsStore } = useContext(Context);

  return (
    <Fragment>
      <div className="twits">
        {twitsStore.twits ? (
          <>
            {twitsStore.twits.map((twit) => (
              <Twit
                twit={twit}
                key={twit.id}
                retwit={twit.retwit}
                userInfo={
                  twit.retwit ? twit.userRetwits : twit.userOriginalTwits
                }
              />
            ))}
          </>
        ) : (
          <p className="twit-hint-about-lack-twits">No twits</p>
        )}
      </div>
    </Fragment>
  );
});

export default Twits;
