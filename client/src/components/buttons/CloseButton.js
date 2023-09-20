import { useNavigate } from "react-router-dom";

import close from "../Imgs/x_icon.png";

function CloseButton({ nav, pageVisible }) {
  const navigate = useNavigate();

  return (
    <div
      className="button-close"
      onClick={() => {
        pageVisible ? pageVisible(false) : navigate(nav);
      }}
    >
      <img src={close} alt="close-icon" className="close-icon" />
    </div>
  );
}
export default CloseButton;
