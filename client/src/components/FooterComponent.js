import { NavLink } from "react-router-dom";

import { LOGIN_PAGE_PATH, SIGNUP_PAGE_PATH } from "../utils/constans";

import "./footer.css";
import getFlagIsAuth from "../utils/getFlagIsAuth";

const FooterComponent = () => {
  const userAuth = getFlagIsAuth();

  if (userAuth) return null;

  return (
    <footer className="footer">
      <div className="footer-desc">
        <h4>Don’t miss what’s happening</h4>
        <p>People on Twitter are the first to know.</p>
      </div>
      <div className="footer-buttons">
        <NavLink className="button-login" to={LOGIN_PAGE_PATH}>
          Log in
        </NavLink>
        <NavLink className="button-singup" to={SIGNUP_PAGE_PATH}>
          Sing up
        </NavLink>
      </div>
    </footer>
  );
};
export default FooterComponent;
