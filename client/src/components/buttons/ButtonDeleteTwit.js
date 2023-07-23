import { observer } from "mobx-react-lite";
import { useContext, useRef, useState } from "react";
import { Context } from "../..";

import { deleteTwitByUser, getTwitsByUser } from "../../http/twitsApi";
import getAuthUserID from "../../utils/getAuthUserID";
import useOutsideClick from "../../utils/useOutsideClickFunction";

import dotMenu from "../Img/more_dots_icon.png";

const ButtonDeleteTwit = observer(({ twit }) => {
  const { twitsStore } = useContext(Context);
  const { usersStore } = useContext(Context);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const tooltipDeleteTwit = useRef(null);
  const authUserID = getAuthUserID(usersStore);

  const deleteTwit = async (twit) => {
    await deleteTwitByUser(twit.id);
    
    await getTwitsByUser(usersStore.user.id).then((twitsById) =>
      twitsStore.setUserTwits(twitsById)
    );
  };
  const onClose = () => {
    setShowDeleteButton(false);
  };

  useOutsideClick(tooltipDeleteTwit, onClose, showDeleteButton);
  if (authUserID !== twit.UserId) return null;

  return (
    <div className="button-dotmenu-twit">
      {showDeleteButton && (
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
          setShowDeleteButton(true);
        }}
      >
        <img src={dotMenu} alt="dot menu" className="dotmenu-icon" />
      </div>
    </div>
  );
});

export default ButtonDeleteTwit;
