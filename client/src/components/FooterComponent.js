import { NavLink } from "react-router-dom";
import { useState } from "react";

import LoginPage from "../pages/public/LoginPage";
import SignUpPage from "../pages/public/SignUpPage";

const FooterComponent = () => {
  const [loginPageVisible, setLoginPageVisible] = useState(false);
  const [signUpPageVisible, setSignUpPageVisible] = useState(false);

  return (
    <>
      <footer className="footer">
        <div className="footer-desc">
          <h4>Don’t miss what’s happening</h4>
          <p>People on Twitter are the first to know.</p>
        </div>
        <div className="footer-buttons">
          <NavLink
            className="button-login"
            onClick={() => setLoginPageVisible(true)}
          >
            Log in
          </NavLink>
          <NavLink
            className="button-singup"
            onClick={() => setSignUpPageVisible(true)}
          >
            Sing up
          </NavLink>
        </div>
      </footer>
      {loginPageVisible && (
        <LoginPage setLoginPageVisible={setLoginPageVisible} />
      )}
      {signUpPageVisible && (
        <SignUpPage setSignUpPageVisible={setSignUpPageVisible} />
      )}
    </>
  );
};
export default FooterComponent;
