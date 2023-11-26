import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { twitsStore } from "../redux/tweet/tweet.selectors";

import spinner from "../utils/spinner";

import Twits from "./Twits";
import ShowMoreTrendsTwitsButton from "./buttons/ShowMoreTrendsTwitsButton";

const TwitsForTrends = observer(({ trend }) => {
  const { twits, loadingStatus } = useSelector(twitsStore);
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
            <Twits />
          </div>
          {twits && twits.length >= 7 && (
            <ShowMoreTrendsTwitsButton trend={trend} />
          )}
        </>
      ) : (
        spinner()
      )}
    </Fragment>
  );
});

export default TwitsForTrends;
