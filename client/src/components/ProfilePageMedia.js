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

const ProfilePageMedia = observer(() => {
  const dispatch = useDispatch();
  const { profile } = useSelector(userProfileById);
  const { tweets } = useSelector(tweetsStore);
  const { id } = useParams();
  const { loadingStatus } = useSelector(tweetsStore);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(tweetActions.getTweetsWithMedia(profile.id));

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
            <h2>No tweets with media.</h2> <p>Write first.</p>
          </div>
        }
      />
      {tweets && tweets.length >= 4 && (
        <ShowMoreTweetsButton
          getTweets={tweetActions.getMoreTweetsWithMedia}
          userId={profile.id}
        />
      )}
    </Fragment>
  );
});

export default ProfilePageMedia;
