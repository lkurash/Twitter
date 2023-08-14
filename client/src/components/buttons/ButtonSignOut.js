import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";

import { ROOT_PAGE_PATH } from "../../utils/constans";
import useOutsideClick from "../../utils/useOutsideClickFunction";
const Cookies = require("js-cookie");

function ButtonSignOut({ showButtonSignOut, onClose }) {
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
    favoriteTwitsStore.setFavoriteTwits({});
    usersStore.setAuth(false);
    navigate(ROOT_PAGE_PATH);
  };

  useOutsideClick(tooltipRef, onClose, showButtonSignOut);

  if (!showButtonSignOut) return null;

  return (
    <div ref={tooltipRef} className="tooltip">
      <button type="button" className="logout" onClick={logout}>
        <span>Sign out</span>
      </button>
    </div>
  );
}

export default ButtonSignOut;
