import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { tweetsStore } from "../redux/tweet/tweet.selectors";
import { userProfileById } from "../redux/user/user.selectors";
import { useParams } from "react-router-dom";
import { tweetActions } from "../redux/tweet/tweet.actions";

import spinner from "../utils/spinner";

import Tweets from "./Tweets/Tweets";
import ShowMoreTweetsButton from "./buttons/ShowMoreTweetsButton";

const ProfilePageLikes = observer(() => {
  const dispatch = useDispatch();
  const { profile } = useSelector(userProfileById);
  const { tweets } = useSelector(tweetsStore);
  const { id } = useParams();
  const { loadingStatus } = useSelector(tweetsStore);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(tweetActions.getTweetsWithLikes(profile.id));

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
            <h2>You don’t have any likes yet</h2>{" "}
            <p>
              Tap the heart on any post to show it some love. When you do, it’ll
              show up here.
            </p>
          </div>
        }
      />
      {tweets && tweets.length >= 7 && (
        <ShowMoreTweetsButton
          getTweets={tweetActions.getMoreTweetsWithLikes}
          userId={profile.id}
        />
      )}
    </Fragment>
  );
});

export default ProfilePageLikes;
