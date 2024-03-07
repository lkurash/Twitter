import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { popupElementsStateInfoMessage } from "../../redux/popupElements/popup.selectors";
import { setErrorVisible } from "../../redux/popupElements/infoMessage";

import { SIGNUP_PAGE_PATH } from "../../utils/routs";

const LoginEmailForm = ({
  email,
  setEmail,
  showPasswordField,
  setEmailFieldVisible,
}) => {
  const dispatch = useDispatch();
  const infoMessageStore = useSelector(popupElementsStateInfoMessage);
  const navigate = useNavigate();
  const [emptyEmail, setEmptyEmail] = useState(false);

  const nextKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setEmailFieldVisible(false);
      showPasswordField();
    }
  };

  return (
    <main className="login-form-main">
      <div className="login-form-title">
        <h2>Sign in to Twitter</h2>
      </div>
      <form className="login-form">
        <div
          className={
            emptyEmail ? "block-input login email-error" : "block-input login"
          }
        >
          <div className="label-input-login">
            <p className={emptyEmail ? "hint email-error-hint" : "hint"}>
              Phone, email address, or username
            </p>
            <input
              id="email"
              min={1}
              autoFocus
              className="input-form-email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (infoMessageStore.errorVisible) {
                  setEmptyEmail(false);
                  dispatch(setErrorVisible(false));
                }
              }}
              onKeyDown={(event) => nextKeyDown(event)}
            />
          </div>
        </div>
        <p className="login-form-error-message">
          {infoMessageStore.errorVisible && infoMessageStore.textErrorMessage}
        </p>
        <button
          id="next"
          className="login-form-button"
          type="button"
          onClick={() => {
            if (email) {
              setEmailFieldVisible(false);
              showPasswordField();
            } else {
              setEmail("");
              setEmptyEmail(true);
              dispatch(setErrorVisible(true));
            }
          }}
        >
          <span>Next</span>
        </button>
        <button className="login-form-button">
          <span>Forgot password?</span>
        </button>
      </form>
      <div className="login-form-footer">
        Don’t have an account?
        <button
          type="submit"
          className="login-form-button-singup"
          onClick={() => navigate(SIGNUP_PAGE_PATH)}
        >
          Sign up
        </button>
      </div>
    </main>
  );
};

export default LoginEmailForm;
