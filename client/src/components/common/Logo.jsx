import { useNavigate } from "react-router-dom";

import { HOME_PAGE_PATH, ROOT_PAGE_PATH } from "../../utils/routs";

import logo from "../Imgs/logo_icon.png";
import { useSelector } from "react-redux";
import { auth } from "../../redux/user/user.selectors";

const Logo = ({ className, testid }) => {
  const { isAuth } = useSelector(auth);
  const navigate = useNavigate();

  return (
    <>
      {isAuth ? (
        <div
          data-testid={testid}
          className={className}
          onClick={() => {
            navigate(`/${HOME_PAGE_PATH}`);
          }}
        >
          <img src={logo} alt="logo" className="logo-icon" />
        </div>
      ) : (
        <div
          data-testid={testid}
          className={className}
          onClick={() => {
            navigate(ROOT_PAGE_PATH);
          }}
        >
          <img src={logo} alt="logo" className="logo-icon" />
        </div>
      )}
    </>
  );
};

export default Logo;
