import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";

import { EXPLORE_PAGE } from "../../utils/constans";
import useOutsideClick from "../../utils/useOutsideClickFunction";

function ButtonSignOut({ showButtonSignOut, onClose }) {
  const { usersStore } = useContext(Context);
  const { retwitsStore } = useContext(Context);
  const { favoriteTwitsStore } = useContext(Context);
  const tooltipRef = useRef(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    usersStore.setUser({});
    usersStore.setUserPage({});
    retwitsStore.setRetwitTwit({});
    favoriteTwitsStore.setFavoriteTwits({});
    usersStore.setAuth(false);
    navigate(EXPLORE_PAGE);
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
