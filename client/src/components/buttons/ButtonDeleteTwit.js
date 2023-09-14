import { observer } from "mobx-react-lite";
import { useContext, useRef, useState } from "react";
import { Context } from "../..";

import trendClient from "../../http/trendClient";
import twitClient from "../../http/twitClient";
import useOutsideClick from "../../utils/useOutsideClickFunction";

import dotMenu from "../Img/more_dots_icon.png";

const ButtonDeleteTwit = observer(({ twit }) => {
  const { twitsStore } = useContext(Context);
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);
  const tooltipDeleteTwit = useRef(null);

  const deleteTwit = async (twit) => {
    await twitClient.deleteTwitByUser(twit.id).then((deleteTwit) => {
      twitsStore.deleteTwit(deleteTwit);
    });
    if (twit.twitId) {
      await twitClient.getCountLikes(twit.twitId);
      await twitClient.getCountRetwits(twit.twitId);
    }

    await trendClient.getCountTrends(twit);
  };
  const onClose = () => {
    setDeleteButtonVisible(false);
  };

  useOutsideClick(tooltipDeleteTwit, onClose, deleteButtonVisible);

  return (
    <div className="button-dotmenu-twit">
      {deleteButtonVisible && (
        <div
          ref={tooltipDeleteTwit}
          className="tooltip-delete-twit"
          onClick={() => deleteTwit(twit)}
        >
          <button className="button-delete-twit" type="reset">
            <span>Delete Twit</span>
          </button>
        </div>
      )}
      <div
        className="dotmenu"
        onClick={() => {
          setDeleteButtonVisible(true);
        }}
      >
        <img src={dotMenu} alt="dot menu" className="dotmenu-icon" />
      </div>
    </div>
  );
});

export default ButtonDeleteTwit;
