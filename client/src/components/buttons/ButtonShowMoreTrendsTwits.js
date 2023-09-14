import trendClient from "../../http/trendClient";

import { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import getAuthUserID from "../../utils/getAuthUserID";

const { observer } = require("mobx-react-lite");

const ButtonShowMoreTrendsTwits = observer(({ trend }) => {
  const { twitsStore } = useContext(Context);
  const authUserID = getAuthUserID();
  const [showMoreTwits, setShowMoreTwits] = useState(false);
  const [itemListTwits, setItemListTwits] = useState(1);
  const [buttonMoreTwitsVisible, setButtonMoreTwitsVisible] = useState(true);

  async function getMoreTrendsTwits() {
    if (showMoreTwits) {
      await trendClient
        .getTrendsTwitsForAuthUser(trend, authUserID, 7, itemListTwits)
        .then((trendstTwits) => {
          twitsStore.setTwits(twitsStore.twits.concat(trendstTwits));
          setShowMoreTwits(false);

          if (trendstTwits.length < 7) {
            setButtonMoreTwitsVisible(false);
          }
        });
    }
  }

  useEffect(() => {
    getMoreTrendsTwits();
  }, [itemListTwits]);

  if (!buttonMoreTwitsVisible) return false;

  return (
    <button
      className="button-show-more"
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

export default ButtonShowMoreTrendsTwits;
