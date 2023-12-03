import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import useOutsideClick from "../../utils/useOutsideClickFunction";
import { AUTH_PAGE_PATH } from "../../utils/routs";

const Cookies = require("js-cookie");

function SignOutButton({ buttonSignOutVisible, onClose }) {
  const tooltipRef = useRef(null);
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("refreshToken");
    Cookies.remove("token");
    Cookies.remove("tweetsWhoReading");
    navigate(AUTH_PAGE_PATH);
  };

  useOutsideClick(tooltipRef, onClose, buttonSignOutVisible);

  return (
    <div ref={tooltipRef} className="tooltip">
      <button type="button" className="logout" onClick={logout}>
        <span>Sign out</span>
      </button>
    </div>
  );
}

export default SignOutButton;
