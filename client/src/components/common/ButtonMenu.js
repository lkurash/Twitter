import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const ButtonMenu = observer(
  ({
    classNameButtonImg,
    buttonName,
    classNameButton,
    nav,
    alt,
    img,
    id,
  }) => {
    const navigate = useNavigate();

    const setLocalStorageActiveButton = (id) => {
      localStorage.setItem("activeButton", id);
    };

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
