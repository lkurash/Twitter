import trendsClient from "../../http/trendsClient";

import { useContext, useEffect, useState } from "react";
import { Context } from "../..";

const { observer } = require("mobx-react-lite");

const ButtonShowMoreTrendsTwits = observer(({ trend }) => {
  const { trendsStore } = useContext(Context);

  const [showMoreTwits, setShowMoreTwits] = useState(false);
  const [itemListTwits, setItemListTwits] = useState(1);
  const [buttonMoreTwitsVisible, setButtonMoreTwitsVisible] = useState(true);

  async function getMoreTrendsTwits() {
    if (showMoreTwits) {
      await trendsClient
        .getTrendsTwits(trend, 7, itemListTwits)
        .then((trendstTwits) => {
          trendsStore.setTrendsTwits(
            trendsStore.trensTwits.concat(trendstTwits)
          );
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
