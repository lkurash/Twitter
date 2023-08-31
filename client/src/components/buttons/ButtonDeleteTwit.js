import { observer } from "mobx-react-lite";
import { useContext, useRef, useState } from "react";
import { Context } from "../..";

import trendsClient from "../../http/trendsClient";
import twitsClient from "../../http/twitsClient";
import getAuthUserID from "../../utils/getAuthUserID";
import useOutsideClick from "../../utils/useOutsideClickFunction";

import dotMenu from "../Img/more_dots_icon.png";

const ButtonDeleteTwit = observer(({ twit }) => {
  const { twitsStore } = useContext(Context);
  const { usersStore } = useContext(Context);
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);
  const tooltipDeleteTwit = useRef(null);
  const authUserID = getAuthUserID(usersStore);

  const deleteTwit = async (twit) => {
    await twitsClient.deleteTwitByUser(twit.id);
    if (twit.twitId) {
      await twitsClient.getCountLikes(twit.twitId);
      await twitsClient.getCountRetwits(twit.twitId);
    }

    await twitsClient
      .getTwitsByFollowingsUsers(authUserID)
      .then((twits) => twitsStore.setTwitsWhoReading(twits));

    if (authUserID) {
      await twitsClient.getTwitsForAuthUser(authUserID).then((twits) => {
        twitsStore.setTwitsIdWithUsersLike(twits.ids);
        twitsStore.setTwitsWithUsersLike(twits.twits);
      });
    }

    await trendsClient.getCountTrends(twit);
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
