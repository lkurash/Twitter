import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { userProfileById } from "../../redux/user/user.selectors";
import { useParams } from "react-router-dom";
import { tweetActions } from "../../redux/tweet/tweet.actions";

import Tweets from "./Tweets";

const UserTweetsWithLikes = observer(() => {
  const dispatch = useDispatch();
  const { profile } = useSelector(userProfileById);
  const { id } = useParams();

  useEffect(() => {
    dispatch(tweetActions.getTweetsWithLikes(profile.id));
  }, [id]);

  return (
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
      getMoreTweets={tweetActions.getMoreTweetsWithLikes}
      userId={profile.id}
    />
  );
});

export default UserTweetsWithLikes;
