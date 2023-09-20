import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";

import { HOME_PAGE_PATH, ROOT_PAGE_PATH } from "../../utils/constans";

import logo from "../Imgs/logo_icon.png";

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
            navigate(`/${HOME_PAGE_PATH}`);
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
            navigate(ROOT_PAGE_PATH);
          }}
        >
          <img src={logo} alt="logo" className="logo-icon" />
        </div>
      )}
    </div>
  );
});

export default Logo;
