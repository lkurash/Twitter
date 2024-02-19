import { useNavigate } from "react-router-dom";

import { SIGNUP_PAGE_PATH } from "../../utils/routs";
import { Context } from "../../Context";
import { useContext } from "react";

const LoginPasswordForm = ({
  email,
  password,
  setPassword,
  signIn,
  message,
}) => {
  const { infoMessageStore } = useContext(Context);
  const navigate = useNavigate();

  const signInKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      signIn();
    }
  };

  return (
    <main className="password-form-main">
      <div className="password-form-title">
        <h2>Enter your password</h2>
      </div>
      <form className="login-form-password">
        <div className="password-form-notactive-input">
          <p className="password-form-email-hint">Email</p>
          <p className="password-form-notactive-input-email">{email}</p>
        </div>
        <div className="block-input input-password">
          <label className="label-input-login" htmlFor="input-form-password">
            <p className="password-form-hint">Password</p>
            <input
              name="loginFormInput"
              type="password"
              className="input-form-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (infoMessageStore.errorVisible) {
                  infoMessageStore.setErrorVisible(false);
                }
              }}
              onKeyDown={(event) => signInKeyDown(event)}
            />
          </label>
        </div>
        <p className="password-form-error-message">
          {infoMessageStore.errorVisible && infoMessageStore.textErrorMessage}
        </p>
        <div className="password-form-forgot-password">
          <p>Forgot password?</p>
        </div>
        <div className="button password-form-button">
          <button className="login-form-button" type="button" onClick={signIn}>
            Log in
          </button>
        </div>
        <div className="password-form-footer">
          <p>Don’t have an account?</p>
          <button
            type="button"
            className="login-form-button-singup"
            onClick={() => navigate(SIGNUP_PAGE_PATH)}
          >
            Sign up
          </button>
        </div>
      </form>
    </main>
  );
};

export default LoginPasswordForm;
