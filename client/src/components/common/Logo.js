import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../..";
import { HOME_PAGE, TWITTER_PAGE } from "../../utils/constans";
import logo from "../Img/logo_icon.png";

function Logo(props) {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  return (
    <div>
      {user.user.id ? (
        <div className={props.class} onClick={() => navigate(HOME_PAGE + user.user.id)}>
          <img src={logo} alt="logo" className="logo-icon" />
        </div>
      ) : (
        <div className={props.class} onClick={() => navigate(TWITTER_PAGE)}>
          <img src={logo} alt="logo" className="logo-icon" />
        </div>
      )}
    </div>
  );
}

export default Logo;
