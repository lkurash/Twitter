import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "..";
import LoginFormTitle from "./LoginFormTitle";
import LoginFormButton from "./LoginFormButton";
import Logo from "./common/Logo";
import "./loginAndRegistretionForm.css";
import { HOME_PAGE, SIGNUP_PAGE } from "../utils/constans";
import { authorization } from "../hhtp/userApi";
import ButtonClose from "./common/ButtonClose";

const LoginForm = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [showFormPassword, setShowFormPassword] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showPasswordForm = () => {
    if (email) {
      setShowFormPassword({ showFormPassword: true });
    }
  };

  const signIn = async () => {
    try {
      if (email && password) {
        const data = await authorization(email, password);

        user.setUser(data);

        user.setAuth(true);
        navigate(HOME_PAGE + data.id);
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <div className="body">
      <div className="form-wrapper">
        <header className="login-form-header">
          <ButtonClose />
          <Logo class="logo-icon-form" />
        </header>
        {!showFormPassword ? (
          <main className="login-form-main">
            <LoginFormTitle title="Sign in to Twitter" />
            <form className="login-form">
              <div className="block-input login">
                <label htmlFor="input-login">
                  <p className="hint">Phone, email address, or username</p>
                  <input
                    id="input-login"
                    min={1}
                    className="input-form"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>
              <button
                className="login-form-button"
                type="button"
                onClick={() => showPasswordForm()}
              >
                <span>Next</span>
              </button>
              <LoginFormButton buttonName="Forgot password?" />
            </form>
            <div className="login-form-footer">
              Don’t have an account?
              <button
                className="login-form-button-singup"
                onClick={() => navigate(SIGNUP_PAGE)}
              >
                Sign up
              </button>
            </div>
          </main>
        ) : (
          <main className="password-form-main">
            <div className="password-form-title">
              <h2>Enter your password</h2>
            </div>
            <form>
              <div className="password-form-notactive-input">
                <p>Email</p>
                <p className="password-form-notactive-input-email">{email}</p>
              </div>
              <div className="block-input input-password">
                <label>
                  <p className="password-form-hint">Password</p>
                  <input
                    autoFocus
                    className="input-form"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>
              <div className="password-form-forgot-password">
                <p>Forgot password?</p>
              </div>
              <div className="button password-form-button">
                <button
                  className="login-form-button"
                  onClick={signIn}
                  type="button"
                >
                  <span>Log in</span>
                </button>
              </div>
            </form>
            <div className="password-form-footer">
              Don’t have an account?
              <button
                type="submit"
                className="login-form-button-singup"
                onClick={() => navigate(SIGNUP_PAGE)}
              >
                Sign up
              </button>
            </div>
          </main>
        )}
      </div>
    </div>
  );
});

export default LoginForm;
