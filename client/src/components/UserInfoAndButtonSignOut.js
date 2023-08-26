import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "..";

import getUserPhoto from "../utils/getUserPhoto";

import ButtonSignOut from "./buttons/ButtonSignOut";

import dotMenu from "./Img/more_dots_icon.png";

const UserInfoAndButtonSignOut = observer(() => {
  const { usersStore } = useContext(Context);
  const [buttonSignOutVisible, setButtonSignOutVisible] = useState(false);

  const onClose = () => {
    setButtonSignOutVisible(false);
  };

  return (
    <div className="user-block-menu">
      {buttonSignOutVisible && (
        <ButtonSignOut
          buttonSignOutVisible={buttonSignOutVisible}
          onClose={onClose}
        />
      )}

      <button
        className="button-user"
        onClick={() => setButtonSignOutVisible((v) => !v)}
      >
        <div className="button-user-desc">
          <div className="button-user-photo">
            <img src={getUserPhoto(usersStore.user)} alt="User" />
          </div>
          <div className="button-user-name">
            <span>{usersStore.user.user_name}</span>
            <p>@{usersStore.user.user_name}</p>
          </div>
        </div>
        <img
          src={dotMenu}
          alt="dot menu"
          className="button-user-dotmenu-icon"
        />
      </button>
    </div>
  );
});

export default UserInfoAndButtonSignOut;
