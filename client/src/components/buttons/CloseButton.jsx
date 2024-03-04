import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { popupElementsStateStore } from "../../redux/popupElements/popup.selectors";
import {
  setLoginPageVisible,
  setSignUpPageVisible,
} from "../../redux/popupElements/popupForm";

import close from "../Imgs/x_icon.png";

function CloseButton({ nav, pageVisible }) {
  const dispatch = useDispatch();
  const popupState = useSelector(popupElementsStateStore);
  const navigate = useNavigate();

  return (
    <div
      className="button-close"
      onClick={() => {
        if (popupState.loginPage || popupState.signUpPage) {
          dispatch(setLoginPageVisible(false));
          dispatch(setSignUpPageVisible(false));
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
