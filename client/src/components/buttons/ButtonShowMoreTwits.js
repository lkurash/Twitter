import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../..";

const { observer } = require("mobx-react-lite");

const ButtonShowMoreTwits = observer(({ getMoreTwits }) => {
  const { twitsStore } = useContext(Context);
  const { id } = useParams();

  const [showMoreTwits, setShowMoreTwits] = useState(false);
  const [itemListTwits, setItemListTwits] = useState(1);
  const [buttonMoreTwitsVisible, setButtonMoreTwitsVisible] = useState(true);

  useEffect(() => {
    getMoreTwits(
      showMoreTwits,
      itemListTwits,
      twitsStore,
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
