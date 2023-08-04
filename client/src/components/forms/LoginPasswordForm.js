import { useNavigate } from "react-router-dom";

import { SIGNUP_PAGE_PATH } from "../../utils/constans";

const LoginPasswordForm = ({
  email,
  password,
  setPassword,
  signIn,
}) => {
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
          <p>Email</p>
          <p className="password-form-notactive-input-email">{email}</p>
        </div>
        <div className="block-input input-password">
          <label>
            <p className="password-form-hint">Password</p>
            <input
              autoFocus
              type="password"
              className="input-form"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(event) => signInKeyDown(event)}
            />
          </label>
        </div>
        <div className="password-form-forgot-password">
          <p>Forgot password?</p>
        </div>
        <div className="button password-form-button">
          <button className="login-form-button" type="button" onClick={signIn}>
            Log in
          </button>
        </div>
      </form>
      <div className="password-form-footer">
        Don’t have an account?
        <button
          type="button"
          className="login-form-button-singup"
          onClick={() => navigate(SIGNUP_PAGE_PATH)}
        >
          Sign up
        </button>
      </div>
    </main>
  );
};

export default LoginPasswordForm;
