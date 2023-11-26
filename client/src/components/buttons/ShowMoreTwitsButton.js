import { useEffect, useState } from "react";

import getMoreTwits from "../../utils/getMoreTwits";
import { useDispatch, useSelector } from "react-redux";
import { twitsStore } from "../../redux/tweet/tweet.selectors";

const { observer } = require("mobx-react-lite");

const ShowMoreTwitsButton = observer(({ getTwits, userId, store }) => {
  const dispatch = useDispatch();
  const { moreTweets } = useSelector(twitsStore);
  const [showMoreTwits, setShowMoreTwits] = useState(false);
  const [itemListTwits, setItemListTwits] = useState(1);

  useEffect(() => {
    getMoreTwits(showMoreTwits, dispatch, getTwits, itemListTwits, userId);
  }, [itemListTwits]);

  if (!moreTweets) return false;

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
});

export default ShowMoreTwitsButton;
