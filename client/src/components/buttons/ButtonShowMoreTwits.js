import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const { observer } = require("mobx-react-lite");

const ButtonShowMoreTwits = observer(({ getMoreTwits, store }) => {
  const { id } = useParams();

  const [showMoreTwits, setShowMoreTwits] = useState(false);
  const [itemListTwits, setItemListTwits] = useState(1);
  const [buttonMoreTwitsVisible, setButtonMoreTwitsVisible] = useState(true);

  useEffect(() => {
    getMoreTwits(
      showMoreTwits,
      itemListTwits,
      store,
      setShowMoreTwits,
      setButtonMoreTwitsVisible,
      id
    );
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

export default ButtonShowMoreTwits;
