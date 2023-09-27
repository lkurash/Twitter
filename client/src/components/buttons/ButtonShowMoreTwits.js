import { useEffect, useState } from "react";

import getMoreTwits from "../../utils/getMoreTwits";

const { observer } = require("mobx-react-lite");

const ButtonShowMoreTwits = observer(({ getTwits, userId, store }) => {
  const [showMoreTwits, setShowMoreTwits] = useState(false);
  const [itemListTwits, setItemListTwits] = useState(1);
  const [buttonMoreTwitsVisible, setButtonMoreTwitsVisible] = useState(true);

  useEffect(() => {
    getMoreTwits(
      showMoreTwits,
      getTwits,
      itemListTwits,
      store,
      setShowMoreTwits,
      setButtonMoreTwitsVisible,
      userId
    );
  }, [itemListTwits]);

  if (!buttonMoreTwitsVisible) return false;

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

export default ButtonShowMoreTwits;
