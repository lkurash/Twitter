import { useNavigate } from "react-router-dom";
import useOutsideClick from "../../utils/useOutsideClickFunction";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { AUTH_PAGE_PATH } from "../../utils/routs";
import { userActions } from "../../redux/user/user.actions";
import getFlagIsAuth from "../../utils/getFlagIsAuth";

const Cookies = require("js-cookie");

const LogOutConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const confirmation = useRef(null);

  const logout = () => {
    Cookies.remove("refreshToken");
    Cookies.remove("token");
    Cookies.remove("tweetsWhoReading");
    navigate(AUTH_PAGE_PATH);
    dispatch(userActions.getLogOut())
    dispatch(userActions.getAuth(getFlagIsAuth()));
  };

  const returnOnLastPage = () => {
    navigate(-1);
  };

  useOutsideClick(confirmation, returnOnLastPage);

  return (
    <div className="backgraund-confirmation">
      <div className="confirmation-message wrapper-border" ref={confirmation}>
        <span className="confirmation-message-title">Log out of Twitter?</span>
        <p className="confirmation-message-text">
          {" "}
          You can always log back in at any time. If you just want to switch
          accounts, you can do that by adding an existing account.
        </p>
        <div className="confirmation-message-buttons">
          <button
            type="button"
            className="confirmation-message-button button-logout"
            onClick={logout}
          >
            Log out
          </button>
          <button
            type="button"
            className="confirmation-message-button button-cancel"
            onClick={returnOnLastPage}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOutConfirmation;
