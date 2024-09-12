import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { userProfileById } from "../redux/user/user.selectors";
import { tweetActions } from "../redux/tweet/tweet.actions";

import UserAnswers from "./Tweets/UserAnswers";

const AnswersPageContent = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(userProfileById);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(tweetActions.getAnswers(profile.id));
  }, [id]);

  return <div className="tweets">{isLoading && <UserAnswers />}</div>;
};

export default AnswersPageContent;
