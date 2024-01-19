import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { tweetActions } from "../../redux/tweet/tweet.actions";
import { visibilityPrivatePage } from "../../redux/visibilityPage/visibilityPage.selectors";

import getAuthUserID from "../../utils/getAuthUserID";

import BookmarksPageContent from "../../components/BookmarksPageContent";

const BookmarksPage = observer(() => {
  const { loadingStatus } = useSelector(visibilityPrivatePage);
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
      <BookmarksPageContent />
    </>
  );
});

export default BookmarksPage;
