import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import Twit from "./Twit";

const TwitsWhoYouRead = observer(({ showTwitsWhoReading, userTwits }) => {
  const { user } = useContext(Context);
  const userTwitsAndTwitsFollowingUsers = userTwits.slice(0);

  const getTwitsFollowingUsers = () => {
    user.userFollowing.map((followingUser) => {
      return followingUser.followUser.Twits.forEach((twit) => {
        return userTwitsAndTwitsFollowingUsers.push(twit);
      });
    });
  };

  getTwitsFollowingUsers();

  const sortTwit = () => {
    userTwitsAndTwitsFollowingUsers.sort((a, b) => {
      const dateOne = new Date(a.createdAt);
      const dateTwo = new Date(b.createdAt);

      return dateTwo - dateOne;
    });
  };
  sortTwit();

  if (!showTwitsWhoReading) return null;

  return (
    <div className="twits">
      {userTwitsAndTwitsFollowingUsers.map((twit) => (
        <Twit twit={twit} key={twit.id} />
      ))}
      {userTwitsAndTwitsFollowingUsers.length === 0 && (
        <p className="empty-twits">You don't have following</p>
      )}
    </div>
  );
});

export default TwitsWhoYouRead;
