import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import getUserPhoto from "../../utils/getUserPhoto";

import SignOutTooltip from "../common/SignOutTooltip";

import dotMenu from "../Imgs/more_dots_icon.png";
import { useSelector } from "react-redux";
import { userProfile } from "../../redux/user/user.selectors";

const SignOutButton = observer(() => {
  const { profile, loadingStatus } = useSelector(userProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonSignOutVisible, setButtonSignOutVisible] = useState(false);

  useEffect(() => {
    if (loadingStatus !== "PENDING") {
      setIsLoading(false);
    }
  }, [loadingStatus]);

  if (isLoading) {
    return null;
  }

  const onClose = () => {
    setButtonSignOutVisible(false);
  };

  return (
    <div className="user-block-menu">
      {buttonSignOutVisible && (
        <SignOutTooltip
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
            <img src={getUserPhoto(profile)} alt="User" />
          </div>
          <div className="button-user-name">
            <span>{profile.user_name}</span>
            <p>@{profile.user_name}</p>
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

export default SignOutButton;
