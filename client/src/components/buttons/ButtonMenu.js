import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";
import { EXPLORE_PAGE, HOME_PAGE } from "../../utils/constans";

const ButtonMenu = observer(
  ({ classNameButtonImg, buttonName, classNameButton, nav, alt, img, id }) => {
    const navigate = useNavigate();
    const location = useLocation().pathname;

    const setLocalStorageActiveButton = (id) => {
      return localStorage.setItem("activeButton", id);
    };

    if (location === HOME_PAGE) {
      localStorage.setItem("activeButton", "1");
    }
    
    return (
      <div
        className={`menu-button ${classNameButton}`}
        type="button"
        onClick={() => {
          navigate(nav);
          setLocalStorageActiveButton(id);
        }}
      >
        <img src={img} alt={alt} className={classNameButtonImg} />
        <span className="menu-button-name">{buttonName}</span>
      </div>
    );
  }
);

export default ButtonMenu;
