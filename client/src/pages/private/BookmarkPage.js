import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import getAuthUserID from "../../utils/getAuthUserID";
import getFlagIsAuth from "../../utils/getFlagIsAuth";

import ContentBookmarksPage from "../../components/ContentBookmarksPage";
import { useDispatch, useSelector } from "react-redux";
import { visibilityPageActions } from "../../redux/visibilityPage/visibilityPage.actions";
import { visibility } from "../../redux/visibilityPage/visibilityPage.selectors";
import { tweetActions } from "../../redux/tweet/tweet.actions";

const BookmarksPage = observer(() => {
  const { loadingStatus } = useSelector(visibility);
  const dispatch = useDispatch();
  const authUserID = getAuthUserID();

  useEffect(() => {
    if (loadingStatus === "COMPLETE") {
      dispatch(tweetActions.getFavoriteTweets(authUserID));
    }
  }, [loadingStatus]);

  if (loadingStatus !== "COMPLETE") {
    return null;
  }

  return (
    <>
      <ContentBookmarksPage />
    </>
  );
});

export default BookmarksPage;
