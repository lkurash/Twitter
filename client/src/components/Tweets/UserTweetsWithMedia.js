import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { userProfileById } from "../../redux/user/user.selectors";
import { useParams } from "react-router-dom";
import { tweetActions } from "../../redux/tweet/tweet.actions";

import Tweets from "./Tweets";

const UserTweetsWithMedia = observer(() => {
  const dispatch = useDispatch();
  const { profile } = useSelector(userProfileById);
  const { id } = useParams();

  useEffect(() => {
    dispatch(tweetActions.getTweetsWithMedia(profile.id));
  }, [id]);

  return (
    <Tweets
      message={
        <div className="lack-tweets-message">
          <h2>No tweets with media.</h2> <p>Write first.</p>
        </div>
      }
      getMoreTweets={tweetActions.getMoreTweetsWithMedia}
      userId={profile.id}
    />
  );
});

export default UserTweetsWithMedia;
