import { observer } from "mobx-react-lite";

import { tweetActions } from "../../redux/tweet/tweet.actions";

import getAuthUserID from "../../utils/getAuthUserID";

import Tweets from "./Tweets";

const ExplorePageAllTweets = observer(() => {
  const authUserID = getAuthUserID();

  return (
    <Tweets
      message={
        <div className="lack-tweets-message">
          <h2>No tweets yet.</h2> <p>Write first.</p>
        </div>
      }
      getMoreTweets={
        authUserID
          ? tweetActions.getMoreTweetsForAuthUser
          : tweetActions.getMoreTweets
      }
      userId={authUserID}
    />
  );
});

export default ExplorePageAllTweets;
