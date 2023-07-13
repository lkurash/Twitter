import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";

import { HOME_PAGE, TWITTER_PAGE } from "../../utils/constans";

import logo from "../Img/logo_icon.png";

const Logo = observer((props) => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const { twits } = useContext(Context);

  return (
    <div>
      {user.isAuth ? (
        <div
          className={props.class}
          onClick={() => {
            user.setUserPage({});
            twits.setUserTwits([]);
            localStorage.setItem("activeButton", '1');

            navigate(HOME_PAGE);
          }}
        >
          <img src={logo} alt="logo" className="logo-icon" />
        </div>
      ) : (
        <div
          className={props.class}
          onClick={() => {
            user.setUserPage({});
            twits.setUserTwits([]);
            navigate(TWITTER_PAGE);
          }}
        >
          <img src={logo} alt="logo" className="logo-icon" />
        </div>
      )}
    </div>
  );
});

export default Logo;
