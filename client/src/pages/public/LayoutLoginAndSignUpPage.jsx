import { Outlet, useNavigate } from "react-router-dom";
import backgroundAuthPage from "../../components/Imgs/twitter-banner.png";
import logoAuthPage from "../../components/Imgs/auth_twitter_icon.png";

import {
  LOGIN_PAGE_PATH,
  PUBLIC_EXPLORE_PAGE_PATH,
  SIGNUP_PAGE_PATH,
} from "../../utils/routs";

import "../../components/forms/loginAndRegistretionForm.css";

const LayoutLoginAndSignUpPage = () => {
  const navigate = useNavigate();
  return (
    <div className="body">
      <div
        className="background-auth-page"
        style={{
          backgroundImage: `url(${backgroundAuthPage})`,
        }}
      >
        <img
          src={logoAuthPage}
          alt="Logo"
          onClick={() => navigate(PUBLIC_EXPLORE_PAGE_PATH)}
        />
      </div>
      <div className="right-side-bar">
        <div>
          <h1>Happening now</h1>
          <h3>Join today.</h3>
        </div>
        <div className="auth-page-button-panel">
          <button
            id="signup"
            className="auth-page-button button-create-account"
            onClick={() => navigate(SIGNUP_PAGE_PATH)}
          >
            Create account
          </button>
          <p className="button-create-account-hint">
            By signing up, you agree to the Terms of Service and Privacy Policy,
            including Cookie Use.
          </p>
          <h4 className="auth-page-button-panel-hint">
            Already have an account?
          </h4>
          <button
            id="login"
            className="auth-page-button button-sign-in"
            onClick={() => navigate(LOGIN_PAGE_PATH)}
          >
            Sign in
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default LayoutLoginAndSignUpPage;
