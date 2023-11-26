import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import UserComments from "./UserComments";
import { useDispatch, useSelector } from "react-redux";
import { twitsStore } from "../redux/tweet/tweet.selectors";
import spinner from "../utils/spinner";
import { userProfileById } from "../redux/user/user.selectors";
import { useParams } from "react-router-dom";
import { tweetActions } from "../redux/tweet/tweet.actions";

const ProfilePageAnswers = observer(() => {
  const dispatch = useDispatch();
  const { profile } = useSelector(userProfileById);
  const { id } = useParams();
  const { loadingStatus } = useSelector(twitsStore);
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
    return <div className="twits">{spinner()}</div>;
  }

  return (
    <div className="twits">
      <UserComments />
    </div>
  );
});

export default ProfilePageAnswers;
