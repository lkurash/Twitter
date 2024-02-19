import { useContext } from "react";
import { Context } from "../../Context";
import { useNavigate } from "react-router-dom";

import close from "../Imgs/x_icon.png";

function CloseButton({ nav, pageVisible }) {
  const { visiblePopUpStore } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div
      className="button-close"
      onClick={() => {
        if (visiblePopUpStore.loginPage || visiblePopUpStore.signUpPage) {
          visiblePopUpStore.setLoginPageVisible(false);
          visiblePopUpStore.setSignPageUpVisible(false);
        } else {
          navigate(nav);
        }
      }}
    >
      <img src={close} alt="close-icon" className="close-icon" />
    </div>
  );
}
export default CloseButton;
