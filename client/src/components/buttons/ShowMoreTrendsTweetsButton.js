import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { tweetActions } from "../../redux/tweet/tweet.actions";
import { tweetsStore } from "../../redux/tweet/tweet.selectors";

import getAuthUserID from "../../utils/getAuthUserID";

const ShowMoreTrendsTweetsButton = ({ trend }) => {
  const dispatch = useDispatch();
  const authUserID = getAuthUserID();
  const { moreTweets } = useSelector(tweetsStore);
  const [showMoreTweets, setShowMoreTweets] = useState(false);
  const [itemListTweets, setItemListTweets] = useState(1);

  function getMoreTrendsTweets() {
    if (showMoreTweets) {
      if (authUserID) {
        dispatch(
          tweetActions.getMoreTweetsForTrends(
            trend,
            7,
            itemListTweets,
            authUserID
          )
        );
      } else {
        dispatch(tweetActions.getMoreTweetsForTrends(trend, 7, itemListTweets));
      }
    }
  }

  useEffect(() => {
    getMoreTrendsTweets();
  }, [itemListTweets]);

  if (!moreTweets) {
    return false;
  }

  return (
    <button
      className="tweets-button-show-more"
      type="button"
      onClick={() => {
        setItemListTweets(itemListTweets + 1);
        setShowMoreTweets(true);
      }}
    >
      Show more
    </button>
  );
};

export default ShowMoreTrendsTweetsButton;
