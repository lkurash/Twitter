import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { tweetsStore } from "../../redux/tweet/tweet.selectors";

import spinner from "../../utils/spinner";

import Tweets from "./Tweets";
import ShowMoreTrendsTweetsButton from "../buttons/ShowMoreTrendsTweetsButton";

const TweetsForTrends = observer(({ trend }) => {
  const { tweets, loadingStatus } = useSelector(tweetsStore);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (loadingStatus === "PENDING" || isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, [loadingStatus]);

  return (
    <Fragment>
      {!isLoading ? (
        <>
          <div className="main-content">
            <Tweets
              message={
                <div className="lack-tweets-message">
                  <h2>No tweets yet.</h2>
                </div>
              }
            />
          </div>
          {tweets && tweets.length >= 7 && (
            <ShowMoreTrendsTweetsButton trend={trend} />
          )}
        </>
      ) : (
        spinner()
      )}
    </Fragment>
  );
});

export default TweetsForTrends;
