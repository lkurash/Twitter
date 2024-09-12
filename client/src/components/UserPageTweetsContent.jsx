import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { auth, userProfileById } from "../redux/user/user.selectors";
import { tweetActions } from "../redux/tweet/tweet.actions";

import UserTweets from "./Tweets/UserTweets";

const UserPageTweetsContent = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(userProfileById);
  const { isAuth } = useSelector(auth);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuth) {
      setIsLoading(true);
      dispatch(tweetActions.getTweetsByUser(profile.id));
    } else {
      setIsLoading(true);
      dispatch(tweetActions.getPublicTweetsByUser(profile.id));
    }
  }, []);

  return <>{isLoading && <UserTweets />}</>;
};
export default UserPageTweetsContent;
