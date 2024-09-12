import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { userProfileById } from "../redux/user/user.selectors";
import { tweetActions } from "../redux/tweet/tweet.actions";

import { useParams } from "react-router-dom";

import UserTweetsWithMedia from "./Tweets/UserTweetsWithMedia";

const UserTweetsWithMediaContent = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(userProfileById);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(tweetActions.getTweetsWithMedia(profile.id));
  }, [id]);

  return <>{isLoading && <UserTweetsWithMedia />}</>;
};

export default UserTweetsWithMediaContent;
