import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";

import useOutsideClick from "../../utils/useOutsideClickFunction";
import { ROOT_PAGE_PATH } from "../../utils/constans";

const Cookies = require("js-cookie");

function SignOutButton({ buttonSignOutVisible, onClose }) {
  const { usersStore } = useContext(Context);
  const { retwitsStore } = useContext(Context);
  const { favoriteTwitsStore } = useContext(Context);
  const tooltipRef = useRef(null);
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("refreshToken");
    Cookies.remove("token");
    Cookies.remove("twitsWhoReading");
    usersStore.setUser({});
    usersStore.setUserPage({});
    retwitsStore.setRetwitTwit({});
    favoriteTwitsStore.setFavoriteTwitsIds([]);
    usersStore.setAuth(false);
    navigate(ROOT_PAGE_PATH);
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
