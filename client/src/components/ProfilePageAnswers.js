import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { tweetsStore } from "../redux/tweet/tweet.selectors";
import { userProfileById } from "../redux/user/user.selectors";
import { tweetActions } from "../redux/tweet/tweet.actions";

import spinner from "../utils/spinner";

import UserComments from "./Tweets/UserComments";

const ProfilePageAnswers = observer(() => {
  const dispatch = useDispatch();
  const { profile } = useSelector(userProfileById);
  const { id } = useParams();
  const { loadingStatus } = useSelector(tweetsStore);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(tweetActions.getAnswers(profile.id));

    if (loadingStatus === "PENDING" || isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, [id]);

  if (isLoading) {
    return <div className="tweets">{spinner()}</div>;
  }

  return (
    <div className="tweets">
      <UserComments />
    </div>
  );
});

export default ProfilePageAnswers;
