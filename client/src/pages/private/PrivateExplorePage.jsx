import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { visibilityPrivatePage } from "../../redux/visibilityPage/visibilityPage.selectors";
import { tweetActions } from "../../redux/tweet/tweet.actions";

import getAuthUserID from "../../utils/getAuthUserID";

import ExploreTweets from "../../components/Tweets/ExploreTweets";
import MainSectionTrends from "../MainSectionTrends";

const PrivateExplorePage = () => {
  const dispatch = useDispatch();
  const { loadingStatus } = useSelector(visibilityPrivatePage);
  const authUserID = getAuthUserID();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (loadingStatus === "COMPLETE") {
      dispatch(tweetActions.getTweetsForAuthUser(authUserID));
      setIsLoading(true);
    }
  }, [loadingStatus]);

  if (loadingStatus !== "COMPLETE") {
    return null;
  }

  return (
    <>
      <div className="main-block">
        <MainSectionTrends
          className="section section-public-page trends"
          mainBlock={true}
        />

        <div className="main-line" />
        {isLoading && <ExploreTweets />}
      </div>
    </>
  );
};

export default PrivateExplorePage;
