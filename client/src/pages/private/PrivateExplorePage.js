import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useDispatch, useSelector } from "react-redux";
import { visibilityPrivatePage } from "../../redux/visibilityPage/visibilityPage.selectors";
import { tweetActions } from "../../redux/tweet/tweet.actions";

import getAuthUserID from "../../utils/getAuthUserID";

import ExplorePageAllTweets from "../../components/Tweets/ExplorePageAllTweets";
import MainSectionTrends from "../MainSectionTrends";

const PrivateExplorePage = observer(() => {
  const dispatch = useDispatch();
  const { loadingStatus } = useSelector(visibilityPrivatePage);
  const authUserID = getAuthUserID();

  useEffect(() => {
    if (loadingStatus === "COMPLETE") {
      dispatch(tweetActions.getTweetsForAuthUser(authUserID));
    }
  }, [loadingStatus]);

  if (loadingStatus !== "COMPLETE") {
    return null;
  }

  return (
    <>
      <div className="main-content">
        <MainSectionTrends
          className="section section-public-page trends"
          mainBlock={true}
        />

        <div className="main-line" />
        <ExplorePageAllTweets />
      </div>
    </>
  );
});

export default PrivateExplorePage;
