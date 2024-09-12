import { useEffect, useState } from "react";

import getMoreTweets from "../../utils/getMoreTweets";
import { useDispatch, useSelector } from "react-redux";
import { tweetsStore } from "../../redux/tweet/tweet.selectors";

const ShowMoreTweetsButton = ({ getTweets, userId, store }) => {
  const dispatch = useDispatch();
  const { moreTweets } = useSelector(tweetsStore);
  const [showMoreTweets, setShowMoreTweets] = useState(false);
  const [itemListTweets, setItemListTweets] = useState(1);

  useEffect(() => {
    getMoreTweets(showMoreTweets, dispatch, getTweets, itemListTweets, userId);
  }, [itemListTweets]);

  if (!moreTweets) return false;

  return (
    <>
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
      <div className="main-line" />
    </>
  );
};

export default ShowMoreTweetsButton;
