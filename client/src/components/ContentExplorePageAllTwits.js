import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";

import spinner from "../utils/spinner";

import Twits from "./Twits";
import ShowMoreTwitsButton from "./buttons/ShowMoreTwitsButton";
import { twitsStore } from "../redux/tweet/tweet.selectors";
import { useSelector } from "react-redux";
import getAuthUserID from "../utils/getAuthUserID";
import { tweetActions } from "../redux/tweet/tweet.actions";

const ContentExplorePageAllTwits = observer(() => {
  const { twits, loadingStatus } = useSelector(twitsStore);
  const [isLoading, setIsLoading] = useState(true);
  const authUserID = getAuthUserID();

  useEffect(() => {
    if (loadingStatus === "PENDING") {
      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    }
  }, [loadingStatus]);

  return (
    <>
      <div className="main-stiky-panel explore-page-stiky-panel">
        <div className="main-page-name">
          <h2>Explore</h2>
        </div>
      </div>
      {isLoading ? (
        spinner()
      ) : (
        <Fragment>
          <Twits />
          {twits && twits.length >= 7 && (
            <ShowMoreTwitsButton
              getTwits={
                authUserID
                  ? tweetActions.getMoreTweetsForAuthUser
                  : tweetActions.getMoreTweets
              }
              userId={authUserID}
            />
          )}
        </Fragment>
      )}
    </>
  );
});

export default ContentExplorePageAllTwits;
