import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import sortTwits from "../utils/sortTwits";
import Twit from "./Twit";

const TwitsWhoYouRead = observer(({ showTwitsWhoReading, userTwits }) => {
  const { user } = useContext(Context);
  const { retwits } = useContext(Context);
  const twitsByFollowingUsers = [];

  const getTwitsByFollowingUsers = () => {
    user.userFollowing.map((followingUser) => {
      return followingUser.followUser.Twits.forEach((twit) => {
        return twitsByFollowingUsers.push(twit);
      });
    });
  };

  getTwitsByFollowingUsers();

  const userTwitsRetwitsFollowingUserTwits = sortTwits(userTwits, twitsByFollowingUsers, retwits.retwits);

  if (!showTwitsWhoReading) return null;

  return (
    <div className="twits">
      {userTwitsRetwitsFollowingUserTwits.map((twit) => (
        <Twit
          twit={twit.Twit ? twit.Twit : twit}
          key={twit.Twit ? `retwet-${twit.Twit.id}` : `twit-${twit.id}`}
        />
      ))}
      {userTwitsRetwitsFollowingUserTwits.length === 0 && (
        <p className="empty-twits">You don't have following</p>
      )}
    </div>
  );
});

export default TwitsWhoYouRead;
