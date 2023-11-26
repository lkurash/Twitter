import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";

import spinner from "../utils/spinner";

import ShowMoreTwitsButton from "./buttons/ShowMoreTwitsButton";
import Twits from "./Twits";
import { useDispatch, useSelector } from "react-redux";
import { twitsStore } from "../redux/tweet/tweet.selectors";

import { userProfileById } from "../redux/user/user.selectors";
import { useParams } from "react-router-dom";
import { tweetActions } from "../redux/tweet/tweet.actions";

const ProfilePageMedia = observer(() => {
  const dispatch = useDispatch();
  const { profile } = useSelector(userProfileById);
  const { twits } = useSelector(twitsStore);
  const { id } = useParams();
  const { loadingStatus } = useSelector(twitsStore);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(tweetActions.getTweetsWithMedia(profile.id));

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
      {twits && twits.length >= 4 && (
        <ShowMoreTwitsButton
          getTwits={tweetActions.getMoreTweetsWithMedia}
          userId={profile.id}
        />
      )}
    </Fragment>
  );
});

export default ProfilePageMedia;
