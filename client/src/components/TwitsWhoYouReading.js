import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";

import sortTwits from "../utils/sortTwits";
import TooltipRetwitOnTwit from "./common/TolltipRetwitOnTwit";
import Twit from "./Twit";

const TwitsWhoYouRead = observer(({ showTwitsWhoReading, userTwits }) => {
  const { usersFollowingsStore } = useContext(Context);
  const twitsByFollowingUsers = [];

  const getTwitsByFollowingUsers = () => {
    usersFollowingsStore.userFollowing.map((followingUser) => {
      return followingUser.followUser.Twits.forEach((twit) => {
        return twitsByFollowingUsers.push(twit);
      });
    });
  };

  getTwitsByFollowingUsers();

  const userTwitsRetwitsFollowingUserTwits = sortTwits(
    userTwits,
    twitsByFollowingUsers,
  );

  if (!showTwitsWhoReading) return null;

  return (
    <div className="twits">
      {userTwitsRetwitsFollowingUserTwits.map((twit) => (
        <div key={twit.id}>
          {twit.retwit && <TooltipRetwitOnTwit retwit={twit} />}
          <Twit
            key={twit.id}
            twit={twit}
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
