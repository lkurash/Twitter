import { useNavigate } from "react-router-dom";
import arrowLeft from "../Imgs/arrow_left_icon.png";

const ArrowLeft = () => {
  const navigate = useNavigate();
  
  return (
    <div
      className="main-search-block-button-return"
      onClick={() => navigate(-1)}
    >
      <img src={arrowLeft} alt="Button return" />
    </div>
  );
};

export default ArrowLeft;
