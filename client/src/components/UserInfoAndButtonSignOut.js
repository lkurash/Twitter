import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "..";
import dotMenu from "./Img/more_dots_icon.png";
import ButtonSignOut from "./buttons/ButtonSignOut";
import getUserPhoto from "../utils/getUserPhoto";

const UserInfoAndButtonSignOut = observer(() => {
  const { user } = useContext(Context);
  const [showButtonSignOut, setShowButtonSignOut] = useState(false);

  const onClose = () => {
    setShowButtonSignOut(false);
  };

  return (
    <div className="user-block-menu">
      <ButtonSignOut showButtonSignOut={showButtonSignOut} onClose={onClose} />

      <button
        className="button-user"
        onClick={() => setShowButtonSignOut((v) => !v)}
      >
        <div className="button-user-desc">
          <div className="button-user-photo">
            <img src={getUserPhoto(user.user)} alt="User" />
          </div>
          <div className="button-user-name">
            <span>{user.user.user_name}</span>
            <p>@{user.user.user_name}</p>
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
