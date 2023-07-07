import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import sortTwits from "../utils/sortTwits";
import TooltipRetwitOnTwit from "./TolltipRetwitOnTwit";
import Twit from "./Twit";

const TwitsWhoYouRead = observer(({ showTwitsWhoReading, userTwits }) => {
  const { usersFollow } = useContext(Context);
  const { retwits } = useContext(Context);
  const twitsByFollowingUsers = [];

  const getTwitsByFollowingUsers = () => {
    usersFollow.userFollowing.map((followingUser) => {
      return followingUser.followUser.Twits.forEach((twit) => {
        return twitsByFollowingUsers.push(twit);
      });
    });
  };

  getTwitsByFollowingUsers();

  const userTwitsRetwitsFollowingUserTwits = sortTwits(
    userTwits,
    twitsByFollowingUsers,
    retwits.retwits
  );

  if (!showTwitsWhoReading) return null;

  return (
    <div className="twits">
      {userTwitsRetwitsFollowingUserTwits.map((twit) => (
        <div key={twit.Twit ? `retwet-${twit.Twit.id}` : `twit-${twit.id}`}>
          {twit.retwit && <TooltipRetwitOnTwit retwit={twit} />}
          <Twit
            key={twit.Twit ? `retwet-${twit.Twit.id}` : `twit-${twit.id}`}
            twit={twit.Twit ? twit.Twit : twit}
          />
        </div>
      ))}
      {userTwitsRetwitsFollowingUserTwits.length === 0 && (
        <p className="empty-twits">No twits</p>
      )}
    </div>
  );
});

export default TwitsWhoYouRead;
