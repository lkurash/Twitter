import { useNavigate } from "react-router-dom";
import "./common.css";
import close from "../Img/x_icon.png";

function ButtonClose(props) {
  const navigate = useNavigate();

  return (
    <div className="button-close" onClick={() => navigate(-1)}>
      <img src={close} alt="close-icon" className="close-icon" />
    </div>
  );
}
export default ButtonClose;
