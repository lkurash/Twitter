import { useNavigate } from "react-router-dom";
import { SIGNUP_PAGE_PATH } from "../../utils/constans";

const LoginEmailForm = ({
  email,
  setEmail,
  showPasswordField,
  setEmailFieldVisible,
}) => {
  const navigate = useNavigate();

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
        <div className="block-input login">
          <label htmlFor="input-login">
            <p className="hint">Phone, email address, or username</p>
            <input
              id="input-login"
              min={1}
              autoFocus
              className="input-form"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(event) => nextKeyDown(event)}
            />
          </label>
        </div>
        <button
          className="login-form-button"
          type="button"
          onClick={() => {
            if (email) {
              setEmailFieldVisible(false);
              showPasswordField();
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

export default LoginEmailForm;
