import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { tweetActions } from "../../redux/tweet/tweet.actions";

import getAuthUserID from "../../utils/getAuthUserID";
import { twitsStore } from "../../redux/tweet/tweet.selectors";

const ShowMoreTrendsTwitsButton = ({ trend }) => {
  const dispatch = useDispatch();
  const authUserID = getAuthUserID();
  const { moreTweets } = useSelector(twitsStore);
  const [showMoreTwits, setShowMoreTwits] = useState(false);
  const [itemListTwits, setItemListTwits] = useState(1);

  function getMoreTrendsTwits() {
    if (showMoreTwits) {
      if (authUserID) {
        dispatch(
          tweetActions.getMoreTweetsForTrends(
            trend,
            7,
            itemListTwits,
            authUserID
          )
        );
      } else {
        dispatch(tweetActions.getMoreTweetsForTrends(trend, 7, itemListTwits));
      }
    }
  }

  useEffect(() => {
    getMoreTrendsTwits();
  }, [itemListTwits]);

  if (!moreTweets) {
    return false;
  }

  return (
    <button
      className="twits-button-show-more"
      type="button"
      onClick={() => {
        setItemListTwits(itemListTwits + 1);
        setShowMoreTwits(true);
      }}
    >
      Show more
    </button>
  );
};

export default ShowMoreTrendsTwitsButton;
