import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import Twit from "./Twit/Twit";
import { useSelector } from "react-redux";
import { twitsStore } from "../redux/tweet/tweet.selectors";

const Twits = observer(() => {
  const { twits } = useSelector(twitsStore);

  return (
    <Fragment>
      <div className="twits">
        {twits ? (
          <>
            {twits.map((twit) => (
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
