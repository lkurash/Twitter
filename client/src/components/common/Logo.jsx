import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { HOME_PAGE_PATH, ROOT_PAGE_PATH } from "../../utils/routs";

import logo from "../Imgs/logo_icon.png";
import { useSelector } from "react-redux";
import { auth } from "../../redux/user/user.selectors";

const Logo = observer((props) => {
  const { isAuth } = useSelector(auth);
  const navigate = useNavigate();

  return (
    <>
      {isAuth ? (
        <div
          className={props.class}
          onClick={() => {
            navigate(`/${HOME_PAGE_PATH}`);
          }}
        >
          <img src={logo} alt="logo" className="logo-icon" />
        </div>
      ) : (
        <div
          className={props.class}
          onClick={() => {
            navigate(ROOT_PAGE_PATH);
          }}
        >
          <img src={logo} alt="logo" className="logo-icon" />
        </div>
      )}
    </>
  );
});

export default Logo;
