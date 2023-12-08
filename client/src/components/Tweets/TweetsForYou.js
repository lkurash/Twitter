import { observer } from "mobx-react-lite";

import { useSelector } from "react-redux";
import { userProfile } from "../../redux/user/user.selectors";
import { tweetActions } from "../../redux/tweet/tweet.actions";

import Tweets from "./Tweets";

const TweetsForYou = observer(() => {
  const { profile } = useSelector(userProfile);

  return (
    <Tweets
      message={
        <div className="lack-tweets-message">
          <h2>No tweets yet.</h2> <p>Write first.</p>
        </div>
      }
      getMoreTweets={tweetActions.getMoreTweetsForAuthUser}
      userId={profile.id}
    />
  );
});

export default TweetsForYou;
