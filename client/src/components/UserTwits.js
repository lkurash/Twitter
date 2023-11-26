import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import spinner from "../utils/spinner";

import Twits from "./Twits";
import ShowMoreTwitsButton from "./buttons/ShowMoreTwitsButton";

import "./main.css";
import { useDispatch, useSelector } from "react-redux";
import { twitsStore } from "../redux/tweet/tweet.selectors";
import { auth, userProfileById } from "../redux/user/user.selectors";
import { tweetActions } from "../redux/tweet/tweet.actions";
import getAuthUserID from "../utils/getAuthUserID";

const UserTwits = observer(() => {
  const dispatch = useDispatch();
  const { profile } = useSelector(userProfileById);
  const { twits } = useSelector(twitsStore);
  const { loadingStatus } = useSelector(twitsStore);
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

  if (isLoading) return <div className="twits">{spinner()}</div>;

  return (
    <Fragment>
      <Twits />
      {twits && twits.length >= 7 && (
        <ShowMoreTwitsButton
          getTwits={
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

export default UserTwits;
