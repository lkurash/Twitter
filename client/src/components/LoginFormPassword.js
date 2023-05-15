import { useState } from "react";

function LoginFormPassword(props) {
  const [password, setPassword] = useState("");

  props.data(password);

  return (
    <main className="password-form-main">
      <div className="login-form-password-title">
        <h2>Enter your password</h2>
      </div>
      <form>
        <div className="notactive-input">
          <p>Email</p>
          <p className="notactive-input-email">{/* {email} */}</p>
        </div>
        <div className="block-input input-password">
          <label>
            <p className="hint hint-password">Password</p>
            <input
              className="input-form"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div className="forgot-password">
          <p>Forgot password?</p>
        </div>
        <div className="button login-password">
          <button
            className="login-form-button"
            onClick={() => props.sign}
            type="button"
          >
            <span>Log in</span>
          </button>
        </div>
      </form>
      <div className="footer-password">Don’t have an account? Sign up</div>
    </main>
  );
}
export default LoginFormPassword;
