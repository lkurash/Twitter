import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { twitsStore } from "../redux/tweet/tweet.selectors";

import spinner from "../utils/spinner";

import ShowMoreTwitsButton from "./buttons/ShowMoreTwitsButton";
import Twits from "./Twits";
import { userProfile } from "../redux/user/user.selectors";
import { tweetActions } from "../redux/tweet/tweet.actions";

const TwitsWhoYouRead = observer(() => {
  const { twits, loadingStatus } = useSelector(twitsStore);
  const { profile } = useSelector(userProfile);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loadingStatus === "PENDING") {
      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    }
  }, [loadingStatus]);

  if (isLoading) {
    return spinner();
  }

  return (
    <Fragment>
      <Twits />
      {twits && twits.length >= 7 && (
        <ShowMoreTwitsButton
          getTwits={tweetActions.getMoreTweetsWhoYouReading}
          userId={profile.id}
          store={twitsStore}
        />
      )}
    </Fragment>
  );
});

export default TwitsWhoYouRead;
