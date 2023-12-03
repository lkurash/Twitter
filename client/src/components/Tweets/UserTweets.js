import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { tweetsStore } from "../../redux/tweet/tweet.selectors";
import { auth, userProfileById } from "../../redux/user/user.selectors";
import { tweetActions } from "../../redux/tweet/tweet.actions";

import spinner from "../../utils/spinner";
import getAuthUserID from "../../utils/getAuthUserID";

import Tweets from "./Tweets";
import ShowMoreTweetsButton from "../buttons/ShowMoreTweetsButton";

import "../main.css";

const UserTweets = observer(() => {
  const dispatch = useDispatch();
  const { profile } = useSelector(userProfileById);
  const { tweets } = useSelector(tweetsStore);
  const { loadingStatus } = useSelector(tweetsStore);
  const { isAuth } = useSelector(auth);
  const { id } = useParams();
  const authUserID = getAuthUserID();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (isAuth) {
      dispatch(tweetActions.getTweetsByUser(profile.id));
    } else {
      dispatch(tweetActions.getPublicTweetsByUser(profile.id));
    }

    if (loadingStatus === "PENDING" || isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, [id]);

  if (isLoading) return <div className="tweets">{spinner()}</div>;

  return (
    <Fragment>
      <Tweets
        message={
          <div className="lack-tweets-message">
            <h2>No tweets yet.</h2> <p>Write first.</p>
          </div>
        }
      />
      {tweets && tweets.length >= 7 && (
        <ShowMoreTweetsButton
          getTweets={
            authUserID
              ? tweetActions.getMoreUserTweets
              : tweetActions.getMoreUserPublicTweets
          }
          userId={profile.id}
        />
      )}
    </Fragment>
  );
});

export default UserTweets;
