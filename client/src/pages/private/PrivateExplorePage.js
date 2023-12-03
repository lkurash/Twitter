import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useDispatch, useSelector } from "react-redux";
import { visibility } from "../../redux/visibilityPage/visibilityPage.selectors";
import { tweetActions } from "../../redux/tweet/tweet.actions";

import getAuthUserID from "../../utils/getAuthUserID";

import ContentExplorePageAllTweets from "../../components/ContentExplorePageAllTweets";
import MainSectionTrends from "../../components/MainSectionTrends";

const PrivateExplorePage = observer(() => {
  const dispatch = useDispatch();
  const { loadingStatus } = useSelector(visibility);
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
        <ContentExplorePageAllTweets />
      </div>
    </>
  );
});

export default PrivateExplorePage;
