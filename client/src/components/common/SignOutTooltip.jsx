import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import useOutsideClick from "../../utils/useOutsideClickFunction";
import { LOG_OUT_PAGE_PATH } from "../../utils/routs";

function SignOutTooltip({ buttonSignOutVisible, onClose }) {
  const tooltipRef = useRef(null);
  const navigate = useNavigate();

  useOutsideClick(tooltipRef, onClose, buttonSignOutVisible);

  return (
    <div ref={tooltipRef} className="tooltip">
      <button
        type="button"
        className="logout"
        onClick={() => {
          navigate(LOG_OUT_PAGE_PATH);
        }}
      >
        <span>Sign out</span>
      </button>
    </div>
  );
}

export default SignOutTooltip;
