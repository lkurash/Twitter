import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import Twit from "./Twit";

const TwitsWhoYouRead = observer(({ showTwitsWhoReading }) => {
  const { user } = useContext(Context);
  const twitsFollowingUsers = [];

  const getTwitsFollowingUsers = () => {
    user.userFollowing.map((followingUser) => {
      return followingUser.followUser.Twits.forEach((twit) => {
        return twitsFollowingUsers.push(twit);
      });
    });
  };

  getTwitsFollowingUsers();

  if (!showTwitsWhoReading) return null;

  return (
    <div className="twits">
      {twitsFollowingUsers.map((twit) => (
        <Twit twit={twit} key={twit.id} />
      ))}
      {twitsFollowingUsers.length === 0 && (
        <p className="empty-twits">You don't have following</p>
      )}
    </div>
  );
});

export default TwitsWhoYouRead;
