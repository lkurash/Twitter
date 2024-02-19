import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { auth, userProfileById } from "../../redux/user/user.selectors";
import { tweetActions } from "../../redux/tweet/tweet.actions";

import getAuthUserID from "../../utils/getAuthUserID";

import Tweets from "./Tweets";
import { tweetsStore } from "../../redux/tweet/tweet.selectors";

const UserTweets = observer(() => {
  const dispatch = useDispatch();
  const { tweets, loadingStatus, moreTweets } = useSelector(tweetsStore);
  const { profile } = useSelector(userProfileById);
  const { isAuth } = useSelector(auth);
  const authUserID = getAuthUserID();

  useEffect(() => {
    if (isAuth) {
      dispatch(tweetActions.getTweetsByUser(profile.id));
    } else {
      dispatch(tweetActions.getPublicTweetsByUser(profile.id));
    }
  }, []);

  return (
    <Tweets
      tweets={tweets}
      moreTweets={moreTweets}
      message={
        <div className="lack-tweets-message">
          <h2>No tweets yet.</h2> <p>Write first.</p>
        </div>
      }
      getMoreTweets={
        authUserID
          ? tweetActions.getMoreUserTweets
          : tweetActions.getMoreUserPublicTweets
      }
      userId={profile.id}
    />
  );
});

export default UserTweets;
