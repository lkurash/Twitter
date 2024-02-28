import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { tweetActions } from "../../redux/tweet/tweet.actions";
import { visibilityPrivatePage } from "../../redux/visibilityPage/visibilityPage.selectors";

import getAuthUserID from "../../utils/getAuthUserID";

import BookmarksPageContent from "../../components/BookmarksPageContent";

const BookmarksPage = () => {
  const { loadingStatus } = useSelector(visibilityPrivatePage);
  const dispatch = useDispatch();
  const authUserID = getAuthUserID();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (loadingStatus === "COMPLETE") {
      dispatch(tweetActions.getFavoriteTweets(authUserID));
      setIsLoading(true);
    }
  }, [loadingStatus]);

  return <>{isLoading && <BookmarksPageContent />}</>;
};

export default BookmarksPage;
