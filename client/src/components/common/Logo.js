import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";

import { HOME_PAGE, TWITTER_PAGE } from "../../utils/constans";

import logo from "../Img/logo_icon.png";

const Logo = observer((props) => {
  const navigate = useNavigate();
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);

  return (
    <div>
      {usersStore.isAuth ? (
        <div
          className={props.class}
          onClick={() => {
            usersStore.setUserPage({});
            twitsStore.setUserTwits([]);
            localStorage.setItem("activeButton", "1");

            navigate(HOME_PAGE);
          }}
        >
          <img src={logo} alt="logo" className="logo-icon" />
        </div>
      ) : (
        <div
          className={props.class}
          onClick={() => {
            usersStore.setUserPage({});
            twitsStore.setUserTwits([]);
            navigate(TWITTER_PAGE);
            localStorage.setItem("activeButton", "");
          }}
        >
          <img src={logo} alt="logo" className="logo-icon" />
        </div>
      )}
    </div>
  );
});

export default Logo;
